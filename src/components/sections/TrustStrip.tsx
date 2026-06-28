const TAGS = [
  "OWASP",
  "MITRE ATT&CK",
  "PTES",
  "NIST CSF",
  "ISO 27001",
  "Zero Trust",
  "Threat Intelligence",
  "Red Teaming",
  "OSINT",
];

export default function TrustStrip() {
  return (
    <section className="relative border-y border-line/60 bg-ink/40 py-6">
      <p className="mb-5 text-center font-mono text-xs uppercase tracking-[0.25em] text-muted">
        Built on industry-standard methodologies
      </p>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12">
          {[...TAGS, ...TAGS].map((t, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-lg font-semibold text-muted transition-colors hover:text-fg"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
