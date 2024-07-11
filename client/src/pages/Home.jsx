import React, { useEffect, useState } from 'react';
import axios from "axios";
import ProductCard from '../components/ProductCard';

const Home = () => {

    const [filmData, setFilmData] = useState([]);
    const [latestFilms, setLatestFilms] = useState([]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/film`)
            .then((response) => {
                setFilmData(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const handleScreenSizeChange = () => {
            if (window.innerWidth >= 768 && window.innerWidth < 1024) {
                setLatestFilms(filmData.slice(0, 3))
            } else {
                setLatestFilms(filmData.slice(0, 4))
            }
        };

        window.addEventListener('resize', handleScreenSizeChange);

        handleScreenSizeChange();

        return () => {
            window.removeEventListener('resize', handleScreenSizeChange);
        };
    }, []);

    return (
        <div className="p-4 max-w-[1300px] mx-auto my-16">
            <div className="hero-content text-center mb-24">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">
                        Welcome to <span className="text-teal-700">MovieWiz</span>
                    </h1>
                    <p className="py-6">
                        Presenting a diverse array of global movie and series hits.
                    </p>
                    <a href="/films" className="btn btn-accent mt-4">
                        CineQuest
                    </a>
                </div>
            </div>

            <ProductCard films={latestFilms} />

        </div>
    )
}

export default Home