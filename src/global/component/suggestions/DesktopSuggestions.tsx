import { fetchBlogAvatar, fetchRecentBlogs, fetchSeriesAvatar, fetchSeriesFromId } from "@/global/supabase/supabaseClient";
import { Blog, Series } from "@/global/supabase/tables";
import Link from "next/link"
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Suggestions({
    blog
}: {
    blog: Blog
}) {
    const [series, setSeries] = useState<Series | null>(null);
    const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
    
    useEffect(() => {
        async function fetchSeriesData(seriesId: number) {
            const { data: seriesData, error: seriesDataError } = await fetchSeriesFromId(seriesId);
            
            if (seriesDataError) {
                console.error('Error fetching series data:', seriesDataError);
                return;
            } else {
                console.log(seriesData);
                setSeries(seriesData[0]);
            }
        }

        async function fetchRecentBlogsData() {
            const { data: blogsData, error: blogsDataError } = await fetchRecentBlogs();
            
            if (blogsDataError) {
                console.error('Error fetching blogs data:', blogsDataError);
                return;
            } else {
                setRecentBlogs(blogsData);
            }
        }

        if (blog.seriesId !== undefined) {
            fetchSeriesData(blog.seriesId);
        }

        fetchRecentBlogsData();
    }, [blog])

    return (
        <div className="w-full h-auto flex flex-col justify-start items-start gap-15">
            {(series !== null) && (
                <SeriesSuggestion series={series} />
            )}
            <p className="text-3xl text-thin italic -mb-10">My most recent posts:</p>
            {recentBlogs.map((blog, i) => (<BlogSuggestion key={"recent_blog_" + i} blog={blog} />))}
        </div>
    )
}

function BlogSuggestion({
    blog
}: {
    blog: Blog
}) {
    const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
            
    useEffect(() => {
        async function fetchAvatar() {
            const { data: avatarData } = await fetchBlogAvatar(blog);
            
            if (avatarData === null) {
                console.error('Error fetching blog avatar data');
                return;
            } else {
                setAvatarSrc(avatarData.publicUrl);
            }
        }

        fetchAvatar();
    }, [blog]);

    return (
        <div className="w-full h-80">
            <Link
                className="w-full h-full flex flex-col justify-start items-center cursor-pointer"
                href={"/blogs/" + blog.url}
            >
                <div className="w-full h-60 overflow-hidden flex flex-col justify-center items-center">
                    {avatarSrc !== null && (
                        <Image
                            src={avatarSrc}
                            alt="Blog avatar"
                            width={1000} height={500}
                            className="w-full h-full object-cover object-center hover:scale-110 duration-150"
                        />
                    )}
                </div>
                <p className="w-full mt-5 text-3xl font-bold hover:text-blue-highlighted duration-150">{blog.title}</p>
            </Link>
        </div>
    )
}

function SeriesSuggestion({
    series
}: {
    series: Series
}) {
    const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
            
    useEffect(() => {
        async function fetchAvatar() {
            const { data: avatarData } = await fetchSeriesAvatar(series);
            
            if (avatarData === null) {
                console.error('Error fetching series avatar data');
                return;
            } else {
                setAvatarSrc(avatarData.publicUrl);
            }
        }

        fetchAvatar();
    }, [series]);

    return (
        <>
            <div className="w-full h-80 mb-5">
                <p className="text-3xl text-thin italic mb-5">Check out the full series:</p>
                <Link
                    className="w-full h-full flex flex-col justify-start items-center cursor-pointer"
                    href={"/blogs?title=" + series.title.replace(' ', '+')}
                    >
                    <div className="w-full h-60 overflow-hidden flex flex-col justify-center items-center">
                        {avatarSrc !== null && (
                            <Image
                            src={avatarSrc}
                            alt="Series avatar"
                            width={1000} height={500}
                            className="w-full h-full object-cover object-center hover:scale-110 duration-150"
                            />
                        )}
                    </div>
                    <p className="w-full mt-5 text-4xl font-bold italic text-center hover:text-blue-highlighted duration-150">{series.title}</p>
                </Link>
            </div>
            <div className="w-full h-0 border-t border-white opacity-50"></div>
        </>
    )
}