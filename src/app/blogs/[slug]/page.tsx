"use client";

import { useEffect, useState } from "react";

import { fetchBlogMdx as fetchBlogBlob, fetchBlogFromUrl } from "@/global/supabase/supabaseClient";

import PageWrapper from "@/global/component/PageTemplate";
import { stringToTagButton } from "@/global/component/TagButton";
import { FaRegHeart } from "react-icons/fa";
import { BsEye, BsShare } from "react-icons/bs";
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Blog } from "@/global/supabase/tables";
import { mdxParse } from "@/global/mdx/mdxParse";

import ErrorPage from  "@/global/premade-mdx/404.mdx";
import { useMDXComponents } from "@/global/mdx/mdxComponents";
import { use } from "react";

export default function BlogPage({ params } : { params: Promise<{slug: string}>}) {
    const { slug: blogUrl } = use(params);

    const [blog, setBlog] = useState<Blog | null>(null);
    const [blogMdx, setBlogMdx] = useState<MDXRemoteSerializeResult | null>(null);
    const [loading, setLoading] = useState(true)

    const components = useMDXComponents();

    useEffect(() => {
        async function fetchData() {
            const { data: blogData, error: blogDataError } = await fetchBlogFromUrl(blogUrl);

            if (blogDataError) {
                console.error('Error fetching blog data:', blogDataError);
            } else {
                setBlog(blogData[0]);
            }

            const { data: blogBlob, error: blogBlobError } = await fetchBlogBlob(blog?.src || "404.mdx");
        
            if (blogBlobError) {
                console.error('Error fetching blog blob:', blogBlobError);
            } else {
                const parsed = await mdxParse(blogBlob);
                setBlogMdx(parsed);
            }

            setLoading(false);
        }
    
        fetchData();
    }, [blog?.src, blogUrl]);

    return (
        <PageWrapper>
            <div className="w-full h-full p-10 mt-10">
                {
                (loading) ? <LoadingScreen /> : 
                (blogUrl === null || blog === null || blogMdx === null) ? <ErrorPage /> :
                (
                    <>
                        <BlogHeader blog={blog} />
                        <div className="w-full h-auto p-10 mt-5 bg-[#000000af] rounded-3xl">
                            {(loading || blogMdx === null) ? <LoadingScreen /> : <MDXRemote {...blogMdx} components={components} />}
                        </div>
                    </>
                )
                }
            </div>
        </PageWrapper>
    )
}

function BlogHeader({
    blog
} : {
    blog: Blog
}) {
    return (
        <div className="w-full h-auto flex flex-col justify-center items-center gap-3">
            <p className="text-7xl font-bold my-2">{blog.title}</p>
            <p className="text-xl font-thin italic">Uploaded on: {new Date(blog.date).toLocaleDateString()}</p>
            <div className="text-xl flex flex-row justify-center items-center gap-2">
                <span>Tags: </span>
                {blog.tags.map((tag) => stringToTagButton(tag, tag))}
            </div>
            <div className="w-auto h-auto self-end flex flex-row justify-end items-center gap-5">
                <div className="flex flex-row justify-center items-center gap-2">
                    <BsEye className="text-2xl font-thin opacity-50" />
                    <p className="text-2xl font-thin opacity-50">{blog.like_count}</p>
                </div>
                <button className="flex flex-row justify-center items-center gap-2 cursor-pointer">
                    <FaRegHeart className="text-2xl" />
                    <p className="text-2xl">{blog.like_count}</p>
                </button>
                <button className="flex flex-row justify-center items-center gap-2 cursor-pointer">
                    <BsShare className="text-2xl" />
                    <p className="text-2xl">{blog.share_count}</p>
                </button>
            </div>
            <div className="w-full border border-white opacity-50 my-5"></div>
        </div>
    )
}

function LoadingScreen() {
    return (
        <div className="w-full h-auto m-10 flex justify-center items-center text-3xl italic">
            <p>Loading the blog, this might take a few seconds...</p>
        </div>
    );
}