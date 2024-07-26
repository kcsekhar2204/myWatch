import React, { useEffect, useState } from 'react'

const SearchDropdown = ({ id, value = "", onSelect, allOptions, checkAbbrevation = false }) => {

    const [search, setSearch] = useState("")
    const [options, setOptions] = useState(allOptions)

    useEffect(() => { setSearch(value) }, [value])
    useEffect(() => { setOptions(allOptions) }, [allOptions])

    const handleSearch = (q) => {
        let regexPattern = q
        setSearch(q)

        if (checkAbbrevation)
            regexPattern = q.replace(/(\w(?=\w))/g, '$1\\w*\\s*');

        const regex = new RegExp(regexPattern, 'i')

        setOptions(allOptions.filter(option => regex.test(option)))
    }

    const onBlur = () => {
        setTimeout(function () {
            if (search !== value)
                setSearch(value)
        }, 100)
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
                {options.length > 0 ?
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
