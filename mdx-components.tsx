import type { MDXComponents } from 'mdx/types'
import { useMDXComponents as srcMDXComponents } from "@/global/mdx/mdxComponents";
 
export function useMDXComponents(components?: MDXComponents): MDXComponents {
    return srcMDXComponents(components);
}