import React from 'react'
import { dashboards } from '../../utils/constants'
import { useNavigate } from 'react-router-dom'

const Admin = () => {

    const navigate = useNavigate()

    const goto = (url) => {
        navigate("/admin"+url)
    }

    return (
        <div className='p-4 mt-8 max-w-5xl grid items-center mx-auto justify-around'>

            <div className='grid sm:grid-cols-2 gap-6 max-w-3xl justify-around'>
                {dashboards.map((item, index) => (
                    <div key={index} className='bg-base-200 rounded-lg shadow-lg p-4 flex flex-col w-80'>
                        <h2 className='text-lg font-bold mb-2'>{item.name}</h2>
                        <img src={item.image} alt={item.name} className='rounded-md mb-4 w-full h-80 object-cover' />
                        <div className='flex items-center justify-end text-md mb-3'>
                            <button onClick={() => goto(item.url)}
                                className='card-action btn btn-primary hover:underline'
                            >Go to Dashboard</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Admin
