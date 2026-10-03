import Reveal from "@/components/motion/Reveal";

export default function LocationsCard() {
  return (
    <section className="relative py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid md:grid-cols-2 gap-10 items-stretch">
        <Reveal>
          <div className="h-full rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 md:p-10 relative overflow-hidden">
            <div className="bloom w-[280px] h-[280px] -bottom-32 -left-16 opacity-70" />
            <div className="relative">
              <p className="eyebrow">Come find us</p>
              <h2 className="display mt-4 text-[clamp(1.75rem,4vw,2.75rem)]">
                Sector A Commercial,<br />
                <span className="text-[color:var(--accent)]">Bahria Enclave.</span>
              </h2>
              <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
                Shop #3, Sheikh&rsquo;s Mall, Urban Boulevard. Look for the queue.
              </p>

              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <dt className="eyebrow text-[color:var(--muted)]">Mon – Thu</dt>
                  <dd className="font-display font-semibold text-lg mt-1">Open 24h</dd>
                </div>
                <div>
                  <dt className="eyebrow text-[color:var(--muted)]">Fri</dt>
                  <dd className="font-display font-semibold text-lg mt-1">2 pm – 12 am</dd>
                </div>
                <div>
                  <dt className="eyebrow text-[color:var(--muted)]">Sat – Sun</dt>
                  <dd className="font-display font-semibold text-lg mt-1">Open 24h</dd>
                </div>
                <div>
                  <dt className="eyebrow text-[color:var(--muted)]">Min order</dt>
                  <dd className="font-display font-semibold text-lg mt-1">Rs. 500</dd>
                </div>
              </dl>

              <div className="mt-10 flex gap-3">
                <a
                  href="https://maps.google.com/?q=Sheikh's+Mall+Bahria+Enclave+Islamabad"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[color:var(--accent)] text-[color:var(--accent-foreground)] font-semibold px-5 py-3 hover:bg-[color:var(--accent-deep)] hover:text-[color:var(--foreground)] transition-colors"
                >
                  Open in Maps →
                </a>
                <a
                  href="tel:+92000000000"
                  className="rounded-full border border-[color:var(--border)] px-5 py-3 text-sm hover:border-[color:var(--accent-deep)] transition-colors"
                >
                  Call the branch
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="h-full rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--surface-2)] p-8 md:p-10 relative overflow-hidden">
            <p className="eyebrow">Delivery</p>
            <h3 className="display mt-4 text-[clamp(1.5rem,3.5vw,2.25rem)]">
              We hit your door in under 30.
            </h3>
            <p className="mt-4 text-[color:var(--muted)]">
              Order through the panda, or ring the branch for pickup. Delivery fee flat
              Rs. 150 within Bahria Enclave.
            </p>
            <div className="mt-10 grid gap-4">
              <PartnerRow name="foodpanda" tag="4.9 ★ · 100+ reviews" href="https://www.foodpanda.pk/restaurant/uj5m/smashed-bharia-enclave" />
              <PartnerRow name="Cheetay" tag="Coming soon" muted />
              <PartnerRow name="Careem NOW" tag="Coming soon" muted />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PartnerRow({ name, tag, href, muted = false }) {
  const Tag = href ? "a" : "div";
  return (
    <Tag
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      className={`flex items-center justify-between rounded-2xl border border-[color:var(--border)] px-5 py-4 ${
        muted ? "opacity-50" : "hover:border-[color:var(--accent-deep)] transition-colors"
      }`}
    >
      <div>
        <p className="font-display font-semibold">{name}</p>
        <p className="text-xs text-[color:var(--muted)] mt-0.5">{tag}</p>
      </div>
      {href ? <span className="text-[color:var(--accent-text)]">→</span> : <span className="text-xs text-[color:var(--muted)]">—</span>}
    </Tag>
  );
}
