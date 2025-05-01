"use client";

import { useEffect, useState, use } from "react";

import { fetchBlogItem as fetchBlogBlob, fetchBlogFromUrl, incrementBlogLike, incrementBlogShare, incrementBlogView } from "@/global/supabase/supabaseClient";
import { mdxParse } from "@/global/mdx/mdxParse";

import { stringToTagButton } from "@/global/component/TagButton";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { BsEye, BsShare } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";

import PageWrapper from "@/global/component/page-wrapper/DesktopPageWrapper";
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Blog } from "@/global/supabase/tables";
import ErrorPage from "@/global/component/error-page/DesktopErrorPage";

import { useMDXComponents } from "@/global/mdx/mdxComponents";
import Link from "next/link";
import { CopiableTextContextProvider, CopiedTextNotification, useCopiableTextContext } from "@/global/component/CopiableText";

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
                return;
            } else {
                setBlog(blogData[0]);
            }

            const { data: blogBlob, error: blogBlobError } = await fetchBlogBlob(blogUrl, blogData[0].src);
        
            if (blogBlob === null || blogBlobError) {
                console.error('Error fetching blog blob:', blogBlobError);
                return;
            } else {
                const parsed = await mdxParse(blogBlob);
                setBlogMdx(parsed);
            }

            setLoading(false);

            incrementBlogView(blogData[0]?.id);
        }
    
        fetchData();
    }, [blogUrl]);

    return (
        <CopiableTextContextProvider>
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
                <CopiedTextNotification /> 
            </PageWrapper>
        </CopiableTextContextProvider>
    )
}

function BlogHeader({
    blog
} : {
    blog: Blog
}) {
    const [isLiked, setIsLiked] = useState(false);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

    const [isShared, setIsShared] = useState(false);
    
    // The like is only counted 3 seconds after the user presses like
    const handleLikeClick = () => {
        if (!isLiked) {
            setIsLiked(true);

            const timeout = setTimeout(async () => {
                incrementBlogLike(blog.id);
            }, 3000);

            setTimerId(timeout);
        } else { // If the user cancels the like, remove the timeout
            setIsLiked(false);

            if (timerId) {
                clearTimeout(timerId);
                setTimerId(null);
            }
        }
    };

    // The share is counted immediately, but only once
    const { setValue } = useCopiableTextContext();

    const handleCopyTextToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setValue(true);
            setTimeout(() => setValue(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    }

    const handleShareClick = () => {
        if (!isShared) {
            setIsShared(true);
            incrementBlogShare(blog.id);
            handleCopyTextToClipboard(window.location.href);
        }
    };

    return (
        <div className="w-full h-auto flex flex-col justify-center items-center gap-3">
            <div className="w-full flex flex-row justify-start items-center">
                <Link href="/blogs" className="flex flex-row justify-start items-center gap-3 hover:text-blue-highlighted duration-100">
                    <FaArrowLeft className="text-xl" />
                    <p className="text-3xl">Back</p>
                </Link>
            </div>
            <p className="text-7xl font-bold my-2">{blog.title}</p>
            <p className="text-xl font-thin italic">Uploaded on: {new Date(blog.date).toLocaleDateString()}</p>
            <div className="text-xl flex flex-row justify-center items-center gap-2">
                <span>Tags: </span>
                {blog.tags.map((tag) => stringToTagButton(tag, tag))}
            </div>
            <div className="w-auto h-auto self-end flex flex-row justify-end items-center gap-5 text-2xl">
                <div className="flex flex-row justify-center items-center gap-2">
                    <BsEye className="font-thin opacity-50" />
                    <p className="font-thin opacity-50">{blog.view_count}</p>
                </div>
                <button
                    className="flex flex-row justify-center items-center gap-2 cursor-pointer"
                    onClick={handleLikeClick}
                >
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                    <p>{isLiked ? blog.like_count + 1 : blog.like_count}</p>
                </button>
                <button
                    className="flex flex-row justify-center items-center gap-2 cursor-pointer"
                    onClick={handleShareClick}
                >
                    <BsShare />
                    <p>{isShared ? blog.share_count + 1 : blog.share_count}</p>
                </button>
            </div>
            <div className="w-full border border-white opacity-50 my-5"></div>
        </div>
    )
}

function LoadingScreen() {
    return (
        <div className="w-full h-auto my-10 flex justify-center items-center text-3xl italic">
            <p>Loading the blog, this might take a few seconds...</p>
        </div>
    );
}