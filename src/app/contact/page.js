import Reveal from "@/components/motion/Reveal";

export const metadata = {
  title: "Contact — SMASHED",
  description: "Get in touch — orders, events, press, or just to say hi.",
};

export default function ContactPage() {
  return (
    <section className="pt-32 md:pt-40 pb-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8 grid md:grid-cols-[1fr_1.1fr] gap-14">
        <Reveal>
          <p className="eyebrow">Get in touch</p>
          <h1 className="display mt-4 text-[clamp(2.25rem,5vw,3.75rem)]">
            Say something.<br />
            <span className="text-[color:var(--accent)]">We&rsquo;re listening.</span>
          </h1>
          <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
            For orders, ring the branch or use foodpanda. For anything else — bulk
            orders, events, press, feedback that will not fit in a review — this
            form goes straight to the founders.
          </p>

          <div className="mt-10 space-y-6">
            <ContactRow label="Branch line" value="+92 (000) 000-0000" />
            <ContactRow label="Email" value="hello@smashed.pk" />
            <ContactRow label="For press" value="press@smashed.pk" />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form className="rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--surface)] p-7 md:p-9 space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <Field id="name" label="Your name" placeholder="Ahmed" />
              <Field id="phone" label="Phone" placeholder="+92" />
            </div>
            <Field id="email" label="Email" placeholder="you@example.com" type="email" />
            <Field id="subject" label="What's it about?" placeholder="Birthday order, feedback, partnership…" />
            <TextArea id="message" label="Your message" placeholder="Tell us what you need" />
            <button
              type="submit"
              className="w-full rounded-full bg-[color:var(--accent)] text-[color:var(--accent-foreground)] font-semibold px-6 py-3.5 hover:bg-[color:var(--accent-deep)] hover:text-[color:var(--foreground)] transition-colors"
            >
              Send it →
            </button>
            <p className="text-xs text-[color:var(--muted)] text-center">
              We reply within 24 hours. Usually much faster.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function ContactRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between border-b border-[color:var(--border)] pb-4">
      <p className="eyebrow">{label}</p>
      <p className="font-display font-semibold text-lg">{value}</p>
    </div>
  );
}

function Field({ id, label, placeholder, type = "text" }) {
  return (
    <label htmlFor={id} className="block">
      <span className="eyebrow block mb-2">{label}</span>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-full border border-[color:var(--border)] bg-[color:var(--base)] px-5 py-3 text-sm focus:border-[color:var(--accent)] outline-none transition-colors"
      />
    </label>
  );
}

function TextArea({ id, label, placeholder }) {
  return (
    <label htmlFor={id} className="block">
      <span className="eyebrow block mb-2">{label}</span>
      <textarea
        id={id}
        name={id}
        rows={5}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--base)] px-5 py-3 text-sm focus:border-[color:var(--accent)] outline-none transition-colors resize-none"
      />
    </label>
  );
}
