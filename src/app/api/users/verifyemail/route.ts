



import {connect} from "@/dbConfig/dbConfig"

import User from "@/models/userModel"

import { NextRequest,NextResponse } from "next/server"



connect()

export async function POST(request:NextRequest) {
    
    try {

        const reqbody = await request.json()
        const {token} = reqbody;
        console.log(token)

        const user = await User.findOne({verifytoken:token,verifytokenexpiry:{$gt:Date.now()}});

        if(!user){
            return NextResponse.json({error:"invalid token"},{status:400});

        }

        console.log(user);

        user.isVerified=true;
        user.verifytoken=undefined;
        user.verifytokenexpiry=undefined;
        await user.save();

        return NextResponse.json({
            message:"email verified successfully",
            success:true
        })

        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }




}