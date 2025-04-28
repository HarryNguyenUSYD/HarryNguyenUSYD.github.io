"use client";

import { create } from 'zustand'
import { Blog } from '../supabase/tables'
import { persist } from 'zustand/middleware';

type BlogData = {
    blog: Blog | null
    setBlog: (data: Blog) => void
}

export const useBlogData = create<BlogData>()(
    persist(
        (set) => ({
            blog: null,
            setBlog: (data) => set({ blog: data }),
        }),
        {
            name: "blog-data"
        }
    )
)