import React from 'react'

const FilmCard = ({ film }) => {
  return (
    <div className="relative group block bg-base-300 h-80 w-56 rounded-3xl shadow-3xl">
      <img
        class="absolute inset-0 object-cover h-full group-hover:opacity-50 rounded-3xl"
        src={film?.image}
        alt={film?.title}
      />
      <div
        class="transition-all transform translate-y-8 opacity-0 
                group-hover:opacity-100 group-hover:translate-y-0
                flex flex-col justify-between p-4 h-full w-full"
      >
        <div className='mt-2 prose'>
          <h2 className="capitalize">{film?.title}</h2>
          <p>{film?.country}, {film?.language}</p>
        </div>
        <div className="grid justify-items-end">
          <button className="btn btn-primary">WatchList</button>
        </div>
      </div>
    </div>
  )
}

export default FilmCard
