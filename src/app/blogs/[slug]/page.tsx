import PageWrapper from "@/global/component/PageTemplate";
import Test from "./../test.mdx";

export default function BlogPage() {
    return (
        <PageWrapper>
            <BlogPageWrapper>
                <Test />
            </BlogPageWrapper>
        </PageWrapper>
    )
}

function BlogPageWrapper({
    children
}: {
    children: React.ReactElement
}) {
    return (
        <div className="w-full h-full p-10 mt-10">
            {children}
        </div>
    )
}
