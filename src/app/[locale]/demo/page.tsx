import PageComponent from "./PageComponent";
import { getIndexLanguageText } from "@/configs/languageText"


export default async function IndexPage({params: {locale = ''}}) {
 
  const authLanguageText = await getIndexLanguageText();
  return (
    <PageComponent
      locale={locale}
      authLanguageText={authLanguageText}
    >
    </PageComponent>
  )
}