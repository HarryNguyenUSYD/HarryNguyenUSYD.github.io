import type { MDXComponents } from 'mdx/types'
import SingleImage from './SingleImage/SingleImage';
import ImageGallery from './ImageGallery/ImageGallery';
import References from './References/References';
import CodeBlock from './CodeBlock/CodeBlock';
import Redirect from './Redirect/Redirect';
import Table from './Table/Table';

export function useMDXComponents(components?: MDXComponents): MDXComponents {
    return {
        h1: (props) => <h1 className="text-2xl my-2 lg:text-4xl lg:my-8 font-bold" {...props} />,
        h2: (props) => <h2 className="text-xl my-2 lg:text-3xl lg:my-7 font-bold" {...props} />,
        p: (props) => <p className="text-base lg:text-2xl my-8" {...props} />,
        ul: (props) => <ul className="list-disc ml-6 my-8" {...props} />,
        li: (props) => <li className="my-2 text-base lg:text-2xl" {...props} />,
        a: (props) => <a className="highlight-text" target='_blank' rel="noopener noreferrer" {...props} />,
        blockquote: (props) => (
            <blockquote className="border-l-4 pl-4 italic mx-5 my-8" {...props} />
        ),
        strong: (props) => (
            <strong className="text-base lg:text-2xl my-8 font-extrabold" {...props} />
        ),
        code: (props) => (
            <code className='bg-gray-200 dark:bg-gray-800 rounded px-1 py-0.5 text-sm lg:text-xl text-gray-200 break-all' {...props} />
        ),
        SingleImage,
        ImageGallery,
        References,
        CodeBlock,
        Redirect,
        Table,
        ...components
    };
}