"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

const DesktopView = dynamic(() => import('./components/DesktopView'));
const MobileView = dynamic(() => import('./components/MobileView'));

import TestMdx from "@/global/wip-mdx/wordle-and-friends.mdx";

export default function MdxTest() {
    const [isDesktop, setIsDesktop] = useState(true);
    const mdxData = {
        id: 0,
        title: "Wordle and the Rise of the Timeslike Genre",
        desc: "",
        date: "28/12/2025",
        src: "",
        url: "",
        tags: ["Sidequest"],
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