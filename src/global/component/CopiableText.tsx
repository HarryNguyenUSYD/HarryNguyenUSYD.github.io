import React, { createContext, useContext, useState } from "react";

interface CopiableTextType {
    value: boolean;
    setValue: (newValue: boolean) => void;
}

const CopiableTextContext = createContext<CopiableTextType | undefined>(undefined);

export function CopiableTextContextProvider({ children } : { children: React.ReactElement }) {
    const [value, setValue] = useState(false); // initial value

    return (
        <CopiableTextContext.Provider value={{ value, setValue }}>
            {children}
        </CopiableTextContext.Provider>
    );
};

export const useCopiableTextContext = () => {
    const context = useContext(CopiableTextContext);

    if (!context) {
        throw new Error("Invalid useCopiableTextContext call");
    }

    return context;
};

export function CopiedTextNotification() {
    const { value } = useCopiableTextContext();
    
    return (
        <div
            className={`fixed bottom-0 right-0 mr-10 mb-10 ${value ? "opacity-100" : "opacity-0"} duration-200
                px-5 py-2 bg-blue-500 text-white text-3xl
                flex justify-center items-center`}
        >
            <p>Copied to clipboard!</p>
        </div>
    );
}