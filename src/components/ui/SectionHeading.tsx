import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/**
 * Section header: eyebrow, headline, and supporting copy.
 * `split` puts the copy beside the headline on large screens.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "split",
  id,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "split" | "center" | "left";
  id?: string;
  className?: string;
}) {
  return (
    <Reveal
      as="header"
      className={cn(
        "mb-14 md:mb-16",
        align === "split" && "grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end lg:gap-16",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="heading-lg mt-5">
          {title}
        </h2>
      </div>
      {description && (
        <p
          className={cn(
            "lede max-w-xl",
            align === "split" && "lg:justify-self-end lg:pb-1.5",
            align === "center" && "mx-auto mt-5",
            align === "left" && "mt-5",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
