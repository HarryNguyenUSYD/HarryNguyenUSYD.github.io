export interface PostTag {
    name: string,
    bgColor: string
}

export const PostTags = {
    Admin: {
        name: "Admin",
        bgColor: "bg-blue-500"
    },
    DevBlog: {
        name: "Dev Blog",
        bgColor: "bg-red-500"
    },
    Guide: {
        name: "Guide",
        bgColor: "bg-green-500"
    }
} satisfies Record<string, PostTag>