import {connect} from "@/dbConfig/dbConfig"

import User from "@/models/userModel"

import { NextRequest,NextResponse } from "next/server"

import bcryptjs from "bcryptjs";

import jwt from "jsonwebtoken";
import path from "path";


connect() //// connect to db

export async function POST(request:NextRequest)
{
    try {
        //// get the data from the body 
        const reqbody = await request.json()

        // 
        const {email,password} = reqbody
        // here we can check if got these 
        console.log(reqbody)

        //// check if user already exist

        const user =  await User.findOne({email})
        //// 

        if(!user){
            return NextResponse.json({error:"user does exist"},{status:400});
        }

        /// hashed password

        const validpassword = await bcryptjs.compare(password,user.password)

        if(!validpassword){
            return NextResponse.json({error:"invalid password"},{status:400})
        }


        /// create token data

        const tokendata ={
            id:user._id,
            username:user.username,
            email:user.email
        }


        const token = await jwt.sign(tokendata,process.env.TOKEN_SECRET!,{expiresIn:"1d"})

        const response = NextResponse.json({
            message:"login successful",
            success:true,

        })

        response.cookies.set("token",token,{httpOnly:true})

        return response;




       


        
    } catch (error:any) {

        return NextResponse.json({error:error.message},{status:500})
        
    }
}