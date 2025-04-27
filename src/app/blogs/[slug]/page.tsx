"use client";

import { useEffect, useState } from "react";

import { fetchBlogMdx } from "@/global/supabase/supabaseClient";
import { useBlogData } from "@/global/zustand/zustandSetup";

import PageWrapper from "@/global/component/PageTemplate";
import { stringToTagButton } from "@/global/component/TagButton";
import { FaRegHeart } from "react-icons/fa";
import { BsEye, BsShare } from "react-icons/bs";
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Blog } from "@/global/supabase/tables";
import { mdxParse } from "@/global/mdx/mdxParse";

export default function BlogPage() {
    const blog = useBlogData((state) => state.blog);

    const [blogMdx, setBlogMdx] = useState<MDXRemoteSerializeResult | null>(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await fetchBlogMdx(blog?.src || "404.mdx");
        
            if (error) {
                console.error('Error fetching data:', error);
            } else {
                const parsed = await mdxParse(data);
                setBlogMdx(parsed);
            }

            setLoading(false);
        }
    
        fetchData();
    }, [blog?.src]);

    return (
        <PageWrapper>
            <BlogPageWrapper blog={blog}>
                {(loading || blogMdx === null) ? <LoadingScreen /> : <MDXRemote {...blogMdx} />}
            </BlogPageWrapper>
        </PageWrapper>
    )
}

function BlogPageWrapper({
    children,
    blog
}: {
    children: React.ReactNode,
    blog: Blog
}) {
    return (
        <div className="w-full h-full p-10 mt-10">
            <BlogHeader blog={blog} />
            <div className="w-full h-auto p-10 mt-5 bg-[#000000af] rounded-3xl">
                {children}
            </div>
        </div>
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
            <p className="text-xl font-thin italic">Uploaded on: {blog.date}</p>
            <div className="text-xl flex flex-row justify-center items-center gap-2">
                <span>Tags: </span>
                {blog.tags.map((tag) => stringToTagButton(tag, tag))}
            </div>
            <div className="w-auto h-auto self-end flex flex-row justify-end items-center gap-5">
                <div className="flex flex-row justify-center items-center gap-2">
                    <BsEye className="text-2xl font-thin opacity-50" />
                    <p className="text-2xl font-thin opacity-50">1000</p>
                </div>
                <button className="flex flex-row justify-center items-center gap-2 cursor-pointer">
                    <FaRegHeart className="text-2xl" />
                    <p className="text-2xl">1000</p>
                </button>
                <button className="flex flex-row justify-center items-center gap-2 cursor-pointer">
                    <BsShare className="text-2xl" />
                    <p className="text-2xl">1000</p>
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