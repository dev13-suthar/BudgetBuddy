import { useEffect, useState } from 'react'

type props = {
    id:string | number | any
}

const useGetIncome = ({id}:props) => {
    const [amount, setamount] = useState(null);
    const [isLoading, setisLoading] = useState(false)
    useEffect(()=>{
        async function getExpens(){
            setisLoading(true)
            const res = await fetch(`/api/transactions/getincome/${id}`);
            const data = await res.json();
            setamount(data.amount)
            setisLoading(false);
        }
        getExpens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    {amount,isLoading}
  )
}

export default useGetIncome
