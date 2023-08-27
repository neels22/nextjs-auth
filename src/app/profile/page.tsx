"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react";



export default function Profilepage()
{

    const router = useRouter();


    const [data,setdata] = useState("nothing")

    const getuesrdetails = async () => {
        const res= await axios.get('/api/users/me')
        console.log(res.data);
        setdata(res.data.data._id)
    }
 

    const logout = async ()=> {

        try {

            await axios.get('/api/users/logout');

            router.push('/login');
            

            


            
        } catch (error:any) {
            console.log(error.message)

            
        }

    }







    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>profile</h1>
            <hr/>
            <p className="text-4xl">profile page</p>
            <h2 className="p-2 rounded bg-green-200 text-black">{data==="nothing" ? "Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr/>

            <button onClick={logout} className="bg-blue-400 mt-4 text-white font-bold py-2 px-2 rounded hover:bg-blue-700">
                logout
            </button>
            <button onClick={getuesrdetails} className="bg-purple-800 mt-4 text-white font-bold py-2 px-2 rounded hover:bg-blue-700">
                get user details
            </button>
        </div>
    )
}


/// this is the main page