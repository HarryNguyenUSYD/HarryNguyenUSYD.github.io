import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchBlogs() {
    return await supabase
        .from('Blog')
        .select("*")
        .limit(10);
}

export async function fetchBlogMdx(path: string) {
    return await supabase
        .storage
        .from('mdx-bucket')
        .download(path);
}