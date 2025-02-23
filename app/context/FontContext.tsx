'use client'

import { createContext, useContext, useState } from 'react';

interface FontContextType {
    font: string;
    setFont: (font: string ) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
    const [font, setFont] = useState('font-inter-regular');

    return (
        <FontContext.Provider value={{ font, setFont }}>
            <div className={font}>{children}</div>
        </FontContext.Provider>
    );
}

export const useFont = () => {
    const context = useContext(FontContext);
    if (!context) {
        throw new Error('useFont must be used within a FontProvider');
    }
    return context;
};