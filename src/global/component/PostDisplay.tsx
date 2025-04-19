"use client";

import Image from "next/image";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { BsShare } from "react-icons/bs";
import { PostTag, PostTags } from "../const/enums";

export default function PostDisplay() {
    return (
        <div className="relative w-full h-auto flex flex-col justify-start items-center gap-10">
            <div className="w-full h-auto flex flex-row justify-between items-end">
                <div className="w-full flex flex-row justify-start items-end gap-4">
                    <p className="text-7xl font-bold whitespace-nowrap">My Blogs</p>
                    <p className="text-3xl font-thin italic whitespace-nowrap">- Guides, Dev Blogs and other things that happened</p>
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
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    );
}

function Post() {
    const [liked, setLiked] = useState(false);
    const [shared, setShared] = useState(false);

    const Tag = ({ tag } : { tag: PostTag }) => {
        return (
            <button className={`py-1 px-5 ${tag.bgColor} cursor-pointer`}>
                <p>{tag.name}</p>
            </button>
        )
    }

    return (
        <div className="w-full h-[35vh] rounded-xl flex flex-col justify-center items-center gap-10 group cursor-pointer">
            <div className="w-full h-full flex flex-row justify-center items-start overflow-hidden">
                <div className="w-[30vw] h-full overflow-hidden">
                    <Image src="/images/Icon/Website Favicon.png" width={120} height={120} alt="Post's image" className="w-full h-full group-hover:scale-110 duration-150" />
                </div>
                <div className="w-full h-full p-5 flex flex-col items-start">
                    <div className="w-full h-auto flex flex-row justify-between items-start">
                        <p className="text-5xl font-bold whitespace-nowrap group-hover:text-highlighted duration-150">Hello</p>
                        <p className="text-2xl font-thin italic">01/01/01</p>
                    </div>
                    <p className="text-2xl w-full h-full pt-2 group-hover:text-highlighted duration-150">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab officia et quaerat sequi alias? Quos voluptatum nesciunt non et, voluptates, iste voluptatem ratione qui rem debitis, earum tempora. Accusamus, similique.
                    </p>
                    <div className="w-full h-auto flex flex-row justify-between items-center">
                        <div className="flex flex-row justify-start items-center gap-3 text-xl">
                            <p className="text-2xl mr-3">Tags:</p>
                            <Tag tag={PostTags.Admin} />
                            <Tag tag={PostTags.DevBlog} />
                            <Tag tag={PostTags.Guide} />
                        </div>
                        <div className="w-auto h-auto self-end flex flex-row justify-end items-center gap-5">
                            <button className="flex flex-row justify-center items-center gap-2 cursor-pointer">
                                <FaRegHeart className="text-2xl" />
                                <p className="text-2xl">Like</p>
                            </button>
                            <button className="flex flex-row justify-center items-center gap-2 cursor-pointer">
                                <BsShare className="text-2xl" />
                                <p className="text-2xl">Share</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-0 border-t border-white opacity-50"></div>
        </div>
    );
}