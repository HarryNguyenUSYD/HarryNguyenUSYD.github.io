import { LuSquareArrowOutUpRight } from "react-icons/lu";

interface Reference {
    name: string,
    author?: string,
    date?: string,
    url: string
}

export default function References({
    ref
} : {
    ref: Reference[]
}) {
    return (
        <div className="w-full h-auto mt-5 flex flex-col justify-start items-start gap-4">
            <div className="w-full h-0 border border-[#ffffffaf]"></div>
            <p className="text-xl lg:text-3xl font-bold">Reference(s)</p>
            <div className="w-full h-auto flex flex-col justify-start items-start">
                {ref.map(({name, author, date, url}, i) => (
                    <div key={i} className="w-full h-auto flex flex-row justify-start items-start">
                        <p className="w-12 lg:w-16 flex-none text-sm lg:text-base">{"[" + (i + 1) + "]"}</p>
                        <a
                            className="text-sm lg:text-base w-auto break-all highlight-text inline-flex items-center gap-1"
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>{name + (author !== undefined ? ", " + author : "") + (date !== undefined ? ", " + date : "")}</span>
                            <LuSquareArrowOutUpRight className="text-xs lg:text-sm flex-none" />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}