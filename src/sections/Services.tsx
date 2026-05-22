"use client";

import { Brain, Code, Layout, Server, Smartphone, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionHeading from "@/components/SectionHeading";
import ServicePostcard from "@/components/ServicePostcard";

type ServiceConfig = {
  key: string;
  Icon: LucideIcon;
  iconColorClass: string;
  number: string;
  rotation: number;
};

const SERVICES: ServiceConfig[] = [
  { key: "web",        Icon: Layout,     iconColorClass: "text-blue-600",    number: "01", rotation: -1.2 },
  { key: "backend",    Icon: Server,     iconColorClass: "text-emerald-600", number: "02", rotation: 1.5 },
  { key: "api",        Icon: Code,       iconColorClass: "text-purple-600",  number: "03", rotation: -0.8 },
  { key: "responsive", Icon: Smartphone, iconColorClass: "text-amber-600",   number: "04", rotation: 1.2 },
  { key: "web3",       Icon: Zap,        iconColorClass: "text-orange-600",  number: "05", rotation: -1 },
  { key: "ai",         Icon: Brain,      iconColorClass: "text-emerald-700", number: "06", rotation: 0.6 },
];

export default function Services() {
  const t = useTranslations("services");

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="border-dashed-coffee relative overflow-hidden bg-cafe-base py-24 text-cafe-ink"
    >
      <div className="container relative z-10 mx-auto max-w-5xl px-6 sm:px-8 lg:px-10">
        <SectionHeading chapter={t("chapter")} title={t("headingTitle")} />

        <span id="services-title" className="sr-only">
          {t("title")}
        </span>

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc, i) => (
            <ServicePostcard
              key={svc.key}
              Icon={svc.Icon}
              iconColorClass={svc.iconColorClass}
              number={svc.number}
              tag={t(`${svc.key}.tag`)}
              title={t(`${svc.key}.title`)}
              description={t(`${svc.key}.description`)}
              rotation={svc.rotation}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
