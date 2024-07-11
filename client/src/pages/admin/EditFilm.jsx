import { useSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import SearchDropdown from '../../components/SearchDropdown';
import Wave from '../../components/WaveLoader';
import { config, countries, languages } from '../../utils/constants';

const EditFilm = () => {

    const [filmData, setFilmData] = useState({})
    const [pageLoading, setPageLoading] = useState(false);
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setPageLoading(true);
        axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/film/${id}`)
            .then((res) => {
                setFilmData(res.data)
                setPageLoading(false);
            })
            .catch((error) => {
                setPageLoading(false);
                console.log(error);
                alert('An error happened. Check console');
            });
    }, [id]);


    const handleSubmit = () => {
        setLoading(true);
        axios
            .put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/film/${id}`, filmData, config)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Film edited successfully', { variant: 'success' });
                navigate('/admin');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar(error.message, { variant: 'error' });
                console.log(error);
            });
    };

    const handleChange = (field, value) => {
        setFilmData({ ...filmData, [field]: value })
    }

    return (
        <div className='p-6 bg-base-100 flex justify-center items-center'>
            <div className='container max-w-lg shadow-lg rounded-lg p-5 bg-base-200'>
                <Link to="/admin" className='flex justify-center items-center
            btn mb-4 w-12 py-2 px-4 text-sm rounded-xl'>Back</Link>
                <h1 className='text-3xl font-semibold my-4 '>Edit Film Details</h1>
                {pageLoading ? <Wave /> :
                    <div className='my-4'>
                        <label htmlFor="title" className='block text-md mb-2'>Title</label>
                        <input
                            id="title"
                            type="text"
                            value={filmData?.title || ""}
                            onChange={(e) => handleChange("title", e.target.value)}
                            className='border border-base-300 px-4 py-2 w-full rounded-md'
                        />

                        <label htmlFor="type" className='block text-md  mb-2'>
                            AV Media
                        </label>
                        <select
                            id="type"
                            value={filmData?.type || ""}
                            onChange={(e) => handleChange("type", e.target.value)}
                            className='w-full border border-base-300 px-4 py-2 rounded-md'
                            required
                        >
                            {filmData?.type === '' &&
                                <option value="" disabled selected hidden>Select Type of content</option>
                            }
                            <option value="series">TV Series</option>
                            <option value="movie">Movie</option>
                        </select>

                        <label htmlFor='country' className='block text-md  mb-2'>Production Country </label>
                        <SearchDropdown
                            id='country'
                            value={filmData?.country}
                            onSelect={(e) => handleChange("country", e)}
                            allOptions={countries}
                            checkAbbrevation={true}
                        />

                        <label htmlFor='language' className='block text-md  mb-2'>Primary Language </label>
                        <SearchDropdown
                            id='language'
                            value={filmData?.language}
                            onSelect={(e) => handleChange("language", e)}
                            allOptions={languages}
                        />

                        <button
                            onClick={handleSubmit}
                            className={`w-full bg-green-500 ${loading ? "disable !bg-green-800" : ""}
                                hover:bg-green-800 text-white py-2 px-4 rounded-md mt-4`}
                        >
                            {loading ? <Wave size="small" /> : "Save Changes"}
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default EditFilm