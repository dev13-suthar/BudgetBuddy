import { Connect } from "@/DBconfig/DbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
Connect();

export async function GET(req:NextRequest){
    try {
        const pathname = req.nextUrl.pathname;
        const parts = pathname.split('/'); // Split the pathname by '/'
        const id = parts.pop();
        const user = await User.findById(id);
        const TotalAmount = user.amount;
        return NextResponse.json({TotalAmount})
    } catch (error:any) {
            return NextResponse.json({error:error.message})
    }
}
