import React from 'react'
import Search from './Search'

const Filters = () => {
  return (
    <div className='w-full h-12 border-2 border-gray-100 rounded-lg flex items-center justify-between relative'>
        <div className="">
            <Search />
        </div>
        <div className="">
            currency
        </div>
        <div className="">
            sorting
        </div>
    </div>
  )
}

export default Filters