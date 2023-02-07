import React, {useState} from 'react'
import { useRef } from 'react'
import { useContext } from 'react'
import paginationArrow from "../assets/pagination-arrow.svg"
import { CryptoContext } from '../context/CryptoContext'
import submitIcon from "../assets/submit-icon.svg"

const PerPage = () => {

        const {setPerPage} = useContext(CryptoContext)
        const inputRef = useRef(null)

        const handleSubmit = (e) => {
            e.preventDefault();
            let val = inputRef.current.value
            if (val !== 0) {
                setPerPage(val)  
                inputRef.current.value = val
            }
        }

    return (
        <form onSubmit={handleSubmit} action="" className="relative flex items-center font-nunito mr-12">
          <label htmlFor="perpage" className='text-black relative flex justify-center items-center mr-2 font-bold'>per page:{""}</label>
            <input ref={inputRef} type="number" min={1} max={250} placeholder='10' className='w-16 rounded-2xl bg-gray-50 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-black leading-4'/>
            <button type="submit" className='ml-1 cursor-pointer'>
              <img src={submitIcon} alt="submit" className='w-full h-auto'/>
            </button>
          </form>
    )
}

const Pagination = () => {

    let {perPage, page, setPage, totalPages, cryptoData } = useContext(CryptoContext)

    const TotalNumber = Math.ceil(totalPages/perPage)

    const next = () => {
        if (setPage === TotalNumber){
            return null
        }else {
            setPage(page + 1)
        }
    }

    const previous = () => {
        if (page === TotalNumber){
            return null
        }else {
            setPage(page - 1)
        }
    }

    const multiStepNext = () => {
        if (page+3 >= TotalNumber){
            setPage(TotalNumber - 1)
        }else {
            setPage(page+3)
        }
    }

    const multiStepPrevious = () => {
        if (page - 3 <= 1){
            setPage(TotalNumber + 1)
        }else {
            setPage(page - 2)
        }
    }

    if(cryptoData && cryptoData.length >= perPage) {

        return (
            <div className='flex items-center'>
            <PerPage />
                <ul className='flex items-center justify-end text-sm'>
                    <li className='flex items-center'> 
        
                        <button onClick={previous} className='outline-0 hover:text-black w-8'>
                            <img className='w-full h-auto rotate-180' src={paginationArrow} alt="left" />
                        </button>
        
                    </li>
        
                    {
                        ( page+1 === TotalNumber  || page === TotalNumber) ? <li><button  onClick={multiStepPrevious} className='text-black outline-0 hover:text-gray-50 rounded-full w-8 h-8 flex items-center justify-center text-lg'>...</button></li>
                        : null
                    }
        
                    {
                        (page-1 !== 0) ?  
                        <li><button onClick={previous} className="outline-0 hover:text-gray-50 rounded-full w-8 h-8 flex items-center justify-center bg-gray-100 mx-1.5">{page-1}</button> </li>
                        : null
                    }
        
                    <li><button className="disabled outline-0 rounded-full w-8 h-8 flex items-center justify-center bg-black text-white mx-1.5">{page}</button> </li>
        
                    {
                        (page+1 !== TotalNumber && page !== TotalNumber) ? 
                        <li><button onClick={next} className="outline-0 hover:text-gray-50 rounded-full w-8 h-8 flex items-center justify-center bg-gray-100 mx-1.5">{page+1}</button> </li>
                        : null
                    }
        
                    
                    {
                        page+1 !== TotalNumber && page !== TotalNumber ? <li><button  onClick={multiStepNext} className='outline-0 hover:text-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-lg text-black'>...</button></li>
                        : null
                    }
                    
                    {
                        page !== TotalNumber ? <li><button onClick={() => setPage(TotalNumber)} className="outline-0 hover:text-gray-50 rounded-full w-8 h-8 flex items-center justify-center bg-gray-100 mx-1.5">{TotalNumber}</button></li>
                        : null
                    }    
                    
                    
                    <li>
                        <button onClick={next} className='outline-0 hover:text-gray-50 w-8'>
                            <img className='w-full h-auto' src={paginationArrow} alt="right" />
                        </button>
                    </li>
                </ul>
            </div>
            )

    }else {
        return null
    }

}

export default Pagination