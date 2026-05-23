"use client";

import { useTranslations } from "next-intl";
import ContactLetter from "@/components/ContactLetter";
import SectionHeading from "@/components/SectionHeading";

export default function Contact() {
  const t = useTranslations("contact");

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-cafe-base py-24 text-cafe-ink"
    >
      <div className="container relative z-10 mx-auto max-w-5xl px-6 sm:px-8 lg:px-10">
        <SectionHeading chapter={t("chapter")} title={t("headingTitle")} />

        <span id="contact-title" className="sr-only">
          {t("title")}
        </span>

        <div className="mt-12">
          <ContactLetter />
        </div>
      </div>
    </section>
  );
}
