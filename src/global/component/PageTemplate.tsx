import React from "react";
import Navbar from "./Navbar";
import Background from "./Background";

/**
 * A wrapper that covers the page, used as the highest level of most pages here
 * @param children the children of the element
 * @returns 
 */
export default function PageWrapper({
    children
}: {
    children: React.ReactElement
}) {
    return (
        <div className="w-full h-auto p-10 overflow-x-hidden text-white">
            <Navbar />
            <Background />
            {children}
        </div>
    );
}