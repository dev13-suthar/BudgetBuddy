import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = async(req:NextRequest)=>{
    try {
    const encodedToken = req.cookies.get("token")?.value || "";
    const decodedToken:any = jwt.verify(encodedToken,process.env.SUPERSECRET!);
    return decodedToken.id
    } catch (error) {
        console.log(error)
    }
}