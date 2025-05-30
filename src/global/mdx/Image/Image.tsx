"use client";

import { fetchImage } from '@/global/supabase/supabaseClient';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ImageGallery({
    url,
    src,
    width,
    height,
    alt
} : {
    url: string,
    src: string,
    width: number,
    height: number,
    alt?: string
}) {
    const [imageSrc, setImageSrc] = useState<string>();

    useEffect(() => {
        async function fetchImages() {
            const { data } = await fetchImage(url, src);

            setImageSrc(data.publicUrl);
        }

        fetchImages();
    }, [src, url]);

    return (
        <div className='relative w-full h-[50vh] lg:h-[75vh] flex flex-col justify-center items-center'>
            <div className="relative w-full h-full overflow-x-auto my-3 lg:my-10 flex justify-center items-center">
                {imageSrc && <Image src={imageSrc} alt={alt ?? ""} width={width} height={height} className='w-auto h-full' />}
            </div>
            {alt && <p className='text-sm lg:text-xl italic font-thin text-center'>{alt}</p>}
        </div>
    )
}