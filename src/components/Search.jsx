import debounce from 'lodash.debounce'
import React, { useContext, useState } from 'react'
import searchIcon from '../assets/search-icon.svg'
import { CryptoContext } from '../context/CryptoContext'

const SearchInput = ({handleSearch}) => {
    const [searchtext, setSearchtext] = useState('')
    const { searchData } = useContext(CryptoContext)

    let handleInput = (e) => {
        e.preventDefault();
        let query = e.target.value;
        setSearchtext(query);
        handleSearch(query);
    }

    return (
        <>
            <form className='w-96 relative flex items-center ml-5 font-nunito'>
                <input
                    className='w-full rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan'
                    type="text"
                    name="search"
                    placeholder='search here...'
                    value={searchtext}
                    onChange={handleInput}
                />
                <button className='absolute right-1 cursor-pointer' type='submit'>
                    <img className='w-full h-auto' src={searchIcon} alt="search" />
                </button>
            </form>
            {
                searchtext.length > 0 ?
                    <ul className='absolute top-11 right-0 w-96 h-96 rounded overflow-x-auto py-2 bg-gray-200 bg-opacity-60 backdrop-blur-md'>
                        {
                            searchData ? searchData.map((coin, index) => (
                                <li key={index} className='flex items-center ml-4 my-2 cursor-pointer'>
                                     <img className='w-[1rem] h-[1rem] mx-1.5' src={coin.thumb} alt={coin.name} />
                                    <span>{coin.name}</span>
                                </li>
                            )) : null
                        }
                    </ul>
                    : null
            }

        </>
    )

}

const Search = () => {
    const { getSearchResult } = useContext(CryptoContext)

    const debounceFunction = debounce(function (val) {
        getSearchResult(val);
    }, 2000)

    return (
        <div className='relative'>
            <SearchInput handleSearch={debounceFunction} />
        </div>
    )
}

export default Search