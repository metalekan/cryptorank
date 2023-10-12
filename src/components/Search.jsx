import debounce from 'lodash.debounce'
import React, { useContext, useState } from 'react'
import searchIcon from '../assets/search-icon.svg'
import { CryptoContext } from '../context/CryptoContext'

const SearchInput = ({ handleSearch }) => {
    const [searchText, setSearchText] = useState('')
    const { searchData, setCoinSearch, setSearchData } = useContext(CryptoContext)

    let handleInput = (e) => {
        e.preventDefault();
        let query = e.target.value;
        setSearchText(query);
        handleSearch(query);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchText);
    }

    const selectCoin = (coin) => {
        setCoinSearch(coin);
        setSearchText("");
        setSearchData();
    }

    return (
        <>
            <form className='mx-2 md:w-96 relative flex items-center font-nunito' onSubmit={handleSubmit}>
                <input
                    className='w-full rounded bg-gray-200 placeholder:text-gray-100 pl-2 py-2 required outline-0 border border-transparent focus:border-cyan'
                    type="text"
                    name="search"
                    placeholder='search here...'
                    value={searchText}
                    onChange={handleInput}
                />
                <button className='absolute right-1 cursor-pointer' type='submit'>
                    <img
                        className='w-full h-auto'
                        src={searchIcon}
                        alt="search"
                    />
                </button>
            </form>
            {
                searchText.length > 0 ?
                    <ul className='absolute top-13 right-0 md:left-5 min-w-[50%] md:w-96 h-[40vh] rounded overflow-x-auto py-2 bg-gray-200 bg-opacity-60 backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200 z-10'>
                        {
                            searchData ? searchData.map((coin, index) => (
                                <li
                                    key={index}
                                    className='flex items-center ml-4 my-2 cursor-pointer'
                                    onClick={() => selectCoin(coin.id)}
                                >
                                    <img className='w-[1rem] h-[1rem] mx-1.5' src={coin.thumb} alt={coin.name} />
                                    <span>{coin.name}</span>
                                </li>
                            )) : 
                            <div className='w-full h-full flex items-center justify-center'>
                                <div className='w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin'
                                    role='status'
                                />
                                <span className='ml-3'>Searching...</span>
                            </div>
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