import React from 'react';
import Markdown from 'markdown-to-jsx';
import MdxAlert from '@/components/markdown/MdxAlert';
import MdxBlockquote from '@/components/markdown/MdxBlockquote';
import Toc from './Toc';
import dayjs from 'dayjs';
import Code from './markdown/Code';
import 'dayjs/locale/en'; // 英文
import 'dayjs/locale/zh'; // 中文
import 'dayjs/locale/ko'; // 韩文
import 'dayjs/locale/zh-tw';//台湾
import 'dayjs/locale/ja'; // 日文
import 'dayjs/locale/pt'; // 葡萄牙语
import 'dayjs/locale/es'; // 西班牙语
import 'dayjs/locale/de'; // 德语
import 'dayjs/locale/fr'; // 法语
import 'dayjs/locale/vi'; // 越南语
import 'dayjs/locale/ru'; // 俄语
import 'dayjs/locale/ar';


const markdownOptions = {
    //添加一些自定义的组件
    overrides: {
        MdxAlert: { component: MdxAlert },
        MdxBlockquote: { component: MdxBlockquote },
        // Code: {component: Code}
    },
    slugify: (str:any) => {
        return str;
    }
};


const Post = ({ locale, slug, langText, post }: { locale: string, slug: string, langText?:any, post:any }) => {

    if(locale == 'tw'){
        dayjs.locale('zh-tw');
    }else{
        dayjs.locale(locale);
    }
    const postAddTime = dayjs(post.date).format('MMMM D, YYYY');

    return (
        <div className='pr-4 mx-auto max-w-7xl mt-5 sm:pr-6 lg:pr-8'>
            <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-8/12 md:order-first'>
                    <h1 className="text-4xl font-bold pb-4">
                        {post.title}
                    </h1>
                    {/* <time className="block italic text-gray-500">发布于:{postAddTime}</time> */}
                    <div className='markdown '> 
                        <Markdown options={markdownOptions}>{post.content}</Markdown>
                    </div>
                </div>
                <div className='w-full md:w-4/12 sticky top-22'>
                    <Toc  langText={langText}/>
                </div>
            </div>
        </div>

    );
};

export default Post;
