import React from 'react';
import { languages } from "@/config";

const Footer = ({ page, langText }:{page:any,langText:any}) => {
  return (
    <footer className="flex flex-col px-4 py-0 mx-auto md:max-w-full lg:max-w-screen-xl md:px-12 lg:px-8 lg:py-5">
      <div className='flex'>
        <ul className='flex flex-wrap text-gray-500 text-sm justify-between pb-3 pt-1'>
          {languages.map((item, index) => (
            <li key={index} className='mr-4 mt-2'>
              <a
                className='hover:underline hover:text-gray-700'
                title={item.language}
                href={item.lang === 'ja' ? `https://pngpdf.net${page}` : `https://pngpdf.net/${item.lang}${page}`}
              >
                {item.language}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 <a href="https://pngpdf.net" className="hover:underline" title='pngpdf.net™'>pngpdf.net™</a>. {langText.banquan_text} {langText.lianxiyouxiang}: <a title='yijunpengxin@gamil.com' href="mailto:yijunpengxin@gamil.com">yijunpengxin@gmail.com</a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;