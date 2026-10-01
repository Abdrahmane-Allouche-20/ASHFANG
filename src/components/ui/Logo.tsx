import Image from "next/image";
import { cn } from "@/lib/cn";
import BrandMark from "@/components/ui/BrandMark";

/**
 * Shield mark + spaced wordmark, echoing the official logo lockup.
 * `priority` (the nav) inlines the mark so it paints with the first frame;
 * elsewhere it loads lazily as an image to keep the HTML small.
 */
export default function Logo({
  className,
  markClassName,
  priority,
}: {
  className?: string;
  markClassName?: string;
  priority?: boolean;
}) {
  const markClass = cn("h-8 w-auto drop-shadow-[0_0_14px_rgba(139,92,246,0.45)]", markClassName);
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {priority ? (
        <BrandMark className={cn("aspect-[1002/1223]", markClass)} />
      ) : (
        <Image src="/brand/mark.svg" alt="" width={1002} height={1223} className={markClass} />
      )}
      <span className="font-display text-[0.95rem] font-semibold tracking-[0.24em] text-fg">
        CYNGUARD
      </span>
    </span>
  );
}
