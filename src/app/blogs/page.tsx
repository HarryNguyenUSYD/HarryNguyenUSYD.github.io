"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'

import { fetchBlogs, fetchBlogsCount } from "@/global/supabase/supabaseClient";

import PageWrapper from "@/global/component/PageTemplate";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { BsEye, BsShare } from "react-icons/bs";
import { MdOutlineSearch } from "react-icons/md";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { stringToTagButton } from "@/global/component/TagButton";
import { Blog } from "@/global/supabase/tables";
import Link from "next/link";

export default function MyBlogs() {
    const [items, setItems] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page'));
    const searchTitle = searchParams.get('title') ?? "";
    const searchTag = searchParams.get('tag') ?? "";
    const searchOrder = searchParams.get('order') ?? "newest";

    useEffect(() => {
        async function fetchData() {
            const { data: pageItems, error: pageItemsError } = await fetchBlogs(page, searchTitle, searchTag, searchOrder);
        
            if (pageItemsError) {
                console.error('Error fetching page items:', pageItemsError);
            } else {
                setItems(pageItems || []);
            }

            setLoading(false);
        }
    
        fetchData();
    }, [page, searchOrder, searchTag, searchTitle]);

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
        <div className="w-full h-auto p-[5%] flex flex-col justify-start items-center gap-5">
            <Title />
            <SearchBar />
            <PageBar />
            <PostDisplay blogs={blogs} />
            <PageBar />
        </div>
    );
}

function Title() {
    return (
        <div className="w-full flex flex-row justify-start items-end gap-4">
            <p className="text-7xl font-bold whitespace-nowrap">My Blogs</p>
            <p className="text-3xl font-thin italic whitespace-nowrap">- Guides, Devlogs and other things that happened</p>
        </div>
    )
}

function SearchBar() {
    const searchParams = useSearchParams();
    const searchOrder = searchParams.get('order') ?? "newest";

    const handleOnSelect = (value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('order', value);
        window.location.href = `/blogs?${params.toString()}`;
    }

    const [isSearching, setIsSearching] = useState(false);

    const handleBeginSearch = () => {
        setIsSearching(true);
    }

    const handleExitSearch = () => {
        setIsSearching(false);
    }

    return (
        <div className="w-full h-auto flex flex-row justify-between items-end text-3xl">
            <SearchMenu enabled={isSearching} handleExitSearch={handleExitSearch} />
            <button onClick={handleBeginSearch} className="w-auto h-full flex flex-row justify-start items-center gap-2 rounded px-4 py-2 highlight-black-button">
                <p>Search</p>
                <MdOutlineSearch />
            </button>
            <div className="w-auto h-full flex flex-row justify-end items-center gap-2">
                <label htmlFor="sort-by" className="whitespace-nowrap">
                    Sort by:
                    <select
                        name="sort-by"
                        id="sort-by"
                        className="bg-black border border-white rounded-sm px-2 py-1 whitespace-nowrap text-2xl cursor-pointer"
                        value={searchOrder}
                        onChange={(e) => handleOnSelect(e.target.value)}
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="most-viewed">Most Viewed</option>
                        <option value="most-liked">Most Liked</option>
                    </select>
                </label>
            </div>
        </div>
    )
}

function SearchMenu({
    enabled,
    handleExitSearch
}: {
    enabled: boolean,
    handleExitSearch: () => void
}) {
    const searchParams = useSearchParams();
    const searchTitle = searchParams.get('title') ?? "";

    const [titleInput, setTitleInput] = useState(searchTitle);

    const handleOnTitleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const params = new URLSearchParams(searchParams)
        params.set('title', titleInput);
        window.location.href = `/blogs?${params.toString()}`;
    }

    return (
        <div 
            className={`fixed top-0 left-0 w-screen h-screen z-50 flex flex-col justify-center items-center
                bg-[#000000af] backdrop-blur-xl text-5xl ${enabled ? "" : "hidden"}`}
        >
            <div className="w-auto h-auto flex flex-col justify-center items-center gap-10">
                <div className="w-full h-auto flex flex-row justify-end items-end">
                    <button onClick={handleExitSearch} className="cursor-pointer"><ImCross className="text-4xl" /></button>
                </div>
                <form onSubmit={handleOnTitleSubmit} className="w-full h-auto flex flex-row justify-start items-center gap-5">
                    <label htmlFor="title" className="flex flex-row justify-start items-center gap-5">
                        Search by title:
                        <input
                            onChange={(e) => setTitleInput(e.target.value)}
                            id="title"
                            name="title"
                            type="text"
                            value={titleInput}
                            className="border-b border-white outline-none focus:ring-0" />
                    </label>
                    <input type="submit" value="Submit" className="highlight-black-button py-2 px-4" />
                </form>
                <div className="w-full h-auto flex flex-row justify-start items-center gap-5">
                    Search by tag:
                    {stringToTagButton("Admin", "search-admin")}
                    {stringToTagButton("Devlog", "search-devlog")}
                    {stringToTagButton("Guide", "search-guide")}
                    {stringToTagButton("Self Promotion", "search-selfpromotion")}
                </div>
            </div>
        </div>
    );
}

