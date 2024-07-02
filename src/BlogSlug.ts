// 定义一个数组，博客的Slug 主要放在首页渲染，以后新增后增加一个这个 
interface BlogSlug {
    slug: string;
    keyword: string;
    datetime: string;
}
const blogSlugs: BlogSlug[] = [
    {slug:"pngtopdf",keyword:"pngtopdf",datetime:"2024-06-29"},
    {slug:'png-to-pdf',keyword:"png to pdf",datetime:"2024-07-02"},
    {slug:'png-into-pdf',keyword:"png into pdf",datetime:"2024-07-03"}
];
  
export default blogSlugs;