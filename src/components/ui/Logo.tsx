import Image from "next/image";
import { cn } from "@/lib/cn";

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
    <Image
      src="/logo title without bg.png"
      alt="Ashfang"
      width={1112}
      height={230}
      priority={priority}
      className={cn("h-8 w-auto object-contain", markClassName, className)}
    />
  );
}
