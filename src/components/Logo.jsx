import React from 'react'
import {FaBitcoin} from 'react-icons/fa';
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to="/" className='flex items-center gap-3 absolute top-[1.5rem] left-[1.5rem] '>
        <span className='text-cyan font-bold text-lg md:text-xl'>Coinrank</span>
        <FaBitcoin className='text-cyan text-xl'/>
    </Link>
  )
}

export default Logo