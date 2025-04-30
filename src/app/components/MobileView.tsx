"use client";

import Link from "next/link";

import { SiLinkedin, SiGithub, SiPython, SiC, SiCplusplus, SiJavascript, SiTypescript, SiUnity, SiDotnet, SiFirebase, SiJira, SiMysql, SiPostgresql } from "react-icons/si";
import { FaReact, FaHtml5, FaJava, FaNodeJs } from "react-icons/fa";
import { IconType } from "react-icons";
import { CopiableTextContextProvider, CopiedTextNotification, useCopiableTextContext } from "@/global/component/CopiableText";
import PageWrapper from "@/global/component/page-template/MobilePageTemplate";

export default function Home() {
    return (
        <CopiableTextContextProvider>
            <PageWrapper>
                <main className="relative w-full h-auto">
                    <ConnectingLine />
                    <IntroductionSection />
                    <AboutMeSection />
                    <MySkillsSection />
                    <MyBlogsSection />
                    <MyProjectsSection />
                    <ContactMeSection />
                    <CopiedTextNotification />
                </main>
            </PageWrapper>
        </CopiableTextContextProvider>
    );
}

function ConnectingLine() {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-20">
            <div className={`w-0 h-[calc(100%-100vh)] border-8 border-dashed border-white`}></div>
        </div>
    );
}

function SectionWrapper({
    id,
    children,
    className = ""
}: {
    id: string,
    children: React.ReactNode,
    className?: string
}) {
    return (
        <div id={id} className={`w-full h-auto ${className} relative`}>
            <div className={`w-full h-full`}>
                {children}
            </div>
        </div>
    )
}

