"use client";

import { useEffect, useState } from "react";
import { CLOCKS } from "@/lib/site";
import { cn } from "@/lib/cn";

/** Live local times — rendered after mount to avoid a server/client mismatch. */
export default function Clocks() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
      {CLOCKS.map((c) => {
        const time = now
          ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: c.tz }).format(now)
          : "--:--";
        const hour = now
          ? Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: c.tz }).format(now))
          : null;
        const working = hour !== null && hour >= 8 && hour < 19;
        return (
          <li key={c.city} className="min-w-0">
            <p className="flex items-center gap-1.5 truncate text-[12px] text-muted">
              <span
                className={cn("h-1.5 w-1.5 shrink-0 rounded-full", working ? "bg-ok" : "bg-[#3a3a50]")}
                title={working ? "Business hours" : "After hours"}
              />
              {c.city}
            </p>
            <p className="mt-0.5 font-mono text-[15px] tabular-nums text-fg" suppressHydrationWarning>
              {time}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
