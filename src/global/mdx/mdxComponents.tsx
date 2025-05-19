import type { MDXComponents } from 'mdx/types'
import ImageGallery from './ImageGallery/ImageGallery';
import References from './References/References';
import CodeBlock from './CodeBlock/CodeBlock';
import Code from './Code/Code';
 
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
        ImageGallery,
        References,
        Code,
        CodeBlock,
        ...components
    };
}