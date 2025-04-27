"use client";

import Link from "next/link";

import { SiLinkedin, SiGithub, SiPython, SiC, SiCplusplus, SiJavascript, SiTypescript, SiUnity, SiDotnet, SiFirebase, SiJira, SiMysql, SiPostgresql } from "react-icons/si";
import { FaRegSmile, FaUser, FaCog, FaReact, FaHtml5, FaJava, FaNodeJs } from "react-icons/fa";
import { IconType } from "react-icons";
import { LuGamepad2, LuNewspaper } from "react-icons/lu";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { CopiableTextContextProvider, CopiedTextNotification, useCopiableTextContext } from "@/global/component/CopiableText";
import PageWrapper from "@/global/component/PageTemplate";

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
        <div className={`absolute left-line top-0 mt-[50vh] w-0 h-[calc(100%-100vh)] border-8 border-dashed border-white`}></div>
    );
}

function SectionWrapper({
    id,
    children,
    Icon,
    className = ""
}: {
    id: string,
    children: React.ReactNode,
    Icon: IconType,
    className?: string
}) {
    return (
        <div id={id} className={`w-full h-auto ${className} flex flex-row`}>
            <div className={`w-wrapper h-auto flex justify-center items-center`}>
                <div className="ml-4 w-20 aspect-square bg-white flex justify-center items-center">
                    <Icon className="text-5xl text-black z-10" />
                </div>
            </div>
            <div className={`w-content h-auto`}>
                {children}
            </div>
        </div>
    )
}

function DecoratedAnchor({
    href,
    children,
    className = "",
    ...props
} : React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string,
    children: React.ReactNode,
    className?: string
}) {
    return (
        <Link
            href={href}
            className={`w-auto h-auto text-4xl font-bold cursor-pointer border-4 border-white
                px-5 py-3 hover:bg-white hover:text-black duration-200 ${className}`}
            {...props}
        >
            {children}
        </Link>
    )
}

