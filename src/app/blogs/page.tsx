import Background from "@/global/component/Background";
import Navbar from "@/global/component/Navbar";
import PostDisplay from "@/global/component/PostDisplay";

export default function MyBlogs() {
    return (
        <div className="w-full h-auto overflow-x-hidden text-white">
            <Navbar />
            <Background />
            <BlogsContainer />
        </div>
    );
}

function BlogsContainer() {
    return (
        <div className="w-full h-auto p-[5%]">
            <PostDisplay />
        </div>
    );
}