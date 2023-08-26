"use client"

import Link from "next/link"

import React, { useEffect, useState } from "react"

import { useRouter } from "next/navigation"

import axios from "axios"
import { sign } from "crypto"




export default function Signuppage()
{
    const router = useRouter()



    const [user, setUser] = React.useState({
        email:"",
        password:"",
        username:"",
    })


  


    useEffect(()=>{

        if(user.email.length > 0 && user.password.length >0 && user.username.length >0)
        {
            setbuttondisabled(false);
        }else{
            setbuttondisabled(true);
        }

    },[user]);


    const [buttondisabled,setbuttondisabled] = React.useState(false);

    const [loading,setloading] = React.useState(false);



    const onsignup =async () => {
        try {

            setloading(true);
            const response = await axios.post("/api/users/signup",user);
            console.log("signup success",response.data);

            router.push("/login");
            
        } catch (error:any) {
            
            console.log("signup failed",error.message);

             
            toast.error(error.message)


        }finally{
            setloading(false);
        }
        
    }








    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>
                {loading?"Processing":"Signup"}
            </h1>
            <hr/>

            <label htmlFor="username" >username</label>
            <input 
                className="p-2 text-black"
                type="text" 
                id="username"
                value={user.username}
                onChange={(e)=> setUser({...user,username:e.target.value}) }
                placeholder="username"
                 />

    <label htmlFor="email" >email</label>
                <input 
                    className="p-2 text-black"
                    type="text" 
                    id="email"
                    value={user.email}
                    onChange={(e)=> setUser({...user,email:e.target.value}) }
                    placeholder="email"
                    />

    <label htmlFor="password" >password</label>
                <input 
                    className="p-2 text-black"
                    type="password" 
                    id="password"
                    value={user.password}
                    onChange={(e)=> setUser({...user,password:e.target.value}) }
                    placeholder="password"
                    />

               <button 
               onClick={onsignup}
               className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
               >{buttondisabled?"No signup":"sign up here"}</button>

               <Link href="/login">visit login page</Link>

                    

        </div>
    )
}