import MenuGrid from "@/components/menu/MenuGrid";
import PromoBanner from "@/components/menu/PromoBanner";
import { SAUCES } from "@/lib/menu";

export const metadata = {
  title: "Menu — SMASHED",
  description: "Beef and chicken smash burgers, loaded fries, and deals for the crew.",
};

export default function MenuPage() {
  return (
    <section className="pt-32 md:pt-40 pb-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="eyebrow">The whole menu</p>
          <h1 className="display mt-4 text-[clamp(2.5rem,6vw,4.5rem)]">
            Everything on the pass.<br />
            <span className="text-[color:var(--accent)]">Pick your fight.</span>
          </h1>
          <p className="mt-6 text-[color:var(--muted)] max-w-lg">
            Prices below are the starting size. Doubles, extras, and a rotating
            weekend special available in-branch and on foodpanda.
          </p>
        </div>

        <div className="mt-14">
          <PromoBanner />
          <MenuGrid />
        </div>

        <aside className="mt-24 rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 md:p-10 grid md:grid-cols-[auto_1fr_auto] items-center gap-8">
          <div>
            <p className="eyebrow">Add to any order</p>
            <p className="font-display font-bold text-2xl md:text-3xl mt-3">House sauces</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {SAUCES.map((s) => (
              <li key={s} className="px-4 py-2 rounded-full border border-[color:var(--border)] text-sm">
                {s}
              </li>
            ))}
          </ul>
          <p className="font-display font-bold text-2xl text-[color:var(--accent-text)]">Rs. 100 <span className="text-sm text-[color:var(--muted)]">/ each</span></p>
        </aside>
      </div>
    </section>
  );
}
