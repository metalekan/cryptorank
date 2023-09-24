import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to="/" className='absolute top-[1.5rem] left-[1.5rem] '>
        <span className='text-cyan font-bold text-lg'>Coinrank</span>
    </Link>
  )
}

export default Logo