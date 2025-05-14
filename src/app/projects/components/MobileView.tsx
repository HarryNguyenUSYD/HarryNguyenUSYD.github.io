"use client";

import { useEffect, useState } from "react";

import { CopiableTextContextProvider, CopiedTextNotification } from "@/global/component/CopiableText";
import PageWrapper from "@/global/component/page-wrapper/MobilePageWrapper";
import { Project } from "@/global/supabase/tables";
import Link from "next/link";
import Image from "next/image";
import { fetchProjectAvatar, fetchProjects } from "@/global/supabase/supabaseClient";

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
        <div className="w-full h-auto flex flex-col justify-start items-center gap-5">
            <Title />
            <PostDisplay projects={projects} />
        </div>
    );
}

function Title() {
    return (
        <div className="w-full h-auto flex flex-col justify-start items-start gap-2">
            <p className="text-xl font-bold whitespace-nowrap">My Projects</p>
            <p className="text-sm font-thin italic whitespace-nowrap">- Cool things I have made and lessons I have learnt</p>
        </div>
    )
}

function PostDisplay({
    projects
} : {
    projects: Project[]
}) {
    return (
        <div className="relative w-full h-auto flex flex-col justify-start items-center gap-5">
            <div className="w-full h-auto grid grid-cols-1 gap-5">
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
    const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

    useEffect(() => {
        async function fetchAvatar() {
            const { data: avatarData } = await fetchProjectAvatar(project);
            
            if (avatarData === null) {
                console.error('Error fetching project avatar data');
                return;
            } else {
                setAvatarSrc(avatarData.publicUrl);
            }
        }

        fetchAvatar();
    }, [project]);

    return (
        <div className="w-full h-[60vh] rounded-xl flex flex-col justify-center items-center gap-5">
            <div className="w-full h-full flex flex-col justify-start items-center overflow-hidden">
                <Link href={"/projects/" + project.url} className="w-full h-[40%] flex-none overflow-hidden">
                    {avatarSrc !== null && <Image src={avatarSrc} width={1000} height={500} alt="Post's image" className="w-full h-full object-cover object-center" />}
                </Link>
                <div className="w-full h-full p-5 flex flex-col justify-start items-start">
                    <Link href={"/projects/" + project.url} className="w-full h-full">
                        <div className="w-full h-auto flex flex-col justify-between items-start">
                            <p className="text-3xl font-bold whitespace-nowrap">{project.title}</p>
                            <p className="text-base font-thin italic">{new Date(project.date).toLocaleDateString()}</p>
                        </div>
                        <p className="text-xl w-full h-full pt-2 text-left">
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