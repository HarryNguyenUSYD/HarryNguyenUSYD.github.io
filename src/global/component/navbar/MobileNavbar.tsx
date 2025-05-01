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

    const DecoratedLink = ({ name, href } : { name: string, href: string }) => {
        return (
            <Link className="w-20 h-full flex justify-center items-center text-sm" href={href}>
                {name}
            </Link>
        );
    }

    return (
        <div
            className={`fixed top-0 left-0 w-full h-12 bg-black text-white border-b-1 border-white
                flex flex-row justify-start items-center z-50 ${isShowing ? "-translate-y-12" : "translate-y-0"} duration-100`}
        >
            <Link className="w-auto h-full flex justify-center items-center p-2 flex-none" href="/">
                <Image
                    src="/images/Icon/Website Favicon.png"
                    alt="Website Favicon"
                    width={120}
                    height={120}
                    className="w-auto h-full aspect-square"
                />
            </Link>
            <div className="w-full h-full flex flex-row justify-end items-center">
                <DecoratedLink name="Home" href="/" />
                <DecoratedLink name="Blogs" href="/blogs" />
                <DecoratedLink name="Projects" href="/projects" />
            </div>
        </div>
    );
}