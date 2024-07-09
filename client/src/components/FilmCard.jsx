import React from 'react'
import { useMyList } from '../context/MyListContext'

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
        className="absolute z-[1] inset-0 transition-all transform translate-y-8 opacity-0 
                group-hover:opacity-100 group-hover:translate-y-0
                flex flex-col justify-between p-4 h-full w-full"
      >
        <div className='mt-2 prose'>
          <h2 className="capitalize">{film?.title}</h2>
          <p>{film?.country}, {film?.language}</p>
        </div>
        {itemInList ? (
          <button className="btn btn-error" onClick={() => removeFilmFromList(film._id)}>
            Remove from WatchList
          </button>
        ) : (
          <button className="btn btn-primary" onClick={() => addFilmToList(film)}>
            Add to WatchList
          </button>
        )}
      </div>
    </div>
  )
}

export default FilmCard
