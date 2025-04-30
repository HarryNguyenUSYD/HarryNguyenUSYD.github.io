"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DesktopView = dynamic(() => import('./components/DesktopView'));
const MobileView = dynamic(() => import('./components/MobileView'));

export default function BlogPage({ params } : { params: Promise<{slug: string}>}) {
    const [isDesktop, setIsDesktop] = useState(true)

    useEffect(() => {
        const update = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        update();

        window.addEventListener('resize', update);
        
        return () => window.removeEventListener('resize', update);
    }, [])
  
    return (isDesktop) ? <DesktopView params={params} /> : <MobileView params={params} />
}