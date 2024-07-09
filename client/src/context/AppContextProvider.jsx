import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { MyListProvider } from './MyListContext';

const tags = [
    ThemeProvider,
    MyListProvider
]

const AppContextProvider = ({ children }) => {

    let element = children
    tags.forEach(TagComponent => {
        element = <TagComponent>{element}</TagComponent>
    })

    return (
        <>{element}</>
    );
};

export default AppContextProvider;
