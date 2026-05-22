"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Timeline({ children, className = "" }: Props) {
  return (
    <div className={`relative ${className}`}>
      {/* Vertical dashed line */}
      <div
        aria-hidden="true"
        className="absolute bottom-4 top-4 w-px left-[68px] sm:left-[88px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, var(--cafe-border) 0 6px, transparent 6px 10px)",
        }}
      />
      <ol className="relative space-y-6">{children}</ol>
    </div>
  );
}
