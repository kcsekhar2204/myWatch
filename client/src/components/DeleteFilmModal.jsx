import React, { useState } from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'

let filmId = -1

const DeleteFilmModal = ({films, setFilms}) => {

  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleDeleteProduct = () => {
    setLoading(true);

    axios
      .delete(`http://localhost:3000/film/${filmId}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Product Deleted', { variant: 'success' });

        const indexToRemove = films.findIndex(film => film._id === filmId);
        if (indexToRemove !== -1) {
          const updatedItems = [...films];
          updatedItems.splice(indexToRemove, 1);
          setFilms(updatedItems);
        }
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar(error.message, { variant: 'error' });
        console.log(error);
      })
  }

  return (
    <dialog id="my_modal" className="modal modal-bottom sm:modal-middle">
      <div className='modal-box'>
        <h2 className='text-2xl mb-4 font-semibold '>
          Are You Sure You Want to Delete This Product?
        </h2>
        <form method="dialog" className='sm:inline hidden'>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div className='modal-action'>
          <form method='dialog'>
            <button onClick={handleDeleteProduct} className='btn bg-red-600 hover:bg-red-800'>
              Yes, Delete
            </button>
          </form>
        </div>
      </div>

      <form method='dialog' className="modal-backdrop">
        <button >
          Close
        </button>
      </form>

    </dialog>
  )
}

export default DeleteFilmModal

export const deleteModal = (id) => {
  document.getElementById('my_modal').showModal()
  filmId = id
}
