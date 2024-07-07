import React from 'react'

const FilmCard = ({ film }) => {
  return (
    <div>
      <div className="card bg-base-100 image-full h-80 w-56 shadow-xl">
        <figure>
          <img
            src={film?.image}
            alt={film?.title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{film?.title}</h2>
          <div>
            <p>{film?.country}</p>
            <p>{film?.language}</p>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">WatchList</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default FilmCard
