import dynamic from "next/dynamic";
import { Metadata } from "next";

const DesktopView = dynamic(() => import('./components/DesktopView'));
const MobileView = dynamic(() => import('./components/MobileView'));

export const metadata: Metadata = {
    title: "Blogs | HarryNguyenUSYD",
    description: "Welcome to Harry's website, where you can find guides, devblogs, and everything there is to know about Harry (me).",
};

export default function Blogs() {
    return (
        <>
            {/* Desktop */}
            <div className="hidden lg:block">
                <DesktopView />
            </div>

            {/* Mobile / Tablet */}
            <div className="block lg:hidden">
                <MobileView />
            </div>
        </>
    )
}