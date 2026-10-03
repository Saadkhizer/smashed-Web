import LocationsCard from "@/components/home/LocationsCard";

export const metadata = {
  title: "Locations — SMASHED",
  description: "Find our branch in Bahria Enclave, Islamabad. Hours, address, delivery.",
};

export default function LocationsPage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-4">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow">Where we are</p>
          <h1 className="display mt-4 text-[clamp(2.5rem,6vw,4.5rem)]">
            One branch,<br />
            <span className="text-[color:var(--accent)]">worth the drive.</span>
          </h1>
          <p className="mt-6 text-[color:var(--muted)] max-w-lg">
            More branches coming. For now, everything happens under one roof
            in Sector A Commercial, Bahria Enclave — and that&rsquo;s how we
            like it.
          </p>
        </div>
      </section>
      <LocationsCard />
    </>
  );
}
