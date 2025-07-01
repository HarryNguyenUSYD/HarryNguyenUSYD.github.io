"use client";

import dynamic from "next/dynamic";
import Head from "next/head";
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
  
    return (
        <>
            <Head>
                <title>About Us | MySite</title>
                <meta name="description" content="Learn more about us on this page." />
            </Head>
            <main>
                <Suspense>
                    {(isDesktop) ? <DesktopView /> : <MobileView />}
                </Suspense>
            </main>
        </>
    )
}