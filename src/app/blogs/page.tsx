"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

const DesktopView = dynamic(() => import('./components/DesktopView'));
const MobileView = dynamic(() => import('./components/MobileView'));

export default function Blogs() {
    const [isDesktop, setIsDesktop] = useState(true)

    useEffect(() => {
        const update = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        update();

        window.addEventListener('resize', update);
        
        return () => window.removeEventListener('resize', update);
    }, [])
  
    return (isDesktop) ? (
        <Suspense>
            <DesktopView />
        </Suspense>
    ) : (
        <Suspense>
            <MobileView />
        </Suspense>
    )
}