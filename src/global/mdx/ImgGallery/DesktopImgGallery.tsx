"use client";

import { fetchImage } from '@/global/supabase/supabaseClient';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ImgGallery({
    url,
    srcs
}: {
    url: string,
    srcs: string[]
}) {
    const [fetchedImgSrcs, setFetchedImgSrcs] = useState<string[]>([]);

    useEffect(() => {
        async function fetchImgs() {
            const images: string[] = [];
            await srcs.forEach(async (src) => {
                const { data } = await fetchImage(url, src);

                images.push(data.publicUrl);
            });

            setFetchedImgSrcs(images);
        }

        fetchImgs();
    }, [url, srcs]);

    return (
        <div className="w-full h-32 overflow-x-auto">
            <div className="w-auto h-full flex flex-row justify-start items-center gap-5">
                {fetchedImgSrcs.map((src) => (
                    <Image src={src} alt='Project Image' key={src} className='w-[33%] h-full' />
                ))}
            </div>
        </div>
    )
}