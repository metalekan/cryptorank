import React, { useContext, useRef, useState } from 'react'
import paginationArrow from '../assets/pagination-arrow.svg';
import submitIcon from '../assets/submit-icon.svg';

import { CryptoContext } from '../context/CryptoContext';

const PerPageElement = () => {
    const inputRef = useRef(null);
    const { setPerPage } = useContext(CryptoContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        let val = inputRef.current.value;
        if (val !== 0) {
            setPerPage(val);
            inputRef.current.value = val;
        }
    }

    return (
        <form
            className='relative flex items-center font-nunito mr-12'
            onSubmit={handleSubmit}
        >
            <label className='relative flex items-center text-sm mr-2 font-bold' htmlFor="perpage">per page: </label>
            <input
                className='w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2 py-1 required outline-0 border border-transparent focus:border-cyan leading-4'
                type="number"
                min={1}
                max={250}
                name='per page'
                ref={inputRef}
                placeholder='20'
            />
            <button className='ml-1 cursor-pointer' type='submit'>
                <img className='w-full h-auto' src={submitIcon} alt="submit" />
            </button>
        </form>
    )
}

const Pagination = () => {
    const { page, setPage, totalPages, perPage, cryptoData } = useContext(CryptoContext);

    const TotalNumber = Math.ceil(totalPages / perPage);
    const next = () => {
        if (page === TotalNumber) {
            return null;
        } else {
            setPage(page + 1)
        }
    }

    const prev = () => {
        if (page === 1) {
            return null;
        } else {
            setPage(page - 1)
        }
    }

    const multiStepNext = () => {
        if (page + 3 >= TotalNumber) {
            setPage(TotalNumber - 1)
        } else {
            setPage(page + 3)
        }
    }

    const multiStepPrev = () => {
        if (page - 3 <= 1) {
            setPage(TotalNumber + 1)
        } else {
            setPage(page - 2)
        }
    }

    if (cryptoData && cryptoData.length >= page) {
        return (
            <div className='w-full flex gap-8 flex-col mt-4 md:mt-0 p-2 bg-opacity- z-50'>
                <span>Data provided by <a className='text-cyan' href="http://coingecko.com" rel='noreferrer' target={'_blank'}>Coingecko</a></span>
                <div className="flex justify-between">
                <PerPageElement />
                <ul className='flex items-center justify-end text-sm'>
                    <li className='flex items-center'>
                        <button className='outline-0 hover:text-cyan w-8' onClick={prev}>
                            <img className='w-full h-auto rotate-180' src={paginationArrow} alt="left" />
                        </button>
                    </li>
                    {
                        (page + 1 === TotalNumber || page === TotalNumber) ?
                            <li className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg'>
                                <button onClick={multiStepPrev}>...</button>
                            </li> : null
                    }
                    {
                        (page - 1 !== 0) ?
                            <li className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5'>
                                <button onClick={prev}>{page - 1}</button>
                            </li> : null
                    }
                    <li className='outline-0 text-gray-300 rounded-full w-8 h-8 flex items-center justify-center bg-cyan mx-1.5'>
                        <button disabled>{page}</button>
                    </li>
                    {
                        (page + 1 !== TotalNumber && page !== TotalNumber) ?
                            <li className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5'>
                                <button onClick={next}>{page + 1}</button>
                            </li> : null
                    }
                    {
                        page + 1 !== TotalNumber && page !== TotalNumber ?
                            <li className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg'>
                                <button onClick={multiStepNext}>...</button>
                            </li> : null
                    }
                    {
                        page !== TotalNumber ?
                            <li className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5'>
                                <button onClick={() => setPage(TotalNumber)}>{TotalNumber}</button>
                            </li> : null
                    }
                    <li>
                        <button><img className='w-full h-auto' src={paginationArrow} alt="right" onClick={next} /></button>
                    </li>
                </ul>

                </div>
            </div>
        )

    } else {
        return null;
    }
}

export default Pagination