function IntroductionSection() {
    return (
        <SectionWrapper id="introduction" Icon={FaRegSmile}>
            <div className="w-full h-screen">
                <div className="w-full h-full flex flex-col justify-center items-start gap-14">
                    <p className="text-4xl">Hello there! My name is</p>
                    <p className="text-8xl font-bold">Hoang "Harry" Nguyen</p>
                    <p className="text-5xl italic">Computer Science student at the University of Sydney</p>
                    <div className="w-full h-auto flex flex-row justify-between items-center">
                        <DecoratedAnchor href="#about-me">
                            <p>Get Started</p>
                        </DecoratedAnchor>
                        <div className="w-1/2 h-auto flex flex-row justify-end items-center gap-10">
                            <p className="text-4xl italic font-thin">My socials:</p>
                            <a 
                                className="highlight-text"
                                href="https://www.linkedin.com/in/hoang-quan-nguyen-304705266/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <SiLinkedin className="text-4xl" />
                            </a>
                            <a
                                className="highlight-text"
                                href="https://github.com/HarryNguyenUSYD/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <SiGithub className="text-4xl" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}

function AboutMeSection() {
    return (
        <SectionWrapper id="about-me" Icon={FaUser}>
            <div className="w-full h-screen">
                <div className="w-[80%] h-full flex flex-col justify-center items-start gap-14">
                    <p className="text-6xl font-bold">About me</p>
                    <p className="text-4xl">
                        I'm a student at The University of Sydney,
                        studying Bachelor of Advanced Computing, Computer Science major. 
                        I enrolled in February of 2023, and expects to graduate in late 2026.
                    </p>
                    <p className="text-4xl">
                        I'm passionate about web, software, and game development.
                        As such, I always try to learn new tools and techniques to improve my development skills.
                    </p>
                    <p className="text-4xl">
                        My desire is to make all of my projects fun, either it's to make, use, or play.
                    </p>
                </div>
            </div>
        </SectionWrapper>
    );
}

function MySkillsSection() {
    const Skill = ({ name, Icon }: {
        name: string,
        Icon: IconType
    }) => {
        return (
            <div className="group flex flex-col justify-center items-center">
                <Icon className={`text-5xl`} />
                <p
                    className="absolute mt-40 text-3xl p-3 border border-white bg-black
                        pointer-events-none opacity-0 duration-200 group-hover:opacity-100"
                >
                    {name}
                </p>
            </div>
        )
    }

    return (
        <SectionWrapper id="my-skills" Icon={FaCog}>
            <div className="w-full h-screen">
                <div className="w-[80%] h-full flex flex-col justify-center items-start gap-14">
                    <p className="text-6xl font-bold">My skills</p>
                    <p className="text-4xl">
                        While my university has taught me tons of programming languages and tools within the computer science field, 
                        most of my knowledge has been through self studying (I made this website using React, which I taught myself!). 
                        I am constantly learning new skills in all areas, most importantly in AI and software development.
                    </p>
                    <p className="text-4xl">
                        Here is a list of skills I have learned until now:
                    </p>
                    <div className="grid grid-rows-3 h-auto w-full gap-2">
                        <div className="h-20 flex flex-row justify-start items-center">
                            <p className="w-64 h-full text-5xl px-5 font-bold bg-green-500 flex justify-start items-center flex-none">Proficient</p>
                            <div className="w-full h-full px-8 flex flex-row justify-start items-center gap-5 bg-[#00000088]">
                                <Skill name="Python" Icon={SiPython} />
                                <Skill name="JavaScript" Icon={SiJavascript} />
                                <Skill name="TypeScript" Icon={SiTypescript} />
                                <Skill name="React" Icon={FaReact} />
                                <Skill name="HTML5" Icon={FaHtml5} />
                                <Skill name="Node.js" Icon={FaNodeJs} />
                            </div>
                        </div>
                        <div className="h-20 flex flex-row justify-start items-center">
                            <p className="w-64 h-full text-5xl px-5 font-bold bg-yellow-500 flex justify-start items-center flex-none">Competent</p>
                            <div className="w-full h-full px-8 flex flex-row justify-start items-center gap-5 bg-[#00000088]">
                                <Skill name="C" Icon={SiC} />
                                <Skill name="Java" Icon={FaJava} />
                                <Skill name="Firebase" Icon={SiFirebase} />
                                <Skill name="Unity" Icon={SiUnity} />
                                <Skill name="MySQL" Icon={SiMysql} />
                                <Skill name="PostgreSQL" Icon={SiPostgresql} />
                            </div>
                        </div>
                        <div className="h-20 flex flex-row justify-start items-center">
                            <p className="w-64 h-full text-5xl px-5 font-bold bg-red-500 flex justify-start items-center flex-none">Novice</p>
                            <div className="w-full h-full px-8 flex flex-row justify-start items-center gap-5 bg-[#00000088]">
                                <Skill name="C++" Icon={SiCplusplus} />
                                <Skill name=".NET" Icon={SiDotnet} />
                                <Skill name="Jira" Icon={SiJira} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start items-start text-xl">
                        <p>
                            * Proficient: Have learnt intensively in uni, and/or have made several projects with
                        </p>
                        <p>
                            * Competent: Have learnt basics in uni, and/or have made one project with
                        </p>
                        <p>
                            * Novice: Have only used basic features
                        </p>
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
        <SectionWrapper id="my-blogs" Icon={LuNewspaper}>
            <div className="w-full h-screen">
                <div className="w-[80%] h-full flex flex-col justify-center items-start gap-14">
                    <p className="text-6xl font-bold">My blogs</p>
                    <p className="text-4xl">
                        Blogs are the way I showcase my knowledge, projects, and other fun things I have learnt across the years.
                        I will often upload my devlogs and guides on this website, so make sure to check it out regularly.
                    </p>
                    <p className="text-4xl">
                        Please support me by following my uploads and share them if you find them helpful.
                    </p>
                    <p className="text-4xl">
                        If you have an idea for a post, perhaps a concept you want me to cover,
                        please send me an email at <span className="highlight-text" onClick={() => handleCopyTextToClipboard("nguyenhoangquan2122@gmail.com")}>
                            nguyenhoangquan2122@gmail.com
                        </span>.
                    </p>
                    <p className="text-4xl">
                        You can view my full list of blogs <Link className="highlight-text" href="/blogs">here</Link>.
                    </p>
                </div>
            </div>
        </SectionWrapper>
    );
}

function MyProjectsSection() {
    return (
        <SectionWrapper id="my-projects" Icon={LuGamepad2}>
            <div className="w-full h-screen">
                <div className="w-[80%] h-full flex flex-col justify-center items-start gap-14">
                    <p className="text-6xl font-bold">My projects</p>
                    <p className="text-4xl">
                        I love playing video games, but only half as much as I love making them.
                    </p>
                    <p className="text-4xl">
                        Game development is my way of learning new knowledge and techniques of the tools I use.
                        It also challenges my software design skills, most importantly on system design and improving user experience.
                    </p>
                    <p className="text-4xl">
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
        <SectionWrapper id="contact-me" Icon={MdOutlineAlternateEmail}>
            <div className="w-full h-screen">
                <div className="w-[80%] h-full flex flex-col justify-center items-start gap-14">
                    <p className="text-6xl font-bold">Contact me!</p>
                    <p className="text-4xl">
                        As a student, I would love to have as many hands-on experience as one can possibly get. 
                        With my graduation year getting closer, I am always hunting for internships, part-time jobs or opportunities, especially if it relates to software, game or web development.
                    </p>
                    <p className="text-4xl">
                        If you need someone to help out in your project, startup or company, feel free to contact me, and I will reply as soon as I can.
                    </p>
                    <p className="text-4xl">
                        Contact me via email at <span className="highlight-text" onClick={() => handleCopyTextToClipboard("nguyenhoangquan2122@gmail.com")}>nguyenhoangquan2122@gmail.com</span>.
                    </p>
                    <p className="text-4xl">
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