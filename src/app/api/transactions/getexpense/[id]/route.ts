import { Connect } from "@/DBconfig/DbConfig";
import Transaction from "@/models/Transaction";
import { NextRequest, NextResponse } from "next/server";

Connect();

export async function GET(req:NextRequest){
    try {
        const pathname = req.nextUrl.pathname;
        const parts = pathname.split('/'); // Split the pathname by '/'
        const id = parts.pop();
        const transaction = await Transaction.find({ userId:id, type:'debit'})
        const totalAmount = transaction.reduce((transaction,amount)=>amount+transaction.amount,0);
        return NextResponse.json({totalAmount},{status:200})
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}