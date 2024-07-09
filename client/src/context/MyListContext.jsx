import React, { createContext, useContext, useState, useEffect } from "react";

const MyListContext = createContext();

export const useMyList = () => useContext(MyListContext);

export const MyListProvider = ({ children }) => {
    const [myList, setMyList] = useState(() => {
        const localData = localStorage.getItem('myList');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('myList', JSON.stringify(myList));
    }, [myList]);

    const addFilmToList = (item) => {
        setMyList([...myList, item]);
    };

    const removeFilmFromList = (id) => {
        setMyList((prevItems) => {
            return prevItems.filter((item) => item._id !== id);
        });
    };

    const clearList = () => {
        setMyList([])
        localStorage.removeItem('myList');
    }

    return (
        <MyListContext.Provider value={{
            myList,
            addFilmToList,
            removeFilmFromList,
            clearList
        }}>
            {children}
        </MyListContext.Provider>
    );
};