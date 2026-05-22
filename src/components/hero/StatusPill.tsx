"use client";

import { useTranslations } from "next-intl";

type Props = {
  state?: "available" | "busy";
};

export default function StatusPill({ state = "available" }: Props) {
  const t = useTranslations("hero");
  const label = state === "available" ? t("statusAvailable") : t("statusBusy");

  return (
    <span
      className="inline-flex items-center gap-2 rounded-full bg-cafe-elev/80 px-3 py-1 font-mono text-xs text-cafe-mute backdrop-blur-sm"
      aria-label={`Status: ${label}`}
    >
      <span
        aria-hidden="true"
        className="relative inline-flex h-2 w-2 items-center justify-center"
      >
        <span className="absolute inline-flex h-full w-full animate-dot-pulse rounded-full bg-emerald-500/60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
      </span>
      {label}
    </span>
  );
}
