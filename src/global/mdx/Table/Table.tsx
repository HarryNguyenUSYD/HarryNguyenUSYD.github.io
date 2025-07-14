"use client";

export default function Table({
    id,
    columns,
    content,
    alt
} : {
    id: string,
    columns: string[],
    content: string[][],
    alt?: string
}) {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-5">
            <div className="w-full overflow-x-auto">
                <table className="w-auto text-sm lg:text-xl">
                    <thead className="bg-gray-950">
                        <tr>
                            {columns.map((col, i) => (<th key={id + "_head_" + i} className="border border-gray-500 px-4 py-2">{col}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                        {content.map((row, i) => (
                            <tr key={id + "_row_" + i} className="bg-gray-900">
                                {row.map((cell, j) => (<th key={id + "_cell_" + i + "_" + j} className="border border-gray-500 px-4 py-2">{cell}</th>))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {alt && <p className='text-sm lg:text-xl italic font-thin text-center'>{alt}</p>}
        </div>
    )
}