import { stringToTagButton } from "@/global/component/TagButton";
import { FaHeart } from "react-icons/fa";
import { BsEye, BsShare } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";

import PageWrapper from "@/global/component/page-wrapper/DesktopPageWrapper";
import { Blog } from "@/global/supabase/tables";

import Link from "next/link";
import { CopiableTextContextProvider, CopiedTextNotification } from "@/global/component/CopiableText";
import { JSX } from "react";
import { MDXProps } from "mdx/types";

export default function MdxTest({
    TestMdx,
    mdxData
} : {
    TestMdx: (props: MDXProps) => JSX.Element,
    mdxData: Blog
}) {
    return (
        <CopiableTextContextProvider>
            <PageWrapper>
                <div className="w-full h-full p-10 mt-10">
                    <BlogHeader blog={mdxData} />
                    <div className="w-[50vw] h-auto p-10 mt-5 bg-[#000000af] rounded-3xl">
                        <TestMdx />
                    </div>
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
    return (
        <div className="w-full h-auto flex flex-col justify-center items-center gap-3">
            <div className="w-full flex flex-row justify-start items-center">
                <Link href="/blogs" className="flex flex-row justify-start items-center gap-3 hover:text-blue-highlighted duration-100">
                    <FaArrowLeft className="text-xl" />
                    <p className="text-3xl">Back</p>
                </Link>
            </div>
            <p className="text-7xl font-bold my-2 text-center">{blog.title}</p>
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
                >
                    <FaHeart />
                    <p>0</p>
                </button>
                <button
                    className="flex flex-row justify-center items-center gap-2 cursor-pointer"
                >
                    <BsShare />
                    <p>0</p>
                </button>
            </div>
            <div className="w-full border border-white opacity-50 my-5"></div>
        </div>
    )
}