/**
 * Creates the bar for users to select which page to navigate to
 * @returns The PageBar element
 */
function PageBar() {
    const [pageCount, setPageCount] = useState(0);

    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page'));

    const handleChangePage = (toPage: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', toPage.toString());
        window.location.href = `/blogs?${params.toString()}`;
    }

    useEffect(() => {
        async function fetchData() {
            const { data: postCount, error: postCountError } = await fetchBlogsCount();
        
            if (postCountError) {
                console.error('Error fetching post count:', postCountError);
            } else {
                setPageCount(Math.floor(Number(postCount) / 10));
            }
        }
    
        fetchData();
    });

    return (
        <div className="w-full h-full flex flex-row justify-center items-center gap-1 text-3xl">
            <button onClick={() => handleChangePage(0)} className="p-3 hover:bg-white hover:text-black duration-100 cursor-pointer">
                <MdKeyboardDoubleArrowLeft />
            </button>
            <button onClick={() => handleChangePage(Math.max(page - 1, 0))} className="p-3 hover:bg-white hover:text-black duration-100 cursor-pointer">
                <MdKeyboardArrowLeft />
            </button>
            {(page - 2 > 0) && (<p className="p-3">...</p>)}
            {
                (page - 1 > 0) && (
                    <button onClick={() => handleChangePage(page - 2)} className="p-3 hover:bg-white hover:text-black duration-100 cursor-pointer">
                        {page - 1}
                    </button>
                )
            }
            {
                (page > 0) && (
                    <button onClick={() => handleChangePage(page - 1)} className="p-3 hover:bg-white hover:text-black duration-100 cursor-pointer">
                        {page}
                    </button>
                )
            }
            <button onClick={() => handleChangePage(page)} className="p-3 border-2 border-white hover:bg-white hover:text-black duration-100 cursor-pointer">
                {page + 1}
            </button>
            {
                (page < pageCount) && (
                    <button onClick={() => handleChangePage(page + 1)} className="p-3 hover:bg-white hover:text-black duration-100 cursor-pointer">
                        {page + 2}
                    </button>
                )
            }
            {
                (page + 1 < pageCount) && (
                    <button onClick={() => handleChangePage(page + 2)} className="p-3 hover:bg-white hover:text-black duration-100 cursor-pointer">
                        {page + 3}
                    </button>
                )
            }
            {(page + 2 < pageCount) && (<p className="p-3">...</p>)}
            <button onClick={() => handleChangePage(Math.min(page + 1, pageCount))} className="p-3 hover:bg-white hover:text-black duration-100 cursor-pointer">
                <MdKeyboardArrowRight />
            </button>
            <button onClick={() => handleChangePage(pageCount)} className="p-3 hover:bg-white hover:text-black duration-100 cursor-pointer">
                <MdKeyboardDoubleArrowRight />
            </button>
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
    return (
        <div className="w-full h-[35vh] rounded-xl flex flex-col justify-center items-center gap-10">
            <div className="w-full h-full flex flex-row justify-center items-start overflow-hidden">
                <Link href={"/blogs/" + blog.url} className="w-[30vw] h-full overflow-hidden">
                    <Image src="/images/Icon/Website Favicon.png" width={120} height={120} alt="Post's image" className="w-full h-full hover:scale-110 duration-150" />
                </Link>
                <div className="w-full h-full p-5 flex flex-col justify-start items-start">
                    <Link href={"/blogs/" + blog.url} className="w-full h-full cursor-pointer group">
                        <div className="w-full h-auto flex flex-row justify-between items-start">
                            <p className="text-5xl font-bold whitespace-nowrap group-hover:text-blue-highlighted duration-150">{blog.title}</p>
                            <p className="text-2xl font-thin italic">{new Date(blog.date).toLocaleDateString()}</p>
                        </div>
                        <p className="text-2xl w-full h-full pt-2 text-left group-hover:text-blue-highlighted duration-150">
                            {blog.desc}
                        </p>
                    </Link>
                    <div className="w-full h-auto flex flex-row justify-between items-center">
                        <div className="flex flex-row justify-start items-center gap-3 text-xl">
                            <p className="text-2xl mr-3">Tags:</p>
                            {blog.tags.map((tag) => (stringToTagButton(tag, blog.id + tag)))}
                        </div>
                        <div className="w-auto h-auto flex flex-row justify-end items-center gap-5">
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