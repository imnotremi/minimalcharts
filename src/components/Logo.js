import React from 'react'
import { Link } from 'react-router-dom'
import logoSvg from "../assets/logo.png"

const Logo = () => {
  return (
    <Link to="/" className=' absolute top-[1.5rem] left-[1.5rem] [text-decoration:none] text-lg text-black flex items-center'>
      <img  className='w-[6%] my-4 mx-3' src={logoSvg} alt="CryptoPic"/>
      <span className="self-end mb-2">Minimal Charts</span>
    </Link>
  )
}

export default Logo