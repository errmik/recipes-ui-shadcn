import { title } from "@/components/primitives";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  //const t = useTranslations("About");
  const t = await getTranslations("About");
  return (
    <div>
      <h1 className={title()}>{t("about")}</h1>
    </div>
  );
}
//
