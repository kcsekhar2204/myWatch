import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Films = () => {

  const [filteredFilms, setFilteredFilms] = useState([]);
  const [type, setType] = useState('');
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios
        .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/film`)
        .then((response) => {
            setFilms(response.data.data);
            setFilteredFilms(response.data.data);
        })
        .catch((error) => {
          console.log(error);
      });
  }, []);


  const filterFilms = () => {
    if (!Array.isArray(films)) {
      console.error("Films is not an array:", films);
      return;
    }

    let filtered = [...films];

    if (type !== '') {
      filtered = filtered.filter((film) => film.type === type);
    }

    setFilteredFilms(filtered);
  };

  useEffect(() => {
    filterFilms();
  }, [films, type]);


  return (
    <div className="p-4 max-w-[1300px] mx-auto mt-16">
      
      <div className="filters flex justify-between mb-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Media Type</span>
          </label>

          <select value={type} onChange={(e) => setType(e.target.value)}
                className="focus:outline-none select select-bordered w-full max-w-xs">
            <option value="">All</option>
            <option value="movie">Movie</option>
            <option value="series">TV/Web Series</option>
          </select>

        </div>
      </div>

        <ProductCard films={filteredFilms} />

    </div>
  )
}

export default Films