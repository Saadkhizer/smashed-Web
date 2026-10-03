"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { DELIVERY_FEE, FOODPANDA, MIN_ORDER, WHATSAPP, fmt, optionsFor } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { buildLine, defaultSel, unitPrice } from "@/lib/line";
import { flyToCart } from "@/lib/fly";
import { TrashIcon } from "./Icons";

function useLock(open, onClose) {
  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("lock");
    window.__lenis?.stop();
    const key = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", key);
    return () => {
      document.documentElement.classList.remove("lock");
      window.__lenis?.start();
      window.removeEventListener("keydown", key);
    };
  }, [open, onClose]);
}

/* ---------- item customiser (bottom sheet on phones, dialog on desktop) ---------- */
export function ItemModal() {
  const { item, setItem, add } = useCart();
  const close = () => setItem(null);
  useLock(!!item, close);
  if (!item) return null;
  return <ModalInner key={item.id} item={item} close={close} add={add} />;
}

function ModalInner({ item, close, add }) {
  const groups = optionsFor(item);
  const [sel, setSel] = useState(() => defaultSel(item));
  const [note, setNote] = useState("");
  const [qty, setQty] = useState(1);
  const addBtn = useRef(null);
  const x = useRef(null);
  useEffect(() => { x.current?.focus(); }, []);

  const pick = (g, id) => setSel((s) => {
    if (g.type === "radio") return { ...s, [g.id]: [id] };
    const cur = s[g.id] || [];
    return { ...s, [g.id]: cur.includes(id) ? cur.filter((c) => c !== id) : [...cur, id] };
  });
  const total = unitPrice(item, sel) * qty;

  return (
    <>
      <div className="scrim" onClick={close} />
      <div className="sheet modal" role="dialog" aria-modal="true" aria-label={item.name}>
        <button ref={x} className="sheet-x" onClick={close} aria-label="Close">×</button>
        <div className="sheet-scroll" data-lenis-prevent>
          <div className="m-img">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={item.img} alt={item.name} /></div>
          <div className="m-body">
            <div className="m-title"><h2>{item.name}</h2><span className="price">{fmt(item.price)}</span></div>
            <p className="m-desc">{item.tag}</p>
            {groups.map((g) => (
              <div className="opt-group" key={g.id} role={g.type === "radio" ? "radiogroup" : "group"} aria-label={g.label}>
                <h4>{g.label} <small className={g.required ? "req" : ""}>{g.required ? "Required" : "Optional"}</small></h4>
                {g.choices.map((c) => {
                  const on = (sel[g.id] || []).includes(c.id);
                  return (
                    <button key={c.id} className="opt" role={g.type === "radio" ? "radio" : "checkbox"} aria-checked={on} onClick={() => pick(g, c.id)}>
                      <span className={"mk " + (g.type === "radio" ? "radio" : "check")}>{g.type === "radio" ? "●" : "✓"}</span>
                      <span className="lbl">{c.label}</span>
                      {c.add > 0 && <span className="dl">+ {fmt(c.add)}</span>}
                    </button>
                  );
                })}
              </div>
            ))}
            <div className="opt-group">
              <h4>Special instructions <small>Optional</small></h4>
              <textarea className="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="No pickles, extra crispy, sauce on the side…" />
            </div>
          </div>
        </div>
        <div className="sheet-foot">
          <div className="foot-row">
            <div className="stepper">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="Less">−</button>
              <output aria-live="polite">{qty}</output>
              <button onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="More">+</button>
            </div>
            <button
              ref={addBtn} className="btn btn-primary"
              onClick={() => { add(buildLine(item, sel, note, qty)); flyToCart(addBtn.current, item.img); close(); }}
            >
              <span>Add to cart</span><span>{fmt(total)}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- cart drawer + WhatsApp hand-off ---------- */
export function CartDrawer() {
  const { cartOpen, setCartOpen } = useCart();
  const close = () => setCartOpen(false);
  useLock(cartOpen, close);
  if (!cartOpen) return null;
  return <DrawerInner close={close} />;
}

function DrawerInner({ close }) {
  const { lines, subtotal, qty, remove, clear } = useCart();
  const [mode, setMode] = useState("delivery");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addr, setAddr] = useState("");
  const fee = mode === "delivery" && lines.length ? DELIVERY_FEE : 0;
  const total = subtotal + fee;
  const short = mode === "delivery" ? Math.max(0, MIN_ORDER - subtotal) : 0;
  const ready = lines.length > 0 && short === 0 && name.trim() && phone.trim().length >= 7 && (mode === "pickup" || addr.trim());

  const msg = () => {
    const rows = lines.map((l) => `• ${l.qty}× ${l.name}${l.opts.length ? " (" + l.opts.join(", ") + ")" : ""}${l.note ? " — note: " + l.note : ""} — ${fmt(l.qty * l.unit)}`);
    return [
      "*New order — SMASHED*", "", ...rows, "",
      `Subtotal: ${fmt(subtotal)}`, mode === "delivery" ? `Delivery: ${fmt(fee)}` : "Pickup: free", `*Total: ${fmt(total)}*`, "",
      `Name: ${name.trim()}`, `Phone: ${phone.trim()}`, mode === "delivery" ? `Address: ${addr.trim()}` : "Pickup from Bahria Enclave, Sector A",
    ].join("\n");
  };
  const href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg())}`;

  return (
    <>
      <div className="scrim" onClick={close} />
      <div className="sheet drawer" role="dialog" aria-modal="true" aria-label="Your cart">
        <button className="sheet-x" onClick={close} aria-label="Close cart">×</button>
        <div className="sheet-scroll" data-lenis-prevent>
          <div className="d-head"><h2>Your order</h2><p>{lines.length ? "Check it, then send it to the kitchen." : "Nothing here yet."}</p></div>
          <div className="d-body">
            {lines.length === 0 ? (
              <div className="d-empty"><b>Cart is empty</b>Tap the + on any dish to start.</div>
            ) : (
              <>
                <div className="mode" role="group" aria-label="Order type">
                  <button aria-pressed={mode === "delivery"} onClick={() => setMode("delivery")}>Delivery</button>
                  <button aria-pressed={mode === "pickup"} onClick={() => setMode("pickup")}>Pickup</button>
                </div>
                {lines.map((l) => (
                  <div className="line" key={l.key}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.img} alt="" />
                    <div>
                      <b>{l.name}</b>
                      {l.opts.length > 0 && <small>{l.opts.join(" · ")}</small>}
                      {l.note && <small>“{l.note}”</small>}
                      <span className="lp">{fmt(l.qty * l.unit)}</span>
                    </div>
                    <div className="stepper">
                      <button onClick={() => (l.qty === 1 ? remove(l.key) : qty(l.key, -1))} aria-label={l.qty === 1 ? "Remove" : "Less"}>{l.qty === 1 ? <TrashIcon /> : "−"}</button>
                      <output>{l.qty}</output>
                      <button onClick={() => qty(l.key, 1)} aria-label="More">+</button>
                    </div>
                  </div>
                ))}
                <div className="sum">
                  <div><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
                  <div><span>{mode === "delivery" ? "Delivery fee" : "Pickup"}</span><span>{mode === "delivery" ? fmt(fee) : "Free"}</span></div>
                  <div className="tot"><span>Total</span><span>{fmt(total)}</span></div>
                </div>
                {short > 0 && <div className="warn">Add {fmt(short)} more to reach the {fmt(MIN_ORDER)} delivery minimum.</div>}
                <div className="fields">
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" />
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" inputMode="tel" autoComplete="tel" />
                  {mode === "delivery" && <textarea value={addr} onChange={(e) => setAddr(e.target.value)} placeholder="Delivery address (house, street, sector)" autoComplete="street-address" />}
                </div>
              </>
            )}
          </div>
        </div>
        {lines.length > 0 && (
          <div className="sheet-foot">
            <a className="btn btn-primary wa btn-block" href={ready ? href : undefined} aria-disabled={!ready} target="_blank" rel="noopener noreferrer"
              onClick={(e) => { if (!ready) e.preventDefault(); }}>
              Send order on WhatsApp · {fmt(total)}
            </a>
            <p className="fine">
              {ready ? "Opens WhatsApp with your order filled in." : "Fill in your details to send."} Or <a href={FOODPANDA} target="_blank" rel="noopener noreferrer">order on foodpanda</a> · <button onClick={clear} style={{ textDecoration: "underline" }}>clear cart</button>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

/* ---------- floating mobile cart bar + toast ---------- */
export function CartBar() {
  const { count, subtotal, cartOpen, item, setCartOpen } = useCart();
  if (!count || cartOpen || item) return null;
  return (
    <button className="cartbar" onClick={() => setCartOpen(true)}>
      <span>{count} item{count > 1 ? "s" : ""} · {fmt(subtotal)}</span>
      <span className="go">View cart →</span>
    </button>
  );
}
export function Toast() {
  const { toast } = useCart();
  if (!toast) return null;
  return <div className="toast" role="status">✓ {toast}</div>;
}
