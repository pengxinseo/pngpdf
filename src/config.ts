import { Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'zh', 'ko', 'ja', 'tw', 'pt', 'es', 'de', 'fr', 'vi', 'ru', 'ar'] as const;

export const languages = [
  {
    code: "en-US",
    lang: "en",
    language: "English"
  },
  {
    code: "zh-CN",
    lang: "zh",
    language: "简体中文"
  },
  {
    code: "ko-KR",
    lang: "ko",
    language: "한국어"
  },
  {
    code: "ja-JP",
    lang: "ja",
    language: "日本語"
  },
  {
    code: "zh-TW",
    lang: "tw",
    language: "繁體中文"
  },
  {
    code: "pt-PT",
    lang: "pt",
    language: "Português"
  },
  {
    code: "es-ES",
    lang: "es",
    language: "Español"
  },
  {
    code: "de-DE",
    lang: "de",
    language: "Deutsch"
  },
  {
    code: "fr-FR",
    lang: "fr",
    language: "Français"
  },
  {
    code: "vi-VI",
    lang: "vi",
    language: "Tiếng Việt"
  },
  {
    code: "ru-RU",
    lang: "ru",
    language: "Russian"
  },
  {
    code: "ar-AR",
    lang: "ar",
    language: "Arabic"
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
