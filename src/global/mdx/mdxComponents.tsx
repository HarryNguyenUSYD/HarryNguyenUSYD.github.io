import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(components?: MDXComponents): MDXComponents {
    return {
        h1: (props) => <h1 className="text-xl my-2 lg:text-4xl lg:my-5 font-bold" {...props} />,
        p: (props) => <p className="text-base lg:text-2xl my-2" {...props} />,
        ul: (props) => <ul className="list-disc ml-6 my-4" {...props} />,
        li: (props) => <li className="mb-2" {...props} />,
        a: (props) => <a className="highlight-text" target='_blank' rel="noopener noreferrer" {...props} />,
        blockquote: (props) => (
          <blockquote className="border-l-4 pl-4 italic text-gray-600" {...props} />
        ),
        ...components
    };
}