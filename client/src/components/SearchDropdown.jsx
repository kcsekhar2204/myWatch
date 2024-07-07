import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SearchDropdown = ({ id, value="", onSelect, apiUrl, enqueueSnackbar }) => {

    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState([])

    useEffect(() => {
        setSearch(value)
        !!!options.length && handleSearch(value)
    }, [value])

    const handleSearch = (q) => {
        setSearch(q)
        setLoading(true)

        const queryParams = {
            q: q
        };

        axios
            .get(apiUrl, { params: queryParams })
            .then((res) => {
                setLoading(false)
                setOptions(res.data.data)
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar(error.message, { variant: 'error' });
                console.log(error);
            })
    }

    const onBlur = () => {
        setTimeout(function(){
            if (search !== value)
                setSearch(value)
        } , 100)
    }

    return (
        <div className='dropdown w-full'>
            <input
                id={id}
                tabIndex={0}
                role="button"
                value={search}
                type="text"
                className='w-full border border-base-300 px-4 py-2 rounded-md'
                onChange={(e) => handleSearch(e.target.value)}
                autoComplete='off'
            />
            <ul
                tabIndex={0}
                className='dropdown-content overflow-y-auto z-[1] w-full bg-base-300 max-h-48 p-2 shadow'
                onBlur={onBlur}
            >
                {!!!options && loading ? <li className='w-full px-4 py-4' aria-disabled>
                    <div className='border rounded-md w-32 animate-pulse bg-slate-500 h-2.5 border border-base-300' />
                </li> : options.length > 0 ?
                    <>
                        {options.map((option) => {
                            return (
                                <li
                                    className={`px-4 cursor-pointer py-2 border border-base-300 ${value === option ? 'text-base-100 bg-base-content' : ''}`}
                                    key={option}
                                    onClick={() => {
                                        onSelect(option);
                                        setSearch(option)
                                    }}
                                >
                                    {option}
                                </li>)
                        })}
                    </> : <li className={`px-4 bg-warning text-warning-content`} aria-disabled >Not found (check typo mistakes)...</li>
                }
            </ul>
        </div>
    )
}

export default SearchDropdown
