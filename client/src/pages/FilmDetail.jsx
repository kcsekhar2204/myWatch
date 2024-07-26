import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DetailsLayout from '../components/DetailsLayout'

const FilmDetail = () => {
    const { title } = useParams()
    const [filmData, setFilmData] = useState([])
    const [pageLoading, setPageLoading] = useState(false)

    useEffect(() => {
        setPageLoading(true);
        axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/film/title/${title}`)
            .then((res) => {
                const response = res.data
                let data = {
                    image: response.image,
                    title: response.title,
                    profile: [
                        {title: response.title},
                        {country: response.country},
                        {language: response.language}
                    ]
                } 
                setFilmData(data)
                setPageLoading(false);
            })
            .catch((error) => {
                setPageLoading(false);
                console.log(error);
                alert('An error happened. Check console');
            });
    }, [title]);


    return (
        <DetailsLayout Ads={<>Yoo mama</>} pageLoading={pageLoading} cast={[]} data={filmData} />
    )
}

export default FilmDetail
