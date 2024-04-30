import { Connect } from "@/DBconfig/DbConfig";
import { getDataFromToken } from "@/lib/getDataFromToken";
import Category from "@/models/Category";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";

Connect();

const validateSchema = z.object({
    amount:z.number(),
    description:z.string(),
    type:z.string(),
    merchant:z.string(),
    category:z.string(),
})

export async function POST(req:NextRequest){
    const userId = await getDataFromToken(req);
    try {
        const {amount,description,type,merchant,category} = await req.json();
        if(type!=="debit") return NextResponse.json({error:"Cannot debit"},{status:411})
        const validating = validateSchema.safeParse({amount,description,type,merchant,category});
        if(!validating?.success){
            return NextResponse.json({error:"Incorrect Type try again"},{status:411})
        }
        // If Inputs is okay!!!
        const user = await User.findById(userId);
        if(!user){
            return NextResponse.json({msg:"Cannot find User"},{status:404})
        }
        if(user.amount>amount){
                // Create new Category or Check Category;
        let newCategory = await Category.findOne({name:category});
        if(!newCategory){
            newCategory = new Category({
                name:category,
                transactions:[]
            });
            await newCategory.save();
        };
        const newTransaction = new Transaction({
                amount:amount,
                type:type,
                description:description,
                userId:userId,
                category:newCategory._id,
                marchant:merchant
        });
        await newTransaction.save();
        // Pushing Transaction id in Category
        newCategory.transactions.push(newTransaction._id);
        await newCategory.save();
        // Updating Users Amount and his Transactions
        const updatedAmount = user.amount - newTransaction.amount;
        user.amount = updatedAmount;
        user.transactions.push(newTransaction._id);
        await user.save();

        //   Final return for Success
        return NextResponse.json({user,newTransaction},{status:201})
        }else{
            throw new Error("Cannot Debit Money")
        }
        
    } catch (error:any) {
            console.log(error);
            return NextResponse.json({error:error.message},{status:400})
        }
}