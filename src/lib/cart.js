"use client";
import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";

const KEY = "smashed-cart-v2";
const CartCtx = createContext(null);

function reducer(state, a) {
  switch (a.type) {
    case "hydrate": return a.lines;
    case "add": {
      const i = state.findIndex((l) => l.key === a.line.key);
      if (i >= 0) return state.map((l, j) => (j === i ? { ...l, qty: l.qty + a.line.qty } : l));
      return [...state, a.line];
    }
    case "qty": return state.map((l) => (l.key === a.key ? { ...l, qty: Math.max(0, l.qty + a.d) } : l)).filter((l) => l.qty > 0);
    case "remove": return state.filter((l) => l.key !== a.key);
    case "clear": return [];
    default: return state;
  }
}

export function CartProvider({ children }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [cartOpen, setCartOpen] = useState(false);
  const [item, setItem] = useState(null); // item shown in the customiser
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) dispatch({ type: "hydrate", lines: JSON.parse(raw) }); } catch (e) {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch (e) {}
  }, [lines]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const value = useMemo(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.qty * l.unit, 0);
    return {
      lines, count, subtotal, cartOpen, setCartOpen, item, setItem, toast,
      add: (line) => { dispatch({ type: "add", line }); setToast(`${line.name} added`); },
      qty: (key, d) => dispatch({ type: "qty", key, d }),
      remove: (key) => dispatch({ type: "remove", key }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [lines, cartOpen, item, toast]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
export const useCart = () => useContext(CartCtx);
