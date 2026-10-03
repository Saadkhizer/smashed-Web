import { optionsFor } from "./data";

export function defaultSel(item) {
  const sel = {};
  optionsFor(item).forEach((g) => { sel[g.id] = g.type === "radio" ? [g.choices[0].id] : []; });
  return sel;
}
export function unitPrice(item, sel) {
  let p = item.price;
  optionsFor(item).forEach((g) => g.choices.forEach((c) => { if ((sel[g.id] || []).includes(c.id)) p += c.add; }));
  return p;
}
export function labelsOf(item, sel) {
  const out = [];
  optionsFor(item).forEach((g) => g.choices.forEach((c, i) => {
    if (!(sel[g.id] || []).includes(c.id)) return;
    if (g.type === "radio" && i === 0 && g.id !== "drink") return;
    out.push(c.label);
  }));
  return out;
}
export function buildLine(item, sel, note = "", qty = 1) {
  return {
    key: item.id + "|" + JSON.stringify(sel) + "|" + note.trim(),
    id: item.id, name: item.name, img: item.img, qty,
    unit: unitPrice(item, sel), opts: labelsOf(item, sel), note: note.trim(),
  };
}
