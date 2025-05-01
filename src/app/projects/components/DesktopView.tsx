"use client";

import { useEffect, useState } from "react";

import { CopiableTextContextProvider, CopiedTextNotification } from "@/global/component/CopiableText";
import PageWrapper from "@/global/component/page-template/DesktopPageTemplate";
import { Project } from "@/global/supabase/tables";
import Link from "next/link";
import Image from "next/image";
import { fetchProjects } from "@/global/supabase/supabaseClient";

export default function Projects() {
    const [items, setItems] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const { data: projectItems, error: projectItemsError } = await fetchProjects();
        
            if (projectItemsError) {
                console.error('Error fetching project items:', projectItemsError);
            } else {
                setItems(projectItems || []);
            }

            setLoading(false);
        }
    
        fetchData();
    }, []);

    return (
        <CopiableTextContextProvider>
            <PageWrapper>
                {loading ? <LoadingScreen /> : <ProjectsContainer projects={items} />}
                <CopiedTextNotification />
            </PageWrapper>
        </CopiableTextContextProvider>
    );
}

function ProjectsContainer({
    projects
} : {
    projects: Project[]
}) {
    return (
        <div className="w-full h-auto p-10 flex flex-col justify-start items-center gap-5">
            <Title />
            <PostDisplay projects={projects} />
        </div>
    );
}

function Title() {
    return (
        <div className="w-full flex flex-row justify-start items-end gap-4">
            <p className="text-7xl font-bold whitespace-nowrap">My Projects</p>
            <p className="text-3xl font-thin italic whitespace-nowrap">- Cool things I've made and lessons I've learnt</p>
        </div>
    )
}

function PostDisplay({
    projects
} : {
    projects: Project[]
}) {
    return (
        <div className="relative w-full h-auto flex flex-col justify-start items-center gap-10">
            <div className="w-full h-auto grid grid-cols-3 gap-10">
                {projects.map((project) => (<Post key={project.id} project={project} />))}
            </div>
        </div>
    );
}

function Post({
    project
}: {
    project: Project
}) {
    return (
        <div className="w-full h-[60vh] rounded-xl flex flex-col justify-center items-center gap-10">
            <div className="w-full h-full flex flex-col justify-start items-center overflow-hidden">
                <Link href={"/projects/" + project.url} className="w-full h-auto overflow-hidden">
                    <Image src="/images/Icon/Website Favicon.png" width={120} height={120} alt="Post's image" className="w-full h-full hover:scale-110 duration-150" />
                </Link>
                <div className="w-full h-full p-5 flex flex-col justify-start items-start">
                    <Link href={"/projects/" + project.url} className="w-full h-full cursor-pointer group">
                        <div className="w-full h-auto flex flex-row justify-between items-start">
                            <p className="text-5xl font-bold whitespace-nowrap group-hover:text-blue-highlighted duration-150">{project.title}</p>
                            <p className="text-2xl font-thin italic">{new Date(project.date).toLocaleDateString()}</p>
                        </div>
                        <p className="text-2xl w-full h-full pt-2 text-left group-hover:text-blue-highlighted duration-150">
                            {project.desc}
                        </p>
                    </Link>
                </div>
            </div>
            <div className="w-full h-0 border-t border-white opacity-50"></div>
        </div>
    );
}

function LoadingScreen() {
    return (
        <div className="w-full h-auto my-10 flex justify-center items-center text-3xl italic">
            <p>Loading posts, this might take a few seconds...</p>
        </div>
    );
}