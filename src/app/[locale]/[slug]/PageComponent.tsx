"use client";
export const runtime = 'edge';
import React from 'react';
import Post from "@/components/MdxPost"
import ChangeLangs from '@/components/ChangeLang';
import HeadInfo from '@/components/HeadInfo';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';

import postsEn from '@root/content/en.json';
import postsZh from '@root/content/zh.json';
import postsKo from '@root/content/ko.json';
import postsJa from '@root/content/ja.json';
import postsTw from '@root/content/tw.json';
import postsPt from '@root/content/pt.json';
import postsEs from '@root/content/es.json';
import postsDe from '@root/content/de.json';
import postsFr from '@root/content/fr.json';
import postsVi from '@root/content/vi.json';
import postsRu from '@root/content/ru.json';
import postsAr from '@root/content/ar.json';
import postsFil from '@root/content/fil.json';
import postsId from '@root/content/id.json';
import postsTr from '@root/content/tr.json';
import postsMs from '@root/content/ms.json';
import postsHi from '@root/content/hi.json';

const PageComponent = ({
  locale,
  slug,
  blogLanguageText,
  footerLanguageText,
  IndexLanguageText
}: { locale: any; blogLanguageText: any; slug: any, footerLanguageText: any, IndexLanguageText:any }) => {

  //查询mdx文件名作为slug 查询到返回 不存在mdx 则返回 404页面
  const getPostByLocaleAndSlug = (locale: string, slug: string) => {
    const postsByLocale = {
      en: postsEn,
      zh: postsZh,
      ko: postsKo,
      ja: postsJa,
      tw: postsTw,
      pt: postsPt,
      es: postsEs,
      de: postsDe,
      fr: postsFr,
      vi: postsVi,
      ru: postsRu,
      ar: postsAr,
      fil: postsFil,
      hi: postsHi,
      tr: postsTr,
      id: postsId,
      ms: postsMs
    } as any;

    const posts = postsByLocale[locale];
    if (!posts) {
      notFound();
    }
    const post = posts.find((p: any) => p.slug === slug);
    if (!post) {
      notFound();
    }
    return post;
  };

  const post = getPostByLocaleAndSlug(locale, slug);
  if (!post) {
    notFound();
  }

  return (
    <>
      <HeadInfo
        title={post.title}
        description={post.description}
        locale={locale}
        page={`/${slug}`}
      />
      <div className='px-4 py-2 mx-auto md:max-w-full lg:max-w-screen-xl md:px-12 lg:px-8'>
        <div className='flex mt-5 justify-between'>
          <div className='flex'>
            <a title={`https://pngpdf.net${locale == 'ja' ? '' : `/${locale}`}`} className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400" aria-label="Back to Home " href={`https://pngpdf.net${locale == 'ja' ? '' : `/${locale}`}`}>← {blogLanguageText.back_str}</a>
          </div>
          <div className='flex'>
            <ChangeLangs locale={locale} page={`/${slug}`} />
          </div>
        </div>
        <Post locale={locale} slug={slug} langText={blogLanguageText} IndexLanguageText={IndexLanguageText} post={post}/>
      </div>
      <Footer page={`/${slug}`} langText={footerLanguageText} />
    </>
  );
};


export default PageComponent;

