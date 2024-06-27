import PageComponent from "./PageComponent";
import { getBlogLanguageText,getFooterLanguageText,getIndexLanguageText } from "@/configs/languageText"

export const runtime = 'edge';
export default async function IndexPage({params: {locale = '',slug=''}}) {
  const blogLanguageText = await getBlogLanguageText();
  const footerLanguageText = await getFooterLanguageText();
  const IndexLanguageText = await getIndexLanguageText();
  return (
    <PageComponent
      locale={locale}
      slug={slug}
      blogLanguageText={blogLanguageText}
      footerLanguageText={footerLanguageText}
      IndexLanguageText={IndexLanguageText}
    >
    </PageComponent>
  )
}