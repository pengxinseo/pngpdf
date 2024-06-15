import { Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'zh', 'ko', 'ja', 'tw', 'pt', 'es', 'de', 'fr', 'vi', 'ru', 'ar'] as const;

//svg的地址： https://github.com/olibrodesign/MD-Glam2/blob/796d779cbea55f2e32d1a7b3dd9520f3c6600855/snippets/flags.liquid#L9
export const languages = [
  {
    code: "en-US",
    lang: "en",
    language: "English",
    svg: '<svg class="flag--root flag--US" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342"><path fill="#FFF" d="M0 0h513v342H0z"/><path d="M0 0h513v26.3H0zm0 52.6h513v26.3H0zm0 52.6h513v26.3H0zm0 52.6h513v26.3H0zm0 52.7h513v26.3H0zm0 52.6h513v26.3H0zm0 52.6h513V342H0z" fill="#D80027"/><path fill="#2E52B2" d="M0 0h256.5v184.1H0z"/><path d="m47.8 138.9-4-12.8-4.4 12.8H26.2l10.7 7.7-4 12.8 10.9-7.9 10.6 7.9-4.1-12.8 10.9-7.7zm56.3 0-4.1-12.8-4.2 12.8H82.6l10.7 7.7-4 12.8 10.7-7.9 10.8 7.9-4-12.8 10.7-7.7zm56.5 0-4.3-12.8-4 12.8h-13.5l11 7.7-4.2 12.8 10.7-7.9 11 7.9-4.2-12.8 10.7-7.7zm56.2 0-4-12.8-4.2 12.8h-13.3l10.8 7.7-4 12.8 10.7-7.9 10.8 7.9-4.3-12.8 11-7.7zM100 75.3l-4.2 12.8H82.6L93.3 96l-4 12.6 10.7-7.8 10.8 7.8-4-12.6 10.7-7.9h-13.4zm-56.2 0-4.4 12.8H26.2L36.9 96l-4 12.6 10.9-7.8 10.6 7.8L50.3 96l10.9-7.9H47.8zm112.5 0-4 12.8h-13.5l11 7.9-4.2 12.6 10.7-7.8 11 7.8-4.2-12.6 10.7-7.9h-13.2zm56.5 0-4.2 12.8h-13.3l10.8 7.9-4 12.6 10.7-7.8 10.8 7.8-4.3-12.6 11-7.9h-13.5zm-169-50.6-4.4 12.6H26.2l10.7 7.9-4 12.7L43.8 50l10.6 7.9-4.1-12.7 10.9-7.9H47.8zm56.2 0-4.2 12.6H82.6l10.7 7.9-4 12.7L100 50l10.8 7.9-4-12.7 10.7-7.9h-13.4zm56.3 0-4 12.6h-13.5l11 7.9-4.2 12.7 10.7-7.9 11 7.9-4.2-12.7 10.7-7.9h-13.2zm56.5 0-4.2 12.6h-13.3l10.8 7.9-4 12.7 10.7-7.9 10.8 7.9-4.3-12.7 11-7.9h-13.5z" fill="#FFF"/></svg>'
  },
  {
    code: "zh-CN",
    lang: "zh",
    language: "简体中文",
    svg:'<svg class="flag--root flag--CN" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342"><path fill="#D80027" d="M0 0h513v342H0z"/><path d="m226.8 239.2-9.7-15.6-17.9 4.4 11.9-14.1-9.7-15.6 17.1 6.9 11.8-14.1-1.3 18.4 17.1 6.9-17.9 4.4zM290.6 82l-10.1 15.4 11.6 14.3-17.7-4.8-10.1 15.5-1-18.4-17.7-4.8 17.2-6.6-1-18.4 11.6 14.3zm-54.4-56.6-2 18.3 16.8 7.6-18 3.8-2 18.3-9.2-16-17.9 3.8 12.3-13.7-9.2-15.9 16.8 7.5zm56.6 136.4-14.9 10.9 5.8 17.5-14.9-10.8-14.9 11 5.6-17.6-14.9-10.7 18.4-.1 5.6-17.6 5.8 17.5zM115 46.3l17.3 53.5h56.2l-45.4 32.9 17.3 53.5-45.4-33-45.5 33 17.4-53.5-45.5-32.9h56.3z" fill="#FFDA44"/></svg>'
  },
  {
    code: "ko-KR",
    lang: "ko",
    language: "한국어",
    svg:'<svg class="flag--root flag--KR" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><path fill="#FFF" d="M0 0h900v600H0z"/><g transform="rotate(-56.31)"><path d="M-75 228.3H75m-150 37.5H75m-150 37.5H75m-150 475H75m-150 37.5H75m-150 37.5H75" stroke="#000" stroke-width="25"/><path stroke="#FFF" stroke-width="12.5" d="M0 753.3v125"/><circle fill="#ca163a" cy="540.8" r="150"/><path fill="#0e4896" d="M0 390.8c-41.4 0-75 33.6-75 75s33.6 75 75 75 75 33.6 75 75-33.6 75-75 75c-82.8 0-150-67.2-150-150s67.2-150 150-150z"/></g><path d="m231.56 535.73-83.205-124.808M262.76 514.928l-83.205-124.807m114.407 104.006-83.205-124.808m478.43-138.675-83.205-124.807M720.39 209.843 637.184 85.036m114.407 104.006L668.386 64.234" stroke="#000" stroke-width="25"/><path stroke="#FFF" stroke-width="12.5" d="m205.6 462.897 31.202-20.8m389.981-259.989 36.444-24.296m31.202-20.801 31.202-20.801"/></svg>'
  },
  {
    code: "ja-JP",
    lang: "ja",
    language: "日本語",
    svg:'<svg class="flag--root flag--JP" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333"><path fill="#FFF" d="M0 85.331h512v341.337H0z"/><circle fill="#D80027" cx="256" cy="255.994" r="96"/></svg>'
  },
  {
    code: "zh-TW",
    lang: "tw",
    language: "繁體中文",
    svg:'<svg class="flag--root flag--TW" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333"><path fill="#D80027" d="M0 85.337h512v341.326H0z"/><path fill="#0052B4" d="M0 85.337h256V256H0z"/><path fill="#FFF" d="M186.435 170.669 162.558 181.9l12.714 23.125-25.927-4.961-3.286 26.192L128 206.993l-18.06 19.263-3.285-26.192-25.927 4.96 12.714-23.125-23.877-11.23 23.877-11.231-12.714-23.125 25.927 4.96 3.286-26.192L128 134.344l18.06-19.263 3.285 26.192 25.928-4.96-12.715 23.125z"/><circle fill="#0052B4" cx="128" cy="170.674" r="29.006"/><path fill="#FFF" d="M128 190.06c-10.692 0-19.391-8.7-19.391-19.391 0-10.692 8.7-19.391 19.391-19.391 10.692 0 19.391 8.7 19.391 19.391 0 10.691-8.699 19.391-19.391 19.391z"/></svg>'
  },
  {
    code: "pt-PT",
    lang: "pt",
    language: "Português",
    svg:'<svg class="flag--root flag--PT" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333"><path fill="#D80027" d="M0 85.337h512v341.326H0z"/><path fill="#6DA544" d="M196.641 85.337v341.326H0V85.337z"/><circle fill="#FFDA44" cx="196.641" cy="256" r="64"/><path fill="#D80027" d="M160.638 224v40.001c0 19.882 16.118 36 36 36s36-16.118 36-36V224h-72z"/><path fill="#FFF" d="M196.638 276c-6.617 0-12-5.383-12-12v-16h24.001v16c-.001 6.616-5.385 12-12.001 12z"/></svg>'
  },
  {
    code: "es-ES",
    lang: "es",
    language: "Español",
    svg:'<svg class="flag--root flag--ES" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333"><path fill="#FFDA44" d="M0 85.331h512v341.337H0z"/><path d="M0 85.331h512v113.775H0zm0 227.551h512v113.775H0z" fill="#D80027"/></svg>'
  },
  {
    code: "de-DE",
    lang: "de",
    language: "Deutsch",
    svg:'<svg class="flag--root flag--DE" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333"><path fill="#D80027" d="M0 85.331h512v341.337H0z"/><path d="M0 85.331h512v113.775H0z"/><path fill="#FFDA44" d="M0 312.882h512v113.775H0z"/></svg>'
  },
  {
    code: "fr-FR",
    lang: "fr",
    language: "Français",
    svg:'<svg class="flag--root flag--FR" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333"><path fill="#FFF" d="M0 85.331h512v341.337H0z"/><path fill="#0052B4" d="M0 85.331h170.663v341.337H0z"/><path fill="#D80027" d="M341.337 85.331H512v341.337H341.337z"/></svg>'
  },
  {
    code: "vi-VI",
    lang: "vi",
    language: "Tiếng Việt",
    svg:'<svg class="flag--root flag--VN" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333"><path fill="#D80027" d="M196.641 85.337H0v341.326h512V85.337z"/><path fill="#FFDA44" d="m256 157.279 22.663 69.747H352l-59.332 43.106 22.664 69.749L256 296.774l-59.332 43.107 22.664-69.749L160 227.026h73.337z"/></svg>'
  },
  {
    code: "ru-RU",
    lang: "ru",
    language: "Russian",
    svg:'<svg class="flag--root flag--RU" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333"><path fill="#FFF" d="M0 85.33v341.332h512V85.33z"/><path fill="#0052B4" d="M0 85.333h512V426.67H0z"/><path fill="#FFF" d="M0 85.333h512v113.775H0z"/><path fill="#D80027" d="M0 312.884h512v113.775H0z"/></svg>'
  },
  {
    code: "ar-AR",
    lang: "ar",
    language: "Arabic",
    svg:'<svg class="flag--root flag--AR" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342"><path fill="#FFF" d="M0 0h512v342H0z"/><path fill="#338AF3" d="M0 0h512v114H0zm0 228h512v114H0z"/><circle fill="#FFDA44" stroke="#d6ab00" stroke-width="5" cx="256.5" cy="171" r="40"/></svg>'
  }
]

export const pathnames = {
  '/': '/',
} satisfies Pathnames<typeof locales>;

// Use the default: `always`，设置为 as-needed可不显示默认路由
export const localePrefix = 'as-needed';

export type AppPathnames = keyof typeof pathnames;

export const getLanguageByLang = (lang:any) => {
  for (let i = 0; i < languages.length; i++) {
    if (lang == languages[i].lang) {
      return languages[i];
    }
  }
}
