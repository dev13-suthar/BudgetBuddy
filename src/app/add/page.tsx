import AddmoneyForm from '@/components/AddmoneyForm'
import Footer from '@/components/Footer'
import React from 'react'

const Addmoney = () => {
  return (
    <>
    <div className='h-[90vh] bg-slate-100'>
    <div className="bg-green-400 mt-2 h-[100%]">
        <header className="p-4 flex justify-center items-center relative">
            <span className="absolute left-2 text-3xl cursor-pointer">&larr;</span>
            <p className="text-xl text-sky-50 font-normal">Add Money / Income</p>
        </header>
        {/* How Much Money*/}
        <AddmoneyForm/>  
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Addmoney
