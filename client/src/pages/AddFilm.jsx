import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Wave from '../components/WaveLoader';
import SearchDropdown from '../components/SearchDropdown';
import { config, countries, languages } from '../utils/constants';

const AddFilm = () => {

  const [filmData, setFilmData] = useState({
    title: "",
    type: "",
    // image: "",
    language: "",
    country: ""
  })

  const [img, setImg] = useState(null);

  const [imgPreview, setImgPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImg(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImgPreview(null);
    }
  };



  const uploadFile = async () => {
    if (!img) {
      enqueueSnackbar('No image selected', { variant: 'warning' });
      return;
    }

    const data = new FormData();
    data.append('file', img);

    try {
      const uploadUrl = (`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/upload-image`);
      const res = await axios.post(uploadUrl, data);

      const { secure_url } = res.data;
      console.log('Uploaded image url: ', secure_url);
      enqueueSnackbar('Image uploaded successfully', { variant: 'success' });
      return secure_url;
    } catch (error) {
      console.error('Upload error', error);
      enqueueSnackbar('Failed to upload an image', { variant: 'error' });
    }
  };


  const handleSaveFilm = async () => {
    if (!filmData.title || !filmData.type || !img) {
      enqueueSnackbar('Please fill all required fields', { variant: 'warning' });
      return;
    }

    setLoading(true);

    try {
      const uploadedImageUrl = await uploadFile();
      if (!uploadedImageUrl) {
        throw new Error('Image upload failed');
      }

      await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/film`, { ...filmData, image: uploadedImageUrl }, config);

      enqueueSnackbar('Film saved successfully', { variant: 'success' });
      navigate('/admin');
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar('Error saving film: ' + (error.response?.data?.message || error.message), { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='p-6 bg-base-100 flex justify-center items-center'>
      <div className='container max-w-lg shadow-lg rounded-lg p-5 bg-base-100'>
        <Link to="/admin" className='flex justify-center items-center
        btn mb-4 w-12 py-2 px-4 text-sm rounded-xl'>Back</Link>
        <h1 className='text-3xl font-semibold my-4'>Add Film</h1>
        <div className='my-4'>
          <label htmlFor="title" className='block text-md  mb-2'>Title</label>
          <input
            id="title"
            type="text"
            value={filmData?.title}
            onChange={(e) => setFilmData({ ...filmData, title: e.target.value })}
            className='border border-base-300 px-4 py-2 w-full rounded-md'
          />

          <label htmlFor="type" className='block text-lg  mb-2 mt-4'>
            AV Media
          </label>
          <select
            id="type"
            value={filmData?.type || ""}
            onChange={(e) => setFilmData({ ...filmData, type: e.target.value })}
            className='w-full border border-base-300 px-4 py-2 rounded-md'
            required
          >
            <option value="" disabled hidden>Select Type of content</option>
            <option value="series">TV Series</option>
            <option value="movie">Movie</option>
          </select>

          <label htmlFor='country' className='block text-md  mb-2'>Production Country </label>
          <SearchDropdown
            id='country'
            value={filmData?.country}
            onSelect={(e) => setFilmData({ ...filmData, country: e })}
            allOptions={countries}
            checkAbbrevation={true}
          />

          <label htmlFor='language' className='block text-md  mb-2'>Primary Language </label>
          <SearchDropdown
            id='language'
            value={filmData?.language}
            onSelect={(e) => setFilmData({ ...filmData, language: e })}
            allOptions={languages}
          />

          <label htmlFor='image' className='block text-lg  mb-2'>Upload Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className='w-full border border-base-300 px-4 py-2 rounded-md'
            required
          />


          {imgPreview && (
            <div className='my-4'> 
              <img src={imgPreview} alt="Preview" className='max-w-full h-auto' />
            </div>
            // h-80 w-56
          )} 



          <button
            onClick={handleSaveFilm}
            className={`w-full bg-green-500 ${loading ? "disable !bg-green-800" : ""}
              hover:bg-green-800 text-white py-2 px-4 rounded-md mt-4`}>
            {loading ? <Wave size="small" /> : "Save"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddFilm