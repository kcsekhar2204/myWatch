import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const localData = localStorage.getItem('theme');
        return localData ? JSON.parse(localData) : document.documentElement.getAttribute('data-theme');
    });

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme));
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{
            theme,
            setTheme
        }}>
            {children}
        </ThemeContext.Provider>
    );
};