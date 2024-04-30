import Footer from '@/components/Footer'

import SpendMoneyForm from '@/components/SpendMoneyForm'
import React, { Suspense } from 'react'

const SpendMoney = () => {
  return (
    <main className='pt-4 pb-2 h-full bg-red-400'>
        <header className='flex items-center justify-center relative'>
            <span className='absolute left-3'>&larr;</span>
            <span className='text-white font-semibold text-2xl'>Expense</span>
        </header>
       <Suspense fallback={"Loadinggg."}>
        <SpendMoneyForm/>
       </Suspense>
       <Footer/>
    </main>
  )
}

export default SpendMoney
