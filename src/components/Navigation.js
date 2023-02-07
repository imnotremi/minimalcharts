import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className='w-[70%] md:w-[40%] hover:scale-[103%] ease-in duration-100 md:mt-24 mt-28 flex justify-around align-middle shadow-2xl  rounded-2xl'>
    
        <NavLink 
            to="/" 
            end
            className={({isActive}) => {
            return   `w-full text-base text-center font-nunito m-2.5
            
            ${isActive ? 'border-2 border-gray-200 text-black rounded-2xl capitalize font-semibold ' : 'text-black hover:text-black  active:text-black border-0 cursor-pointer rounded-2xl capitalize font-semibold'}`}}

        >
            Crypto
        </NavLink> 

        <NavLink 
            to="/trending" 
            className={({isActive}) => {
            return   `w-full text-base text-center font-nunito m-2.5 
            
            ${isActive ? 'border-2 border-gray-200 text-black rounded-2xl capitalize font-semibold ' : ' text-black hover:text-black  active:text-black border-0 cursor-pointer rounded-2xl capitalize font-semibold'}`}}

        >
            Trending
        </NavLink> 

        <NavLink 
            to="Saved" 
            className={({isActive}) => {
            return   `w-full text-base text-center font-nunito m-2.5
            
            ${isActive ? 'border-2 border-gray-200 text-black rounded-2xl capitalize font-semibold' : ' text-black hover:text-black  active:text-black border-0 cursor-pointer rounded-2xl capitalize font-semibold'}`}}

        >
            Saved
        </NavLink> 
        
    </nav>
  )
}

export default Navigation