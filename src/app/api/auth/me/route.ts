import { Connect } from "@/DBconfig/DbConfig";
import { getDataFromToken } from "@/lib/getDataFromToken";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

Connect();
export async function GET(req:NextRequest){
    try {
        const userId = await getDataFromToken(req);
        const user = await User.findById(userId).select("-password -v");
        if(!user){
            return NextResponse.json({err:"Cannot Find User"},{status:404})
        }
        return NextResponse.json(user,{status:200})
    } catch (error:any) {
        return NextResponse.json({err:"Cannot get UserData"},{status:404})
    }
}
Connect()