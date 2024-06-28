// 定义一个数组，博客的Slug 主要放在首页渲染，以后新增后增加一个这个 
interface BlogSlug {
    slug: string;
    keyword: string;
}
const blogSlugs: BlogSlug[] = [
    {slug:'png-to-pdf',keyword:"png to pdf"},
    {slug:"pngtopdf",keyword:"pngtopdf"}
];
  
export default blogSlugs;