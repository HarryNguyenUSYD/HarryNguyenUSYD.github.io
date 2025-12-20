import dynamic from "next/dynamic";
import { Metadata } from "next";

const DesktopView = dynamic(() => import('./components/DesktopView'));
const MobileView = dynamic(() => import('./components/MobileView'));

export const metadata: Metadata = {
    title: "Blog | HarryNguyenUSYD",
    description: "Welcome to Harry's website, where you can find guides, devblogs, and everything there is to know about Harry (me).",
};

export default function BlogPage({ params } : { params: Promise<{slug: string}>}) {
    return (
        <>
            {/* Desktop */}
            <div className="hidden lg:block">
                <DesktopView params={params} />
            </div>

            {/* Mobile / Tablet */}
            <div className="block lg:hidden">
                <MobileView params={params} />
            </div>
        </>
    )
}