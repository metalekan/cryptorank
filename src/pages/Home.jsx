import React from 'react'
import { Outlet } from 'react-router'

import Logo from '../components/Logo'
import Navigation from '../components/Navigation'
import { CryptoProvider } from '../context/CryptoContext';

const Home = () => {
  return (
    <CryptoProvider>
      <main className='w-full min-h-screen flex flex-col first-letter:content-center items-center bg-gray-300 relative text-white font-nunito p-2'>
        <div className="w-screen h-screen bg-gray-300 fixed -z-10" />
        <Logo />
        <Navigation />
        <img className='w-[100px] absolute top-0 right-1' src="https://cdn.pixabay.com/animation/2022/08/22/11/10/11-10-40-348_256.gif" alt="" />
        <Outlet />
      </main>

    </CryptoProvider>
  )
}

export default Home