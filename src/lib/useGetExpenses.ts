/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
type props = {
    id:String
}

const useGetExpenses = ({id}:props) => {
    const [amount, setamount] = useState(null);
    useEffect(()=>{
        async function getExpens(){
            const res = await fetch(`/api/transactions/getexpense/${id}`);
            const data = await res.json();
            setamount(data.amount)
        }
        getExpens()
    },[])
  return (
    {amount}
  )
}

export default useGetExpenses
