"use client";

import { useEffect, useState, use } from "react";

import { fetchProjectFromUrl, fetchProjectMdx } from "@/global/supabase/supabaseClient";
import { mdxParse } from "@/global/mdx/mdxParse";

import { FaArrowLeft } from "react-icons/fa";

import PageWrapper from "@/global/component/page-wrapper/MobilePageWrapper";
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Project } from "@/global/supabase/tables";
import ErrorPage from "@/global/component/error-page/MobileErrorPage";

import { useMDXComponents } from "@/global/mdx/mdxComponents";
import Link from "next/link";
import { CopiableTextContextProvider, CopiedTextNotification } from "@/global/component/CopiableText";

export default function ProjectPage({ params } : { params: Promise<{slug: string}>}) {
    const { slug: projectUrl } = use(params);

    const [project, setProject] = useState<Project | null>(null);
    const [projectMdx, setProjectMdx] = useState<MDXRemoteSerializeResult | null>(null);
    const [loading, setLoading] = useState(true)

    const components = useMDXComponents();

    useEffect(() => {
        async function fetchData() {
            const { data: projectData, error: projectDataError } = await fetchProjectFromUrl(projectUrl);

            if (projectDataError) {
                console.error('Error fetching project data:', projectDataError);
                return;
            } else {
                setProject(projectData[0]);
            }

            const { data: projectBlob, error: projectBlobError } = await fetchProjectMdx(projectData[0]);
        
            if (projectBlob === null || projectBlobError) {
                console.error('Error fetching project blob:', projectBlobError);
                return;
            } else {
                const parsed = await mdxParse(projectBlob);
                setProjectMdx(parsed);
            }

            setLoading(false);
        }
    
        fetchData();
    }, [projectUrl]);

    return (
        <CopiableTextContextProvider>
            <PageWrapper>
                <div className="w-full h-full mt-5">
                    {
                        (loading) ? <LoadingScreen /> : 
                        (projectUrl === null || project === null || projectMdx === null) ? <ErrorPage /> :
                        (
                            <>
                                <ProjectHeader project={project} />
                                <div className="w-full h-auto p-5 mt-2 bg-[#000000af] rounded-3xl">
                                    {(loading || projectMdx === null) ? <LoadingScreen /> : <MDXRemote {...projectMdx} components={components} />}
                                </div>
                            </>
                        )
                    }
                </div>
                <CopiedTextNotification /> 
            </PageWrapper>
        </CopiableTextContextProvider>
    )
}

function ProjectHeader({
    project
} : {
    project: Project
}) {
    return (
        <div className="w-full h-auto flex flex-col justify-center items-center gap-3">
            <div className="w-full flex flex-row justify-start items-center">
                <Link href="/projects" className="flex flex-row justify-start items-center gap-3 hover:text-blue-highlighted duration-100">
                    <FaArrowLeft className="text-base" />
                    <p className="text-2xl">Back</p>
                </Link>
            </div>
            <p className="text-4xl font-bold my-2 text-center">{project.title}</p>
            <p className="text-base font-thin italic">Uploaded on: {new Date(project.date).toLocaleDateString()}</p>
            <div className="w-full border border-white opacity-50 my-3"></div>
        </div>
    )
}

function LoadingScreen() {
    return (
        <div className="w-full h-auto my-5 flex justify-center items-center text-xl italic">
            <p>Loading the project, this might take a few seconds...</p>
        </div>
    );
}
