import { Connect } from "@/DBconfig/DbConfig";
import { NextRequest, NextResponse } from "next/server";

import Transaction from "@/models/Transaction";

Connect();

export async function GET(req:NextRequest){
    try {
        const pathname = req.nextUrl.pathname;
        const parts = pathname.split('/'); // Split the pathname by '/'
        const id = parts.pop();
        console.log(id)
        const userId = String(id)
        const transaction = await Transaction.find({userId:userId, type:'credit'});
       const myTOtal =  transaction.reduce((amount,transaction)=>amount+transaction.amount,0);
        // Check For if No Transaction
        // if(!transaction){
        //     return NextResponse.json({message:"Cannot find Any Transaction with Given Id"});
        // }
        // const totalAmount = transaction.reduce((transaction,amount)=>amount+transaction.amount,0);
        return NextResponse.json({amount:Number(myTOtal)},{status:200})
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({error:error.message},{status:404})
    }
}