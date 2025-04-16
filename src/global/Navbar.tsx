"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const [isShowing, setIsShowing] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                setIsShowing(true);
            } else {
                setIsShowing(false);
            }

            setLastScrollY(currentScrollY);
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    })

    return (
        <div
            className={`fixed top-0 left-0 w-full h-20 bg-black text-white border-b-1 border-white
                flex flex-row justify-start items-center z-50 ${isShowing ? "-translate-y-20" : "translate-y-0"} duration-100`}
        >
            <a className="w-32 h-full flex justify-center items-center" href="/">
                <Image
                    src="/images/Icon/Website Favicon.png"
                    alt="Website Favicon"
                    width={120}
                    height={120}
                    className="w-auto h-full p-4"
                />
            </a>
            <div className="h-[50%] border border-white"></div>
            <div className="w-full h-full flex flex-row justify-center items-center">
                <Link href="/">
                </Link>
            </div>
        </div>
    );
}