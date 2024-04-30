"use client"

import { IconButton } from '@mui/material'
import { DataUsageRounded, Home} from "@mui/icons-material"
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import React from 'react'
import { useRouter } from 'next/navigation';

const Footer = () => {
    const router = useRouter();
  return (
    <div className="h-12 p-2 flex gap-2 bg-slate-400 justify-between items-center fixed left-0 bottom-0 w-full">
        <IconButton onClick={()=>router.push("/transactions")}>
            <ReceiptLongIcon/>
        </IconButton>
        <IconButton onClick={()=>router.push("/add")} >
            <span>&darr;</span>
        </IconButton>
        <IconButton onClick={()=>router.push("/stats")}>
            <DataUsageRounded/>
        </IconButton>
        <IconButton  onClick={()=>router.push("/pay")}>
            <span>&uarr;</span>
        </IconButton>
        <IconButton onClick={()=>router.push("/home")}>
            <Home />
        </IconButton>
    </div>
  )
}

export default Footer
