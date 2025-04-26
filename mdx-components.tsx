import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: (props) => <h1 className="text-7xl mb-3 font-bold text-center" {...props} />,
        h2: (props) => <h2 className="text-4xl font-semibold my-4" {...props} />,
        h6: (props) => <h2 className="text-3xl font-thin italic text-center" {...props} />,
        p: (props) => <p className="text-xl" {...props} />,
        ul: (props) => <ul className="list-disc ml-6 my-4" {...props} />,
        li: (props) => <li className="mb-2" {...props} />,
        a: (props) => <a className="text-blue-500 underline" {...props} />,
        blockquote: (props) => (
          <blockquote className="border-l-4 pl-4 italic text-gray-600" {...props} />
        ),
    };
}