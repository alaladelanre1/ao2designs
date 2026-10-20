/**
 * Rebuilds a readable page from a Figma text/geometry dump.
 *
 * Dump format (one record per line, main column only):
 *   Y|X|W|FONT_SIZE|FONT_WEIGHT|TEXT          text node ("\n" = soft line break)
 *   IMG|Y|X|W|H|/public/path.png|ALT           image node
 */
export interface Item {
  kind: "t" | "i";
  x: number; y: number; w: number; h: number;
  fs: number; fw: string; text: string; src?: string; alt?: string;
  marker?: string; suffix?: string;
}
export interface Cell { x0: number; x1: number; y0: number; y1: number; items: Item[] }
export interface Row { y0: number; y1: number; cells: Cell[]; gap: number }

const GLYPHS = new Set(["—", "•", "✓", "+", "↑", "→"]);

export function parseDump(dump: string): Item[] {
  const items: Item[] = [];
  for (const raw of dump.split("\n")) {
    const line = raw.trimEnd();
    if (!line) continue;
    const p = line.split("|");
    if (p[0] === "IMG") {
      const [, y, x, w, h, src, ...alt] = p;
      items.push({ kind: "i", y: +y, x: +x, w: +w, h: +h, fs: 0, fw: "", text: "", src, alt: alt.join("|") });
    } else {
      const [y, x, w, fs, fw, ...rest] = p;
      const text = rest.join("|").replace(/-\\n/g, "-").replace(/\\n/g, " ").replace(/\s+/g, " ").trim();
      if (!text) continue;
      const lines = rest.join("|").split("\\n").length;
      items.push({ kind: "t", y: +y, x: +x, w: +w, h: lines * +fs * 1.55, fs: +fs, fw, text });
    }
  }
  return items.sort((a, b) => a.y - b.y || a.x - b.x);
}

/** Fold single-glyph items (bullets, arrows, "+", "↑") into their neighbours. */
function foldGlyphs(items: Item[]): { items: Item[]; arrowRows: Set<number> } {
  const out: Item[] = [];
  const arrowYs: number[] = [];
  const glyphs = items.filter((i) => i.kind === "t" && GLYPHS.has(i.text));
  const rest = items.filter((i) => !glyphs.includes(i));
  for (const g of glyphs) {
    if (g.text === "→") { arrowYs.push(g.y); continue; }
    const host = rest.find((t) => t.kind === "t" && Math.abs(t.y - g.y) < 28 && g.x >= t.x + t.w - 6 && g.x <= t.x + t.w + 14 && t.fs >= g.fs);
    if (host && (g.text === "+" || g.text === "↑")) { host.suffix = (host.suffix ?? "") + g.text; continue; }
    const next = rest.find((t) => t.kind === "t" && Math.abs(t.y - g.y) < 10 && t.x > g.x && t.x - g.x < 90);
    if (next) next.marker = g.text;
  }
  out.push(...rest);
  return { items: out.sort((a, b) => a.y - b.y || a.x - b.x), arrowRows: new Set(arrowYs.map((y) => Math.round(y / 10))) };
}

const chipLike = (i: Item) => i.kind === "t" && i.fs <= 13.1 && (/Medium/.test(i.fw) || i.y < 600) && i.text.length < 30 && !i.marker;
const overlap = (a0: number, a1: number, b0: number, b1: number) => Math.max(0, Math.min(a1, b1) - Math.max(a0, b0));

export function layout(dump: string, title: string, year = "") {
  const parsed = parseDump(dump);
  const { items: all, arrowRows } = foldGlyphs(parsed);
  // drop the repeated page title
  const items = all.filter((i, idx) => !(idx < 4 && i.kind === "t" && (i.text.trim() === title || (year && i.text.trim() === year))));

  // hero = images that sit with the first image, before the first long text block
  const imgs = items.filter((i) => i.kind === "i");
  const first = imgs[0];
  const hero = first ? imgs.filter((i) => i.y < first.y + 80 && i.y + i.h > first.y) : [];
  const flowItems = items.filter((i) => !hero.includes(i));

  // items that must stay on their own: journey tokens (next to "→") and
  // label/value pairs such as "Challenge | text" laid out side by side.
  const texts = flowItems.filter((i) => i.kind === "t");
  const isLabel = (i: Item) => i.kind === "t" && i.fs <= 12.5 && /Bold|Semi/.test(i.fw) && i.text.length <= 40;
  const solo = new Set<Item>();
  for (const it of texts) {
    const rowKey = Math.round(it.y / 10);
    if (it.fs <= 13 && it.text.length < 28 && [rowKey - 1, rowKey, rowKey + 1].some((k) => arrowRows.has(k))) solo.add(it);
    for (const o of texts) {
      if (o === it || Math.abs(o.y - it.y) > 8 || o.x <= it.x + it.w + 12) continue;
      if (isLabel(it) && o.fs >= 13 && !isLabel(o)) { solo.add(it); solo.add(o); }
    }
  }

  // cluster into cells
  const cells: Cell[] = [];
  for (const it of flowItems) {
    const x0 = it.x, x1 = it.x + it.w;
    let best: Cell | undefined, bestOv = 0;
    if (solo.has(it)) { cells.push({ x0, x1, y0: it.y, y1: it.y + it.h, items: [it] }); continue; }
    for (const c of cells) {
      if (c.items.some((o) => solo.has(o))) continue;
      if (it.kind === "i" && !c.items.some((o) => o.kind === "i")) continue; // screens start their own card
      const gap = it.y - c.y1;
      const lim = it.kind === "i" ? 40 : Math.max(30, it.fs * 2);
      if (gap > lim || gap < -it.h * 0.6) continue;
      if (chipLike(it) !== chipLike(c.items[0])) continue;
      const ov = overlap(x0, x1, c.x0, c.x1) / Math.min(x1 - x0, c.x1 - c.x0 || 1);
      if (ov > 0.45 && ov > bestOv) { best = c; bestOv = ov; }
    }
    if (best) {
      best.items.push(it); best.x0 = Math.min(best.x0, x0); best.x1 = Math.max(best.x1, x1);
      best.y1 = Math.max(best.y1, it.y + it.h);
    } else cells.push({ x0, x1, y0: it.y, y1: it.y + it.h, items: [it] });
  }

  // rows: cells that overlap vertically
  cells.sort((a, b) => a.y0 - b.y0 || a.x0 - b.x0);
  const rows: Row[] = [];
  for (const c of cells) {
    const r = rows.find((r) => overlap(r.y0, r.y1, c.y0, c.y1) > Math.min(r.y1 - r.y0, c.y1 - c.y0) * 0.3 && r.cells.every((o) => overlap(o.x0, o.x1, c.x0, c.x1) < 4));
    if (r) { r.cells.push(c); r.y0 = Math.min(r.y0, c.y0); r.y1 = Math.max(r.y1, c.y1); }
    else rows.push({ y0: c.y0, y1: c.y1, cells: [c], gap: 0 });
  }
  rows.sort((a, b) => a.y0 - b.y0);
  rows.forEach((r, i) => { r.cells.sort((a, b) => a.x0 - b.x0); r.gap = i ? Math.max(0, r.y0 - rows[i - 1].y1) : 0; });

  const xmin = Math.min(...flowItems.map((i) => i.x));
  const xmax = Math.max(...flowItems.map((i) => i.x + i.w), xmin + 700);
  return { hero, rows, xmin, xmax, arrowRows };
}
