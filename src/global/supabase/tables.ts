export type Blog = {
    id: number,
    title: string,
    desc?: string,
    date: string,
    src: string,
    url: string,
    tags: string[],
    seriesId?: number,
    like_count: number,
    view_count: number,
    share_count: number,
    avatar: string
}

export type Project = {
    id: number,
    title: string,
    desc: string,
    date: string,
    src: string,
    url: string,
    avatar: string
}

export type Series = {
    id: number,
    title: string,
    avatar: string
}