interface Reference {
    name: string,
    author?: string,
    date?: string,
    url: string
}

export default function References({
    references
} : {
    references: Reference[]
}) {
    return (
        <div className="w-full h-auto mt-5 flex flex-col justify-start items-start gap-4">
            <div className="w-full h-0 border border-[#ffffffaf]"></div>
            <p className="text-xl lg:text-3xl font-bold">Reference(s)</p>
            <div className="w-full h-auto flex flex-col justify-start items-start">
                {references.map(({name, author, date, url}, i) => (
                    <div key={i} className="w-full h-auto flex flex-row justify-start items-start">
                        <p className="w-12 lg:w-16 flex-none text-sm lg:text-base">{"[" + (i + 1) + "]"}</p>
                        <a
                            className="text-sm lg:text-base w-auto break-all"
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {name + (author !== undefined ? ", " + author : "") + (date !== undefined ? ", " + date : "")}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}