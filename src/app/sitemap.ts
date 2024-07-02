import { MetadataRoute } from 'next';
import { locales } from '@/config';
import blogSlugs from '@/BlogSlug';

const domain = 'https://pngpdf.net';

export default function sitemap(): MetadataRoute.Sitemap {
    const paths = blogSlugs.flatMap(blog =>
        locales
            .filter(lang => lang !== 'ja')
            .map(lang => ({
                url: `${domain}/${lang}/${blog.slug}`,
                lastModified: new Date(blog.datetime).toISOString(),
                changeFrequency: 'weekly',
                priority: 0.7,
            }))
    );

    // 添加首页路径，忽略 'ja'
    const homePaths = locales
        .filter(lang => lang !== 'ja')
        .map(lang => ({
            url: `${domain}/${lang}`,
            lastModified: new Date('2024-06-19').toISOString(),
            changeFrequency: 'weekly',
            priority: 1.0,
        }));

    const rootPath = [{
        url: domain,
        lastModified: new Date('2024-06-19').toISOString(),
        changeFrequency: 'weekly',
        priority: 1.0,
    }];

    // 合并所有路径
    const allPaths = [
        ...rootPath,
        ...homePaths,
        ...paths
       
    ];

    return allPaths as MetadataRoute.Sitemap;
}