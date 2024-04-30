"use client"

import Card from "@/components/Card";
import Footer from "@/components/Footer";

import { useGetUserData } from "@/lib/useGetUserData"
import Avatar from "react-avatar";


const Home = () => {
  const {user,isLoading}:any = useGetUserData();
  const userId:string = user._id;

  if(isLoading) return "loaddd"
  return (
    // Header For Profile Picture
    <>
    <main className="py-4 p-1 sm:p-2 md:p-4 flex items-center justify-end bg-sky-100">
        <Avatar name={`${user.userName}`} round size={"40"}/>
    </main>
    {/* Main Account Card */}
    <div className="h-[90vh]">
    <Card id={userId}/>
    </div>
    <Footer/>
    </>
  )
}

export default Home
