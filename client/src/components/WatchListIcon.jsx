import React from 'react'
import { WatchlistIcon } from '../../public/watchlist'
import { Link, useNavigate } from 'react-router-dom'
import { useMyList } from '../context/MyListContext'

const WatchListIcon = () => {

    const {myList} = useMyList()
    const navigate = useNavigate()

    return (
        <div>
            <div className="dropdown dropdown-end">
                <div 
                    tabIndex={0} 
                    role="button" 
                    className="btn btn-ghost btn-circle" 
                    onClick={() => {if(myList.length === 0)navigate('/watchlist')}}
                >
                    <div className="indicator">
                        <div className='h-7 w-7 text-base-content'>
                            <WatchlistIcon />
                        </div>
                        <span className="badge badge-sm indicator-item">{myList.length}</span>
                    </div>
                </div>
                {myList.length > 0 && <div
                    tabIndex={0}
                    className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                    <div className="card-body">
                        <span className="text-lg font-bold">{myList.length} films</span>
                        <span className="text-info">Let's grab some popcorn</span>
                        <div className="card-actions">
                            <Link to="/watchlist" className="btn btn-primary btn-block">View List</Link>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default WatchListIcon
