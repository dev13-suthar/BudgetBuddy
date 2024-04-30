import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { Connect } from "@/DBconfig/DbConfig";

Connect();

export async function POST(req:NextRequest){
    try {
        const {username,password,email} = await req.json();
        if(!username && !password && !email){
            throw new Error("UserName password and email required")
        }
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password,salt);

        // Create New User;
        const user = await new User({
            email:email,
            password:hashPassword,
            userName:username,
        });
        await user.save();
        return NextResponse.json({success:true},{status:201})
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({err:error.message})
    }
}