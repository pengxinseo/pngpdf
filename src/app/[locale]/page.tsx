import PageComponent from "./PageComponent";
import { getIndexLanguageText, getFooterLanguageText } from "@/configs/languageText"
import {unstable_setRequestLocale} from 'next-intl/server';

export const runtime = 'edge';
export default async function IndexPage({params: {locale = ''}}) {
  unstable_setRequestLocale(locale);
  const indexLanguageText = await getIndexLanguageText();
  const footerLanguageText = await getFooterLanguageText();
  return (
    <PageComponent
      locale={locale}
      indexLanguageText={indexLanguageText}
      footerLanguageText={footerLanguageText}
    >
    </PageComponent>
  )
}