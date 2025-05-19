'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeBlock({
    language,
    desc,
    code
} : {
    language: string,
    desc: string,
    code: string
}) {
    return (
        <div className='w-full h-auto flex flex-col justify-start items-center gap-1 lg:gap-3 text-xs lg:text-base'>
            <SyntaxHighlighter language={language} style={nightOwl}>
                {code}
            </SyntaxHighlighter>
            <p className='text-sm lg:text-xl italic font-thin text-center'>{desc}</p>
        </div>
    );
}