function IntroductionSection() {
    return (
        <SectionWrapper id="introduction">
            <div className="w-full h-screen">
                <div className="w-full h-full flex flex-col justify-center items-start gap-6">
                    <p className="text-3xl">Hello there! My name is</p>
                    <p className="text-4xl font-bold">Hoang "Harry" Nguyen</p>
                    <p className="text-2xl italic">Computer Science student at the University of Sydney</p>
                    <div className="w-full h-auto flex flex-col justify-center items-start gap-5">
                        <Link
                            href="#about-me"
                            className="w-auto h-auto text-2xl font-bold cursor-pointer border-2 border-white px-4 py-1"
                        >
                            <p>Get Started</p>
                        </Link>
                        <Link
                            href="/blogs"
                            className="w-auto h-auto text-2xl font-bold cursor-pointer border-2 border-white px-4 py-1"
                        >
                            <p>Check out my blogs!</p>
                        </Link>
                    </div>
                    <div className="w-full h-auto flex flex-row justify-end items-center gap-5">
                        <p className="text-2xl italic font-thin">My socials:</p>
                        <a 
                            className="highlight-text"
                            href="https://www.linkedin.com/in/hoang-quan-nguyen-304705266/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <SiLinkedin className="text-3xl" />
                        </a>
                        <a
                            className="highlight-text"
                            href="https://github.com/HarryNguyenUSYD/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <SiGithub className="text-3xl" />
                        </a>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}

function AboutMeSection() {
    return (
        <SectionWrapper id="about-me">
            <div className="w-full h-screen">
                <div className="w-full h-full flex flex-col justify-center items-start gap-3">
                    <p className="text-4xl font-bold">About me</p>
                    <p className="text-xl">
                        I'm a student at The University of Sydney,
                        studying Bachelor of Advanced Computing, Computer Science major. 
                        I enrolled in February of 2023, and expects to graduate in late 2026.
                    </p>
                    <p className="text-xl">
                        I'm passionate about web, software, and game development.
                        As such, I always try to learn new tools and techniques to improve my development skills.
                    </p>
                    <p className="text-xl">
                        My desire is to make all of my projects fun, either it's to make, use, or play.
                    </p>
                </div>
            </div>
        </SectionWrapper>
    );
}

function MySkillsSection() {
    const Skill = ({ Icon }: {
        Icon: IconType
    }) => {
        return (
            <div className="group flex flex-col justify-center items-center">
                <Icon className={`text-2xl`} />
            </div>
        )
    }

    return (
        <SectionWrapper id="my-skills">
            <div className="w-full h-screen">
                <div className="w-full h-full flex flex-col justify-center items-start gap-3">
                    <p className="text-4xl font-bold">My skills</p>
                    <p className="text-xl">
                        While my university has taught me tons of programming languages, platforms, and tools, 
                        most of my knowledge has been through self studying (I made this website using React, which I taught myself!). 
                        I am constantly learning new skills in all areas, most importantly in AI and software development.
                    </p>
                    <p className="text-xl">
                        Here is a list of skills I have learned until now:
                    </p>
                    <div className="grid grid-rows-3 h-auto w-full gap-2 text-xl">
                        <div className="h-8 flex flex-row justify-start items-center">
                            <p className="w-24 h-full px-1 font-bold bg-green-500 flex justify-start items-center flex-none">Proficient</p>
                            <div className="w-full h-full px-2 flex flex-row justify-start items-center gap-2 bg-[#00000088]">
                                <Skill Icon={SiPython} />
                                <Skill Icon={SiJavascript} />
                                <Skill Icon={SiTypescript} />
                                <Skill Icon={FaReact} />
                                <Skill Icon={FaHtml5} />
                                <Skill Icon={FaNodeJs} />
                            </div>
                        </div>
                        <div className="h-8 flex flex-row justify-start items-center">
                            <p className="w-24 h-full px-1 font-bold bg-yellow-500 flex justify-start items-center flex-none">Competent</p>
                            <div className="w-full h-full px-2 flex flex-row justify-start items-center gap-2 bg-[#00000088]">
                                <Skill Icon={SiC} />
                                <Skill Icon={FaJava} />
                                <Skill Icon={SiFirebase} />
                                <Skill Icon={SiUnity} />
                                <Skill Icon={SiMysql} />
                                <Skill Icon={SiPostgresql} />
                            </div>
                        </div>
                        <div className="h-8 flex flex-row justify-start items-center">
                            <p className="w-24 h-full px-1 font-bold bg-red-500 flex justify-start items-center flex-none">Novice</p>
                            <div className="w-full h-full px-2 flex flex-row justify-start items-center gap-2 bg-[#00000088]">
                                <Skill Icon={SiCplusplus} />
                                <Skill Icon={SiDotnet} />
                                <Skill Icon={SiJira} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}

function MyBlogsSection() {
    const { setValue } = useCopiableTextContext();

    const handleCopyTextToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setValue(true);
            setTimeout(() => setValue(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    }

    return (
        <SectionWrapper id="my-blogs">
            <div className="w-full h-screen">
                <div className="w-full h-full flex flex-col justify-center items-start gap-3">
                    <p className="text-4xl font-bold">My blogs</p>
                    <p className="text-xl">
                        Blogs are the way I showcase my knowledge, projects, and other fun things I have learnt across the years.
                        I will often upload my devlogs and guides on this website, so make sure to check it out regularly.
                    </p>
                    <p className="text-xl">
                        Please support me by following my uploads and share them if you find them helpful.
                    </p>
                    <p className="text-xl">
                        If you have an idea for a post, perhaps a concept you want me to cover,
                        please send me an email at <span className="highlight-text" onClick={() => handleCopyTextToClipboard("nguyenhoangquan2122@gmail.com")}>
                            nguyenhoangquan2122@gmail.com
                        </span>.
                    </p>
                    <p className="text-xl">
                        You can view my full list of blogs <Link className="highlight-text" href="/blogs">here</Link>.
                    </p>
                </div>
            </div>
        </SectionWrapper>
    );
}

function MyProjectsSection() {
    return (
        <SectionWrapper id="my-projects">
            <div className="w-full h-screen">
                <div className="w-full h-full flex flex-col justify-center items-start gap-3">
                    <p className="text-4xl font-bold">My projects</p>
                    <p className="text-xl">
                        I love playing video games, but only half as much as I love making them.
                    </p>
                    <p className="text-xl">
                        Game development is my way of learning new knowledge and techniques of the tools I use.
                        It also challenges my software design skills, most importantly on system design and improving user experience.
                    </p>
                    <p className="text-xl">
                        You can view my full list of games and other projects <Link className="highlight-text" href="/projects">here</Link>.
                    </p>
                </div>
            </div>
        </SectionWrapper>
    );
}

function ContactMeSection() {
    const { setValue } = useCopiableTextContext();

    const handleCopyTextToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setValue(true);
            setTimeout(() => setValue(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    }

    return (
        <SectionWrapper id="contact-me">
            <div className="w-full h-screen">
                <div className="w-full h-full flex flex-col justify-center items-start gap-3">
                    <p className="text-4xl font-bold">Contact me!</p>
                    <p className="text-xl">
                        As a student, I would love to have as many hands-on experience as one can possibly get. 
                        With my graduation year getting closer, I am always hunting for internships, part-time jobs or opportunities, especially if it relates to software, game or web development.
                    </p>
                    <p className="text-xl">
                        If you need someone to help out in your project, startup or company, feel free to contact me, and I will reply as soon as I can.
                    </p>
                    <p className="text-xl">
                        Contact me via email at <span className="highlight-text" onClick={() => handleCopyTextToClipboard("nguyenhoangquan2122@gmail.com")}>nguyenhoangquan2122@gmail.com</span>.
                    </p>
                    <p className="text-xl">
                        Or message me via LinkedIn <a
                            className="highlight-text"
                            href="https://www.linkedin.com/in/hoang-quan-nguyen-304705266/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            here
                        </a>.
                    </p>
                </div>
            </div>
        </SectionWrapper>
    );
}