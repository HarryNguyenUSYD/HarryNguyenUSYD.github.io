'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';

import { RiFileCopyLine } from "react-icons/ri";
import { IoMdCheckmark } from "react-icons/io";
import { useCopiableTextContext } from '@/global/component/CopiableText';

export default function CodeBlock({
    language,
    code,
    copiable = false,
    alt
} : {
    language: string,
    code: string,
    copiable: boolean,
    alt?: string
}) {
    const [isCopied, setIsCopied] = useState(false);
    const { setValue } = useCopiableTextContext();

    const handleCopyTextToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setValue(true);
            setTimeout(() => setValue(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    }

    return (
        <div className='w-full h-auto flex flex-col justify-start items-center gap-1 lg:gap-3 text-xs lg:text-base'>
            <div className='w-full h-auto flex flex-row justify-center items-center'>
                <div className='max-w-full w-auto h-auto flex flex-col justify-center items-center'>
                    <button
                        style={{ display: copiable ? "flex" : "none" }}
                        className='flex-row justify-end px-3 py-1 bg-blue-950 text-blue-200 items-center gap-1
                            text-xs lg:text-sm cursor-pointer rounded-t-md self-end'
                        onClick={() => handleCopyTextToClipboard(code)}
                    >
                        <RiFileCopyLine style={{ display: isCopied ? "none" : "block" }} />
                        <p>{ isCopied ? "Copied" : "Copy" }</p>
                        <IoMdCheckmark style={{ display: isCopied ? "block" : "none" }} />
                    </button>
                    <SyntaxHighlighter language={language} style={nightOwl} customStyle={{ margin: 0, maxWidth: "100%" }}>
                        {code}
                    </SyntaxHighlighter>
                </div>
            </div>
            {alt && <p className='text-sm lg:text-xl italic font-thin text-center'>{alt}</p>}
        </div>
    );
}