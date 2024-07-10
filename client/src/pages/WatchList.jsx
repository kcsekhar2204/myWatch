import React from 'react';
import { useMyList } from '../context/MyListContext';

const WatchList = () => {
  const { myList, removeFilmFromList, clearList } = useMyList();

  if (myList.length === 0) {
    return <div className='text-base-content text-3xl text-center my-64'>Your cart is empty.</div>;
  }

  return (
    <div className='p-4 mt-16 max-w-[1400px] mx-auto'>
      <h2 className='text-2xl font-semibold text-center my-6'>My WatchList</h2>

      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {myList.map((item, index) => (
          <div key={index} className='bg-base-200 rounded-lg shadow-lg p-4 flex flex-col'>
            <img src={item.image} alt={item.title} className='rounded-md mb-4 w-full h-80 object-cover' />
            <h2 className='text-lg font-bold mb-2'>{item.title}</h2>
            <p className='text-md mb-1 capitalize'>{item.type}</p>
            <div className='flex items-center justify-between text-md mb-3'>
              <p>{item.language}</p>
              <div className='flex items-center'>
                <button onClick={() => removeFilmFromList(item._id)}
                  className=' font-bold hover:underline'
                >Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='text-center mt-8'>
        <p className='text-2xl font-semibold mb-4'>{myList.length+" films to watch later"} </p>
        <button onClick={clearList} className='btn btn-accent'>Clear All</button>
      </div>
    </div>
  )
}

export default WatchList