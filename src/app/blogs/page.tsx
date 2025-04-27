"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

import PageWrapper from "@/global/component/PageTemplate";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { BsEye, BsShare } from "react-icons/bs";
import { stringToTagButton } from "@/global/component/TagButton";
import { fetchBlogs } from "@/global/supabase/supabaseClient";
import { Blog } from "@/global/supabase/tables";
import { useBlogData } from "@/global/zustand/zustandSetup";

export default function MyBlogs() {
    const [items, setItems] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await fetchBlogs();
        
            if (error) {
                console.error('Error fetching data:', error);
            } else {
                setItems(data || []);
            }

            setLoading(false);
        }
    
        fetchData();
    }, []);

    return (
        <PageWrapper>
            {loading ? <LoadingScreen /> : <BlogsContainer blogs={items} />}
        </PageWrapper>
    );
}

function BlogsContainer({
    blogs
} : {
    blogs: Blog[]
}) {
    return (
        <div className="w-full h-auto p-[5%]">
            <PostDisplay blogs={blogs} />
        </div>
    );
}

function PostDisplay({
    blogs
} : {
    blogs: Blog[]
}) {
    return (
        <div className="relative w-full h-auto flex flex-col justify-start items-center gap-10">
            <div className="w-full h-auto flex flex-row justify-between items-end">
                <div className="w-full flex flex-row justify-start items-end gap-4">
                    <p className="text-7xl font-bold whitespace-nowrap">My Blogs</p>
                    <p className="text-3xl font-thin italic whitespace-nowrap">- Guides, Devlogs and other things that happened</p>
                </div>
                <div className="w-auto h-full flex flex-row justify-end items-center gap-2 text-2xl">
                    <label htmlFor="sort-by" className="whitespace-nowrap">Sort by:</label>
                    <select name="sort-by" id="sort-by" className="bg-black border rounded-sm px-2 py-1 whitespace-nowrap">
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="most-viewed">Most Viewed</option>
                        <option value="most-liked">Most Liked</option>
                    </select>
                </div>
            </div>
            <div className="w-full h-auto flex flex-col justify-start items-center gap-10">
                {blogs.map((blog) => (<Post key={blog.id} blog={blog} />))}
            </div>
        </div>
    );
}

function Post({
    blog
}: {
    blog: Blog
}) {
    const setBlogData = useBlogData((state) => state.setBlog);
    const router = useRouter();

    const handleOnClick = () => {
        setBlogData(blog);
        router.push("/blogs/" + blog.url);
    }

    return (
        <div className="w-full h-[35vh] rounded-xl flex flex-col justify-center items-center gap-10">
            <div className="w-full h-full flex flex-row justify-center items-start overflow-hidden">
                <button onClick={handleOnClick} className="w-[30vw] h-full overflow-hidden">
                    <Image src="/images/Icon/Website Favicon.png" width={120} height={120} alt="Post's image" className="w-full h-full hover:scale-110 duration-150" />
                </button>
                <div className="w-full h-full p-5 flex flex-col justify-start items-start">
                    <button onClick={handleOnClick} className="w-full h-full cursor-pointer group">
                        <div className="w-full h-auto flex flex-row justify-between items-start">
                            <p className="text-5xl font-bold whitespace-nowrap group-hover:text-blue-highlighted duration-150">{blog.title}</p>
                            <p className="text-2xl font-thin italic">{new Date(blog.date).toLocaleDateString()}</p>
                        </div>
                        <p className="text-2xl w-full h-full pt-2 text-left group-hover:text-blue-highlighted duration-150">
                            {blog.desc}
                        </p>
                    </button>
                    <div className="w-full h-auto flex flex-row justify-between items-center">
                        <div className="flex flex-row justify-start items-center gap-3 text-xl">
                            <p className="text-2xl mr-3">Tags:</p>
                            {blog.tags.map((tag) => (stringToTagButton(tag, blog.id + tag)))}
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
                    </div>
                </div>
            </div>
            <div className="w-full h-0 border-t border-white opacity-50"></div>
        </div>
    );
}

function LoadingScreen() {
    return (
        <div className="w-full h-auto m-10 flex justify-center items-center text-3xl italic">
            <p>Loading posts, this might take a few seconds...</p>
        </div>
    );
}