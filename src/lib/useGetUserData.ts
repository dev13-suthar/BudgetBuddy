import { useEffect, useState } from "react"

// Type
export type userType = {
    userName:string,
    email:string,
    amount:number,
    createdAt:string,
    updatedAt:string,
    __v:number,
    _id:number,
    transactions:any[]
  }

export  const  useGetUserData = ()=>{
    const [user, setuser] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    useEffect(()=>{
        async function getData(){
            setisLoading(true)
            const res = await fetch("/api/auth/me");
            const data = await res.json();
            setuser(data)
            setisLoading(false)
        }
        getData();
    },[]);
    return {user,isLoading}
} 