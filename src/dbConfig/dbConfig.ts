
import mongoose from 'mongoose'

export async function connect() {
    try {

        mongoose.connect(process.env.MONGO_URI!);

        const connection = mongoose.connection;

        /// listening to events

        connection.on('connected',()=>{
            console.log("mongodb connected succesfully");
        })

        connection.on('error',(err)=>{

            console.log('mongo db error check if its running '+err);
            process.exit(); 

        })

        
    } catch (error) {
        
        console.log("something went wrong ")
        console.log(error)
    }
}