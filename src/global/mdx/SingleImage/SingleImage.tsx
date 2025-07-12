"use client";

import { fetchImage } from '@/global/supabase/supabaseClient';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MdOutlineClose } from "react-icons/md";

export default function SingleImage({
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
    const [isShowingZoomedImage, setIsShowingZoomedImage] = useState<boolean>(false);

    useEffect(() => {
        async function fetchImages() {
            const { data } = await fetchImage(url, src);

            setImageSrc(data.publicUrl);
        }

        fetchImages();
    }, [src, url]);

    return (
        <>
            <div className='relative w-full max-h-[70vh] lg:max-h-[100vh] flex flex-col justify-center items-center'>
                <button
                    className="relative w-auto h-auto my-3 lg:my-10 flex justify-center items-center
                        border-2 border-white p-1 lg:p-2 lg:hover:border-blue-highlighted lg:duration-150 lg:cursor-pointer"
                    onClick={() => setIsShowingZoomedImage(true)}
                >
                    {imageSrc && <Image src={imageSrc} alt={alt ?? ""} width={width} height={height} className='min-w-[25vw] min-h-[25vh] w-auto h-full' />}
                </button>
                {alt && <p className='text-sm lg:text-xl italic font-thin text-center'>{alt}</p>}
            </div>
            {isShowingZoomedImage && (
                <button
                    className='fixed w-screen h-screen inset-0 backdrop-blur-xl flex flex-row justify-center items-center z-50'
                    onClick={() => setIsShowingZoomedImage(false)}
                >
                    <div className='absolute top-5 right-10'>
                        <MdOutlineClose className='text-5xl text-white lg:hover:text-blue-highlighted lg:duration-150 lg:cursor-pointer' />
                    </div>
                    <div className='relative w-3/4 h-3/4 lg:w-2/3 lg:h-2/3 flex flex-row justify-center items-center'>
                        {imageSrc && <Image src={imageSrc} alt={alt ?? ""} width={width} height={height} className='object-contain' />}
                    </div>
                </button>
            )}
        </>
    )
}