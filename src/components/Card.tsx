/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowDownCircleIcon,ArrowUpCircleIcon} from '@heroicons/react/16/solid'
import React, { useEffect, useState } from 'react'


type props = {
    id:string
}

const Card = ({id}:props) => {
    const [isLoading, setisLoading] = useState(false)
    const [data, setdata] = useState(null);
    useEffect(()=>{
        async function getData(){
            setisLoading(true)
            try {
                const res = await fetch(`http://localhost:3000/api/transactions/userbalance/${id}`);
                const data = await res.json();
                setdata(data.TotalAmount)
                setisLoading(false);
            } catch (error:any) {
                console.log(error)
            }
        }
        getData();
    },[])

    if(isLoading) return "Loading"
  return (
    <div className=' pt-5 flex p-3'>
        <div className='w-full h-max border-2 p-5 rounded-lg flex flex-col gap-6 '>
            <section className='flex flex-col items-center gap-1'>
                    <p className='text-[1rem] font-semibold'>Account Balance</p>
                    <p className='text-[17px]'>&#x20b9; {data}</p>
            </section>
            <section className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                    <ArrowUpCircleIcon height={20} width={20} color='red'/>
                    <span>25000</span>
                </div>
                <div className='flex items-center gap-1'>
                    <ArrowDownCircleIcon height={20} width={20} color='green'/>
                    <span>25000</span>
                </div>
            </section>
        </div>
    </div>
  )
}

export default Card
