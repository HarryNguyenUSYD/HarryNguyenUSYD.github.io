import { LuSquareArrowOutUpRight } from "react-icons/lu";

export default function Redirect({
    name,
    url
} : {
    name: string,
    url: string
}) {
    return (
        <a
            className="w-auto break-all highlight-text inline-flex items-center gap-1"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
        >
            <span className="text-sm lg:text-2xl">{name}</span>
            <LuSquareArrowOutUpRight className="text-xs lg:text-lg" />
        </a>
    )
}