import React from 'react'
import { Link } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';
import WatchListIcon from './WatchListIcon';

const Navbar = () => {

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = "/";
    }

    return (
        <div className='w-full bg-base-100 opacity-95 fixed top-0 z-[9999]'>
            <div className="navbar max-w-[1200px] mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/films">Films</Link></li>
                        </ul>
                    </div>
                    <a href="/" className="btn btn-ghost text-xl">MovieWiz</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/films">Films</Link></li>
                    </ul>
                </div>

                <div className="navbar-end gap-3 lg:gap-12">
                    {location.pathname.startsWith('/admin') ?
                        <button onClick={logout} className='btn bg-base-100'>Logout</button> :
                        <WatchListIcon />
                    }
                    <ThemeToggleButton />
                </div>

            </div>
        </div>
    )
}

export default Navbar