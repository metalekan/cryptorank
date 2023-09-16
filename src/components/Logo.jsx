import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to="/" className='absolute top-[1.5rem] left-[1.5rem] '>
        <span className='text-cyan'>Coinrank</span>
    </Link>
  )
}

export default Logo