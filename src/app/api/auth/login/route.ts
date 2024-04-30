import { Connect } from "@/DBconfig/DbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/models/User";
Connect();

export async function POST(req:NextRequest){
        try {
            const {email,password} = await req.json();
            if(!email && !password){
                throw new Error("Provide Email and Password")
            }
            // Find User By Email;
            const foundUser = await User.findOne({email:email});
            if(!foundUser){
                return NextResponse.json({msg:"Cannot Find User"},{status:404});
            }

            // Check For Password Match;
            const isMatch = await bcrypt.compare(password,foundUser.password);
            if(!isMatch){
                return NextResponse.json({message:"InCorrect Password"},{status:401})
            }

            const tokenData = {
                id:foundUser._id,
                email:foundUser.email
            };

            // Creating TOken
            const token = jwt.sign(tokenData,process.env.SUPERSECRET!,{expiresIn:"1d"});
            const response = NextResponse.json({
                message:"Login Success",
            },{status:200});
            response.cookies.set("token",token,{
                httpOnly:true
            }); 
            return response;
        } catch (error:any) {
            return NextResponse.json({error:`Error ${error.message}`},{status:400})
        }
}