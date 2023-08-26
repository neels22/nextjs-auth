"use client"

import Link from "next/link"

import React ,{useEffect} from "react"

import { useRouter } from "next/navigation"

import axios from "axios"
import { sign } from "crypto"




export default function Loginpage()
{
    const router = useRouter()
    const [buttondisabled,setbuttondisabled] = React.useState(false);

    const [loading,setloading] = React.useState(false);

    const [user, setUser] = React.useState({
        email:"",
        password:"",

    })

    const onLogin =async () => {

        try {

            setloading(true);
            const response = await axios.post("/api/users/login",user);

            console.log("login success",response.data);
            // toast.success("login success") ;

            router.push("/profile");
            
        } catch (error:any) {
            
            console.log("login failed",error.message);

             
            // toast.error(error.message)


        }finally{
            setloading(false);
        }


        
    }


  useEffect(()=>{

        if(user.email.length > 0 && user.password.length >0)
        {
            setbuttondisabled(false);
        }else{
            setbuttondisabled(true);
        }

    },[user]);





    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>
                {loading?"processing":"login"}
            </h1>
            <hr/>

          

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
               onClick={onLogin}
               className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
               >{buttondisabled?"no login":"login here"}</button>

               <Link href="/signup">visit Signup page</Link>

                    

        </div>
    )
}