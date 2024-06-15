import PageComponent from "./PageComponent";
import { getIndexLanguageText } from "@/configs/languageText"
import {unstable_setRequestLocale} from 'next-intl/server';

export const runtime = 'edge';
export default async function IndexPage({params: {locale = ''}}) {
  unstable_setRequestLocale(locale);
  const indexLanguageText = await getIndexLanguageText();
  return (
    <PageComponent
      locale={locale}
      indexLanguageText={indexLanguageText}
    >
    </PageComponent>
  )
}