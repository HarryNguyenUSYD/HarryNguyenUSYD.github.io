"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

const DesktopView = dynamic(() => import('./components/DesktopView'));
const MobileView = dynamic(() => import('./components/MobileView'));

import TestMdx from "@/global/wip-mdx/dotnet-guide-1.mdx";

export default function MdxTest() {
    const [isDesktop, setIsDesktop] = useState(true);
    const mdxData = {
        id: 0,
        title: "Introduction to .NET - #2 - Getting Started",
        desc: "",
        date: "01/01/2000",
        src: "",
        url: "",
        tags: ["Guide"],
        like_count: 0,
        view_count: 0,
        share_count: 0,
        avatar: ""
    }

    useEffect(() => {
        const update = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        update();

        window.addEventListener('resize', update);
        
        return () => window.removeEventListener('resize', update);
    }, [])
  
    return (
        <Suspense>
            {(isDesktop) ? <DesktopView TestMdx={TestMdx} mdxData={mdxData} /> : <MobileView TestMdx={TestMdx} mdxData={mdxData} />}
        </Suspense>
    )
}