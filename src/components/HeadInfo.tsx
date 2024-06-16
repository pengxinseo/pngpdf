import { languages } from "@/config";

const HeadInfo = ({
    title = "",
    description = "",
    page = "",
    locale = "ja"
  }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description}/>
      {
        languages.map((item) => {
          const currentPage = page;
          let hrefLang = item.code;
          if (item.lang == 'ja') {
            hrefLang = 'x-default';
          }
          let href = `https://pngpdf.net/${item.lang}${currentPage}`;
          if (item.lang == 'ja') {
            href = `https://pngpdf.net${currentPage}`;
          }
          return <link key={href} rel="alternate" hrefLang={hrefLang} href={href}/>
        })
      }
      {
        languages.map((item) => {
          const currentPage = page;
          let hrefLang = item.code;
          let href = `https://pngpdf.net/${item.lang}${currentPage}`;
          if (item.lang == 'ja') {
            href = `https://pngpdf.net${currentPage}`;
          }
          if (locale == item.lang) {
            return <link key={href + 'canonical'} rel="canonical" hrefLang={hrefLang} href={href}/>
          }
        })
      }
    </>
  )
}

export default HeadInfo