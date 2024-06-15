import { getTranslations } from "next-intl/server";

export const getIndexLanguageText = async () => {
  const tIndex = await getTranslations('IndexPage');
  return {
    title: tIndex('title'),
    description: tIndex('description')
  };
}