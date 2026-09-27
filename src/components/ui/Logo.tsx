import Image from "next/image";
import { cn } from "@/lib/cn";

/** Shield mark + spaced wordmark, echoing the official logo lockup. */
export default function Logo({
  className,
  markClassName,
  priority,
}: {
  className?: string;
  markClassName?: string;
  priority?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/brand/mark.png"
        alt=""
        width={240}
        height={316}
        priority={priority}
        className={cn("h-7 w-auto drop-shadow-[0_0_14px_rgba(139,92,246,0.45)]", markClassName)}
      />
      <span className="font-display text-[0.95rem] font-semibold tracking-[0.24em] text-fg">
        CYNGUARD
      </span>
    </span>
  );
}
