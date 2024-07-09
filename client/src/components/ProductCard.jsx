import React from 'react';
import FilmCard from './FilmCard';

const ProductCard = ({ films }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-5xl gap-6 mx-auto place-items-center">
      {Array.isArray(films) && films.map(film => (
        <FilmCard key={film._id} film={film} />
      ))}
    </div>
  );
};

export default ProductCard