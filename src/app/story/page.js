import Reveal from "@/components/motion/Reveal";
import CurveDivider from "@/components/ui/CurveDivider";

export const metadata = {
  title: "Our story — SMASHED",
  description: "How one cast-iron plate in Bahria Enclave became Smashed.",
};

const CHAPTERS = [
  {
    year: "2021",
    title: "One plate, one recipe",
    body: "Two friends, one busted cast-iron, and a stubborn belief that a proper smash didn't need a franchise behind it. First month: 40 burgers a day, mostly to neighbours.",
  },
  {
    year: "2022",
    title: "The dynamite sauce that broke us",
    body: "Rolled out one weekend as a special. Sold out by 3 pm. Sold out again the next weekend. Made permanent when it started outselling the classic.",
  },
  {
    year: "2023",
    title: "Sheikh's Mall, shop #3",
    body: "Moved from a corner counter to a proper storefront on Urban Boulevard. Kept the same cast-iron. Added three more.",
  },
  {
    year: "2024",
    title: "The 4.9",
    body: "Ratings on foodpanda cross 4.9 across 100+ reviews. We stop reading the good ones and start reading the bad ones. Menu tightens.",
  },
  {
    year: "2025",
    title: "The OG Double",
    body: "After a year of experiments, the OG Smashed lands: double patty, three cheese, the sauce, the pickles. Priced at Rs. 1,620 because that's what it costs to make it properly.",
  },
];

export default function StoryPage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <p className="eyebrow">Our story</p>
          <h1 className="display mt-5 text-[clamp(2.5rem,7vw,5rem)]">
            We started with a<br />
            <span className="text-[color:var(--accent)]">busted cast-iron.</span>
          </h1>
          <p className="mt-8 text-lg text-[color:var(--muted)] max-w-2xl leading-relaxed">
            No investor pitch, no test kitchen. Just a corner in Bahria Enclave, a
            recipe we&rsquo;d been arguing about for a year, and a rule we still
            keep: never freeze the patty, and never cook one you wouldn&rsquo;t
            eat yourself.
          </p>
        </div>
      </section>

      <CurveDivider fill="var(--surface)" />

      <section className="bg-[color:var(--surface)] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <ol className="relative border-l border-[color:var(--border)] pl-8 md:pl-12 space-y-14">
            {CHAPTERS.map((c, i) => (
              <Reveal key={c.year} delay={i * 0.05}>
                <li className="relative">
                  <span className="absolute -left-[42px] md:-left-[54px] top-1 w-4 h-4 rounded-full bg-[color:var(--accent)] ring-4 ring-[color:var(--surface)]" />
                  <p className="font-display font-bold text-4xl md:text-5xl text-[color:var(--accent-text)]">{c.year}</p>
                  <h3 className="font-display font-semibold text-xl md:text-2xl mt-3">{c.title}</h3>
                  <p className="mt-3 text-[color:var(--muted)] leading-relaxed max-w-xl">{c.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CurveDivider fill="var(--base)" flip />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-5 md:px-8 text-center">
          <p className="eyebrow">Still the same</p>
          <p className="display mt-6 text-[clamp(1.75rem,4vw,3rem)]">
            &ldquo;We didn&rsquo;t open a burger shop to make money. We opened
            it because the burgers we wanted to eat didn&rsquo;t
            <span className="text-[color:var(--accent)]"> exist yet.</span>&rdquo;
          </p>
          <p className="mt-8 text-sm text-[color:var(--muted)]">— The founders</p>
        </div>
      </section>
    </>
  );
}
