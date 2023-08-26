

import mongoose from "mongoose";

const userschema =new mongoose.Schema({
    username:{
        type:String,
        required : [true,"please provide username"],
        unique:true
    },
    email:{
        type:String,
        required : [true,"please provide email"],
        unique:true

    },
    password:{
        type:String,
        required:[true,"please provide password"]

    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },

    forgotpasswordtoken:String,
    forgotpasswordtokenexpiry : Date,
    verifytoken : String,
    verifytokenexpiry:Date


})

const User = mongoose.models.users || mongoose.model("users",userschema);

export default User;



///