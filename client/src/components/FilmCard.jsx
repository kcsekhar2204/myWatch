import React from 'react'
import { useMyList } from '../context/MyListContext'
import TagIcon from '../../public/tag.jsx'

const FilmCard = ({ film }) => {

  const { myList, addFilmToList, removeFilmFromList } = useMyList()

  const itemInList = myList.find(item => item._id === film._id)

  return (
    <div className="relative group block h-80 w-56">
      <img
        className="object-cover h-full group-hover:opacity-50 rounded-3xl shadow-lg shadow-base-content"
        src={film?.image}
        alt={film?.title}
      />
      <div
        className={`absolute top-0 cursor-pointer ${itemInList ? 'text-selected' : 'text-black opacity-80'}`}
        onClick={() => itemInList ? removeFilmFromList(film._id) : addFilmToList(film)}
      >
        <div className='relative h-14 w-10'>
          <TagIcon />
          <div className={`absolute top-3 left-2 ${itemInList ? 'text-black' : 'text-white'}`}>
            {itemInList ?
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg> :
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <rect x="11" y="0" width="2" height="24" fill="currentColor" />
                <rect x="0" y="11" width="24" height="2" fill="currentColor" />
              </svg>
            }
          </div>
        </div>
      </div>
      <div
        className="absolute z-[1] inset-0 transition-all transform translate-y-0 opacity-0 
                group-hover:opacity-100 group-hover:translate-y-8
                flex flex-col justify-between p-4 h-72 w-full"
      >
        <div className='mt-2 prose'>
          <h2 className="capitalize">{film?.title}</h2>
          <p>{film?.country}, {film?.language}</p>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">View</button>
        </div>
      </div>
    </div>
  )
}

export default FilmCard
