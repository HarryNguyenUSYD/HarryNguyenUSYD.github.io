import { createClient } from '@supabase/supabase-js'
import { Blog, Project, Series } from './tables';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Returns the total number of blogs
 * @returns the number of blogs
 */
export async function fetchBlogsCount() {
    return await supabase
        .from('Blog')
        .select('*', { count: 'exact', head: true });
}

/**
 * Returns 10 blogs by page and search params
 * @param page the page number
 * @param name the name number
 * @param order the order to fetch in
 * @param tag the tag to search for, "" means all posts
 * @returns the 10 blogs in page
 */
export async function fetchBlogs(page: number, name: string, tag: string, order: string) {
    const min = Math.max(10 * Math.floor(page), 0);
    const max = 10 * Math.floor(page) + 9;

    let column = 'date';
    let ascending = false;

    switch (order) {
        case 'newest': // Newest first
            column = 'date';
            ascending = false;
        break;
        case 'oldest': // Oldest first
            column = 'date';
            ascending = true;
        break;
        case 'most-viewed': // Highest views first
            column = 'view_count';
            ascending = false;
        break;
        case 'most-liked': // Highest likes first
            column = 'like_count';
            ascending = false;
        break;
        default: // Defaults to newest first
            column = 'date';
            ascending = false;
    }

    if (tag !== "") { // If we are looking for a specific tag, add .contains() to find the tag
        return await supabase
            .from('Blog')
            .select("*")
            .ilike('title', `%${name}%`)
            .contains('tags', [tag])
            .range(min, max)
            .order(column, { ascending });
    } else {
        return await supabase
            .from('Blog')
            .select("*")
            .ilike('title', `%${name}%`)
            .range(min, max)
            .order(column, { ascending });
    }

}

/**
 * Get the [count] most recent posts. Defaults to 3.
 * @param count The number of posts
 * @returns the [count] most recent posts
 */
export async function fetchRecentBlogs(count: number = 3) {
    return await supabase
        .from('Blog')
        .select('*')
        .order('date', { ascending: false })
        .limit(count); 
}

export async function fetchBlogFromUrl(url: string) {
    return await supabase
        .from('Blog')
        .select("*")
        .eq("url", url);
}

export async function fetchBlogMdx(blog: Blog) {
    return await supabase
        .storage
        .from('mdx-bucket')
        .download('blogs/' + blog.url + "/" + blog.src);
}

export async function incrementBlogView(blogId: number | undefined) {
    if (blogId === undefined || blogId === null) {
        return;
    }

    const { error } = await supabase.rpc('increment_view_count', {
        post_id: blogId,
    });

    if (error) {
        console.log("Failed to increment view count: ", error);
    }
}

export async function incrementBlogLike(blogId: number | undefined) {
    if (blogId === undefined || blogId === null) {
        return;
    }

    const { error } = await supabase.rpc('increment_like_count', {
        post_id: blogId,
    });

    if (error) {
        console.log("Failed to increment like count: ", error);
    }
}

export async function incrementBlogShare(blogId: number | undefined) {
    if (blogId === undefined || blogId === null) {
        return;
    }

    const { error } = await supabase.rpc('increment_share_count', {
        post_id: blogId,
    });

    if (error) {
        console.log("Failed to increment share count: ", error);
    }
}

export async function fetchBlogAvatar(blog: Blog) {
    return await supabase
        .storage
        .from('mdx-bucket')
        .getPublicUrl('blogs/' + blog.url + "/" + blog.avatar);
}

/**
 * Get all projects for the /projects page
 * @returns All Projects
 */
export async function fetchProjects() {
    return await supabase
        .from('Project')
        .select("*");
}

export async function fetchProjectFromUrl(url: string) {
    return await supabase
        .from('Project')
        .select("*")
        .eq("url", url);
}

export async function fetchProjectMdx(project: Project) {
    return await supabase
        .storage
        .from('mdx-bucket')
        .download('projects/' + project.url + "/" + project.src);
}

export async function fetchProjectAvatar(project: Project) {
    return await supabase
        .storage
        .from('mdx-bucket')
        .getPublicUrl('projects/' + project.url + "/" + project.avatar);
}

export async function fetchImage(url: string, imgSrc: string) {
    return await supabase
        .storage
        .from('mdx-bucket')
        .getPublicUrl(url + "/" + imgSrc);
}

export async function fetchSeriesFromId(id: number) {
    return await supabase
        .from('Series')
        .select("*")
        .eq("id", id);
}

export async function fetchSeriesAvatar(series: Series) {
    return await supabase
        .storage
        .from('mdx-bucket')
        .getPublicUrl('series/' + series.avatar);
}