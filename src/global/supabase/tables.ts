export type Blog = {
    id: number,
    title: string,
    desc?: string,
    date: string,
    src: string,
    url: string,
    tags: string[],
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