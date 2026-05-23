import { getTranslations } from "next-intl/server";
import FloatingNav from "@/components/FloatingNav";
import Sections from "@/components/Sections";
import StructuredData from "@/components/StructuredData";
import Hero from "@/sections/Hero";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <main
      id="main"
      tabIndex={-1}
      className="min-h-screen bg-cafe-base focus:outline-none"
    >
      <StructuredData
        locale={locale}
        heroDescription={t("hero.description")}
        heroRole={t("hero.role")}
        metadataDescription={t("metadata.description")}
      />
      <FloatingNav />
      <Hero />
      <Sections />
    </main>
  );
}
