import { serialize } from 'next-mdx-remote/serialize';
 
export async function mdxParse(data: Blob) {
    const markdown = await data.text();
    const mdxSource = await serialize(markdown, { parseFrontmatter: true });
    return mdxSource;
}