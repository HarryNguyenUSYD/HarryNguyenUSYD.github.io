"use client";

import { create } from 'zustand'
import { Blog } from '../supabase/tables'

type BlogData = {
    blog: Blog | null
    setBlog: (data: Blog) => void
}

export const useBlogData = create<BlogData>((set) => ({
    blog: null,
    setBlog: (data) => set({ blog: data }),
}))