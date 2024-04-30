import { Connect } from "@/DBconfig/DbConfig";
import { getDataFromToken } from "@/lib/getDataFromToken";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import {z} from "zod"
import { NextRequest, NextResponse } from "next/server";


// Defining Zod Schema

const addMoneySchema = z.object({
    amount:z.number(),
    description:z.string(),
    type:z.string(),
    merchant:z.string(),
})

Connect();

export async function POST(req:NextRequest){
    try {
        const userId = await getDataFromToken(req);
        const {type,description,amount,merchant} = await req.json();
        const validateData = addMoneySchema.safeParse({type,description,amount,merchant});
        if(!validateData?.success){
            return NextResponse.json({error:validateData.error},{status:411})
        }
        // Check if User Exist
        const foundUser = await User.findById(userId);
        if(!foundUser){
            return NextResponse.json({error:"cannot Find User"},{status:404})
        }
        // Check The Type 
        if(type==="credit"){
            const newTransactions = new Transaction({
                amount:Number(amount),
                type:type,
                description:description,
                userId:userId,
                marchant:merchant
            });
            await newTransactions.save();
            // Updating Users  AMount
            const updatedAmount = foundUser.amount+amount;
            foundUser.amount = updatedAmount;
            foundUser.transactions.push(newTransactions._id);
            await foundUser.save(); //User Saved With Transactions id
            return NextResponse.json({success:true},{status:201})
        }else{
            throw new Error("Cannot credit Money")
        }
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({error:error.message},{status:404})
    }
}