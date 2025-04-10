"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Container = {
    children: React.ReactElement,
    className?: string
};

export default function Home() {
    return (
        <div className="w-screen h-screen overflow-x-hidden text-white">
            <main>
                <Background />
                <IntroductionSection />
            </main>
        </div>
    );
}

function Background() {
    return (
        <Image
            src="/images/Starlight-Neon-210.png"
            alt="Website background"
            width={2880}
            height={1000}
            className="w-full h-full -z-50 fixed top-0 left-0 brightness-50"
        />
    );
}

function IntroductionSection() {
    return (
        <div className="w-full h-screen">
            <div className="w-[80%] h-full ml-[10%] flex flex-col justify-center items-start gap-14">
                <p className="text-5xl">Hello there! My name is</p>
                <p className="text-8xl font-bold">Hoang "Harry" Nguyen</p>
                <p className="text-6xl italic">Computer Science student at the University of Sydney</p>
                <div className="w-full h-auto flex flex-row justify-start items-start gap-8">
                    <DecoratedButton>
                        <p>Get Started</p>
                    </DecoratedButton>
                    <DecoratedButton>
                        <p>Get Started</p>
                    </DecoratedButton>
                    <DecoratedButton>
                        <p>Get Started</p>
                    </DecoratedButton>
                </div>
            </div>
        </div>
    );
}

function DecoratedButton({
    children,
    className = "",
    ...props
} : Container & React.HTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={`w-auto h-auto text-4xl font-bold cursor-pointer border-4 border-white
                px-5 py-3 hover:bg-white hover:text-black duration-200 ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}