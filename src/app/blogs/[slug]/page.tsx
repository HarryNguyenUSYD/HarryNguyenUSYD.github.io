import PageWrapper from "@/global/component/PageTemplate";
import Post, { metadata } from "./../hello-world.mdx";
import { stringToTagButton } from "@/global/component/TagButton";
import { FaRegHeart } from "react-icons/fa";
import { BsEye, BsShare } from "react-icons/bs";

export default function BlogPage() {
    return (
        <PageWrapper>
            <BlogPageWrapper>
                <Post />
            </BlogPageWrapper>
        </PageWrapper>
    )
}

function BlogPageWrapper({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="w-full h-full p-10 mt-10">
            <BlogHeader />
            <div className="w-full h-auto p-10 mt-5 bg-[#000000af] rounded-3xl">
                {children}
            </div>
        </div>
    )
}

function BlogHeader() {
    return (
        <div className="w-full h-auto flex flex-col justify-center items-center gap-3">
            <p className="text-7xl font-bold my-2">{metadata.title}</p>
            <p className="text-xl font-thin italic">Uploaded on: {metadata.date}</p>
            <div className="text-xl flex flex-row justify-center items-center gap-2">
                <span>Tags: </span>
                {metadata.tags.map((tag) => stringToTagButton(tag, tag))}
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