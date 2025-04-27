import { supabase } from '@/global/database/supabaseClient';

export async function fetchBlogs() {
    return await supabase
        .from('Blog')
        .select("*")
}