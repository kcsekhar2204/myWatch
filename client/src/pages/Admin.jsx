import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Link } from "react-router-dom";
import DeleteFilmModal, { deleteModal } from '../components/DeleteFilmModal';
import Wave from '../components/WaveLoader';

const Admin = () => {

    const [films, setFilms] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);

        axios
            .get('http://localhost:3000/film')
            .then((res) => {
                setFilms(res.data.data);
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                alert('An error happened. Check console');
            })
    }, [])

    return (
        <>
            <div className='px-4 py-8 max-w-7xl bg-gray-500 mx-auto'>
                <div className='overflow-x-auto'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>
                                    <Link to="/admin/film/add"
                                        className='bg-green-600 hover:bg-green-900 py-2 px-4 font-medium rounded-lg 
                                  shadow-md text-base-100'>
                                        Add Movie/Series +
                                    </Link>
                                </th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Country</th>
                                <th>Language</th>
                            </tr>
                        </thead>

                        <tbody>
                            {films.map((film, index) => (
                                <tr key={film._id} className='bg-base-100 hover:bg-base-300'>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={film.image} alt={film.title} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-3 px-5'>{film.title}</td>
                                    <td className='py-3 px-5 capitalize'>{film.type}</td>
                                    <td className='py-3 px-5'>{film.country}</td>
                                    <td className='py-3 px-5'>{film.language}</td>
                                    <td className='py-3 px-5'>
                                        <div className='flex justify-center gap-x-1'>
                                            <Link to={`/admin/film/edit/${film._id}`} className='bg-orange-500 hover:bg-orange-900
                     text-white py-2 px-4 font-medium rounded-l-lg text-sm'>Edit</Link>

                                            <div onClick={() => deleteModal(film._id)} className='bg-red-500 hover:bg-red-900
                     text-white py-2 px-4 font-medium rounded-r-lg text-sm cursor-pointer'>Delete</div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {loading && <Wave />}
                </div>
            </div>
            <DeleteFilmModal films={films} setFilms={setFilms}/>
        </>

    )
}

export default Admin