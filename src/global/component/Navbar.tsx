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
            <Link className="w-50 h-full flex justify-center items-center text-3xl hover:bg-white hover:text-black duration-200" href={href}>
                {name}
            </Link>
        );
    }

    return (
        <div
            className={`fixed top-0 left-0 w-full h-20 bg-black text-white border-b-1 border-white
                flex flex-row justify-start items-center z-50 ${isShowing ? "-translate-y-20" : "translate-y-0"} duration-100`}
        >
            <a className="w-32 h-full flex justify-center items-center group" href="/">
                <Image
                    src="/images/Icon/Website Favicon.png"
                    alt="Website Favicon"
                    width={120}
                    height={120}
                    className="w-auto h-full p-4 group-hover:animate-spin"
                />
            </a>
            <div className="w-full h-full mr-5 flex flex-row justify-end items-center">
                <DecoratedLink name="Home" href="/" />
                <DecoratedLink name="Blogs" href="/blogs" />
                <DecoratedLink name="Projects" href="/projects" />
                <DecoratedLink name="Contact Me" href="/#contact-me" />
            </div>
        </div>
    );
}