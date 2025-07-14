"use client";

import { fetchImage } from '@/global/supabase/supabaseClient';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ImgData {
    src: string,
    width: number,
    height: number,
    alt?: string
}

export default function ImageGallery({
    url,
    id,
    imgsData
}: {
    url: string,
    id: string,
    imgsData: ImgData[]
}) {
    const [images, setImages] = useState<ImgData[]>([]);

    useEffect(() => {
        async function fetchImages() {
            const loadingImages: ImgData[] = [];
            await imgsData.forEach(async (imgData) => {
                const { data } = await fetchImage(url, imgData.src);

                loadingImages.push({
                    ...imgData,
                    src: data.publicUrl
                });
            });

            setImages(loadingImages);
        }

        fetchImages();
    }, [imgsData, url]);

    return (
        <div className="relative w-full h-[50vh] lg:h-[75vh] overflow-x-auto my-3 lg:my-10">
            <div className="w-auto h-full flex flex-row justify-start items-center gap-2 lg:gap-5 pb-3 lg:pb-5">
                {images.map((image, i) => {
                    return (
                        <div key={id + "_" + i} className='relative w-auto h-full flex-none'>
                            <Image src={image.src} alt={image.alt ?? ""} width={image.width} height={image.height} className='w-auto h-full' />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}