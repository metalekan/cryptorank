import React, { useContext, useRef } from 'react'
import Search from './Search'

import submitIcon from '../assets/submit-icon.svg';
import {BiRefresh} from 'react-icons/bi';
import { CryptoContext } from '../context/CryptoContext'


const Filters = () => {
  const { setCurrency, setSortBy, resetFunction } = useContext(CryptoContext);
  const currencyRef = useRef(null);

  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    let val = currencyRef.current.value;
    setCurrency(val);
    currencyRef.current.value = "";
  }

  const handleSort = (e) => {
    e.preventDefault();
    let val = e.target.value;
    setSortBy(val);
  }

  return (
    <div className='w-full py-2 border-2 border-gray-100 rounded-lg flex flex-col flex-wrap md:flex-row items-center justify-between relative'>
      <div className="w-full md:w-0">
        <Search />
      </div>
      <div className="flex flex-wrap justify-center md:mr-7 mx-2 py-2 gap-2">
        <form
          className='relative flex items-center font-nunito mr-12'
          onSubmit={handleCurrencySubmit}
        >
          <label className='relative flex items-center mr-2 font-bold' htmlFor="currency">currency: </label>
          <input
            className='w-20 rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan leading-4 py-1' type="text"
            name='currency'
            ref={currencyRef}
            placeholder='usd/ngn'
          />
          <button className='ml-1 cursor-pointer' type='submit'>
            <img className='w-full h-auto' src={submitIcon} alt="submit" />
          </button>
        </form>
        <label className="relative flex justify-center items-center">
          <span className='font-bold mr-2'>sort by:</span>
          <select
            name="sortby"
            className='rounded bg-gray-200 text-base pl-2 pr-10 py-1 leading-4 capitalize focus:outline-0'
            onClick={handleSort}
          >
            <option value="market_cap_desc">market cap desc</option>
            <option value="market_cap_asc">market cap asc</option>
            <option value="volume_desc">volume desc</option>
            <option value="volume_asc">volume asc</option>
            <option value="id_desc">name desc</option>
            <option value="id_desc">name asc</option>
          </select>
        </label>
        <button className='w-[2rem] ml-4 hover:scale-110 transition-all transition-ease relative' onClick={resetFunction} >
          <BiRefresh className='text-cyan text-lg'/>
        </button>
      </div>
    </div>
  )
}

export default Filters