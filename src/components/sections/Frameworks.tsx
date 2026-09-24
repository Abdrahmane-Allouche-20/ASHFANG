import { FRAMEWORKS } from "@/lib/site";

export default function Frameworks() {
  const items = [...FRAMEWORKS, ...FRAMEWORKS];
  return (
    <section aria-label="Frameworks and disciplines we work with" className="relative">
      <div className="divider-x" />
      <div className="container-page flex flex-col items-center gap-5 py-9 md:flex-row md:gap-10">
        <p className="shrink-0 text-center font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-subtle md:w-44 md:text-left">
          Built on industry standards
        </p>
        <div className="marquee relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <ul className="marquee-track flex w-max items-center">
            {items.map((f, i) => (
              <li
                key={i}
                aria-hidden={i >= FRAMEWORKS.length || undefined}
                className="flex items-center whitespace-nowrap font-display text-[1.05rem] font-medium tracking-[-0.01em] text-muted"
              >
                <span className="mx-7 h-1 w-1 rounded-full bg-[#3a3a50]" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="divider-x" />
    </section>
  );
}
