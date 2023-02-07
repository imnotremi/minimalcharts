import React from 'react'
import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'
import Navigation from '../components/Navigation'
import { CryptoProvider } from '../context/CryptoContext'
import { StorageProvider } from '../context/StorageContext'
import { TrendProvider } from '../context/TrendingContext'

const Home = () => {
  return (
    <CryptoProvider>
    <TrendProvider>
    <StorageProvider>
    <main className=' w-full h-full flex flex-col content-center  items-center relative  text-white font-nunito'>
    <div className='bg-white fixed w-screen h-screen -z-10' />
    <Logo />
    <Navigation />
    
    <Outlet />
    </main>
    </StorageProvider>
    </TrendProvider>
    </CryptoProvider>
  )
}

export default Home