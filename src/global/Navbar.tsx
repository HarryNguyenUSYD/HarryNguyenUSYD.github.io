"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const [isShowing, setIsShowing] = useState(false);

    return (
        <div className="sticky top-0 left-0 w-full h-20 bg-black text-white">
            <Link className="w-auto h-full" href="/">
                <Image
                    src="/images/Icon/Website Favicon.png"
                    alt="Website Favicon"
                    width={120}
                    height={120}
                    className="w-auto h-full p-4"
                />
            </Link>
        </div>
    );
}