import PageWrapper from "@/global/component/PageTemplate";
import PostDisplay from "@/global/component/PostDisplay";

export default function MyBlogs() {
    return (
        <PageWrapper>
            <BlogsContainer />
        </PageWrapper>
    );
}

function BlogsContainer() {
    return (
        <div className="w-full h-auto p-[5%]">
            <PostDisplay />
        </div>
    );
}