import React from 'react'
import { Outlet } from 'react-router'

import Logo from '../components/Logo'
import Navigation from '../components/Navigation'
import { CryptoProvider } from '../context/CryptoContext';
import { TrendingProvider } from '../context/TrendingContext';
import { StorageProvider } from '../context/StorageContext';

const Home = () => {
  return (
    <CryptoProvider>
      <TrendingProvider>
        <StorageProvider
        >
          <main className='w-full min-h-screen flex flex-col first-letter:content-center items-center bg-gray-300 relative text-white font-nunito p-2'>
            <div className="w-screen h-screen bg-gray-300 fixed -z-10" />
            <Logo />
            <Navigation />
            <Outlet />
          </main>
        </StorageProvider>
      </TrendingProvider>
    </CryptoProvider>
  )
}

export default Home