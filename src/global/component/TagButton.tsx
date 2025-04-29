import { useSearchParams } from "next/navigation";

/**
 * Returns a TagButton object that redirects to the search page when clicked
 * @param tag The PostTag object that defines the tag type
 * @returns The TagButton object
 */
export default function TagButton({ tag } : { tag: PostTag }) {
    const searchParams = useSearchParams();

    function handleOnSelect (value: string) {
        const params = new URLSearchParams(searchParams)
        params.set('tag', value);

        window.location.href = `/blogs?${params.toString()}`;
    }

    return (
        <button onClick={() => handleOnSelect(tag.name)} className={`py-1 px-5 ${tag.bgColor} cursor-pointer`}>
            <p>{tag.name}</p>
        </button>
    )
}

/**
 * Defines the PostTag object type
 */
export interface PostTag {
    name: string,
    bgColor: string
}

/**
 * Defines the list of possible PostTags
 */
export const PostTags = {
    Admin: {
        name: "Admin",
        bgColor: "bg-blue-500"
    },
    Devlog: {
        name: "Devlog",
        bgColor: "bg-red-500"
    },
    Guide: {
        name: "Guide",
        bgColor: "bg-green-500"
    },
    SelfPromotion: {
        name: "Self Promotion",
        bgColor: "bg-yellow-500"
    },
    Null: {
        name: "Null",
        bgColor: "bg-gray-700"
    }
} satisfies Record<string, PostTag>

/**
 * Get a TagButton element with name equals the string input
 * @param s the string
 * @returns The TagButton object, or null if it doesn't exist
 */
export function stringToTagButton(s: string, key: string) {
    return <TagButton key={key} tag={Object.values(PostTags).find(tag => tag.name === s) || PostTags.Null} />;
}