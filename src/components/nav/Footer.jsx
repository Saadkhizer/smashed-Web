import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-[color:var(--border)] bg-[color:var(--surface)]">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-xl tracking-tight">SMASHED</span>
          </div>
          <p className="mt-4 text-sm text-[color:var(--muted)] max-w-sm leading-relaxed">
            Hand-smashed patties, cast-iron chargrilled, served hot in Bahria Enclave.
            No shortcuts, no freezer patties, no apologies.
          </p>
          <div className="mt-6 flex gap-3">
            <Social label="Instagram" href="https://instagram.com/smashedpk" />
            <Social label="Facebook" href="https://facebook.com/Smashedpk" />
            <Social label="foodpanda" href="https://www.foodpanda.pk/restaurant/uj5m/smashed-bharia-enclave" />
          </div>
        </div>
        <FooterCol title="Eat" links={[
          { label: "Menu", href: "/menu" },
          { label: "Deals", href: "/menu#deals" },
          { label: "Order online", href: "https://www.foodpanda.pk/restaurant/uj5m/smashed-bharia-enclave" },
        ]} />
        <FooterCol title="Visit" links={[
          { label: "Bahria Enclave", href: "/locations" },
          { label: "Hours", href: "/locations#hours" },
          { label: "Contact", href: "/contact" },
        ]} />
        <FooterCol title="Company" links={[
          { label: "Our story", href: "/story" },
          { label: "Careers", href: "/contact" },
          { label: "Press", href: "/contact" },
        ]} />
      </div>
      <div className="border-t border-[color:var(--border)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-[color:var(--muted)]">
          <p>© {new Date().getFullYear()} Smashed Burgers Pvt Ltd. All rights reserved.</p>
          <p>Made in Islamabad · Open 24 hours</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="eyebrow mb-4">{title}</h4>
      <ul className="flex flex-col gap-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[color:var(--foreground)]/80 hover:text-[color:var(--accent-text)] transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Social({ label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--border)] px-3 py-1.5 text-xs text-[color:var(--muted)] hover:text-[color:var(--foreground)] hover:border-[color:var(--accent-deep)] transition-colors"
    >
      {label}
    </a>
  );
}
