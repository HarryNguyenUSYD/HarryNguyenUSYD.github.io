import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchAllBlogs() {
    return await supabase
        .from('Blog')
        .select("*")
        .range(0, 9);
}

export async function fetchBlogFromUrl(url: string) {
    return await supabase
        .from('Blog')
        .select("*")
        .eq("url", url);
}

export async function fetchBlogMdx(path: string) {
    return await supabase
        .storage
        .from('mdx-bucket')
        .download(path);
}