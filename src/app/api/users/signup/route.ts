

import {connect} from "@/dbConfig/dbConfig"

import User from "@/models/userModel"

import { NextRequest,NextResponse } from "next/server"

import bcryptjs from "bcryptjs";


connect() //// connect to db


export async function POST(request:NextRequest)
{
    try {
        //// get the data from the body 
        const reqbody = await request.json()

        // 
        const {username,email,password} = reqbody
        // here we can check if got these 
        console.log(reqbody)

        //// check if user already exist

        const user =  await User.findOne({email})
        //// 

        if(user){
            return NextResponse.json({error:"user already exist"},{status:400});
        }

        /// hashed password

        const salt = await bcryptjs.genSalt(10)
        const hashedpass = await bcryptjs.hash(password,salt)

        /// saving user in db

        const newUser = new User({
            username,
            email,
            password:hashedpass
        })

        const saveduser = await newUser.save();

        console.log(saveduser)

        return NextResponse.json({
            message:"created user succesfully",
            success:true,
            saveduser
        })

        
    } catch (error:any) {

        return NextResponse.json({error:error.message},{status:500})
        
    }
}

