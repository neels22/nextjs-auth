// domain.com/verifytoken/assasasdfdgfdffg -- using server component 

// domain.com/verifytoken?token=adadfdf -- using client component 



import nodemailer from 'nodemailer'
import User from '@/models/userModel'

import bcryptjs from 'bcryptjs'

export const sendemail = async({email,emailtype,userid}:any)=> {
    try {
        const hashedtoken = await bcryptjs.hash(userid.toString(),10);

        if (emailtype === "VERIFY") {
            await User.findByIdAndUpdate(userid,{
                verifytoken: hashedtoken ,verifytokenexpiry:Date.now() + 3600000
            })
            
        }
        else if (emailtype=== "RESET") {
            await User.findByIdAndUpdate(userid,{
                forgotpasswordtoken: hashedtoken ,forgotpasswordtokenexpiry:Date.now() + 3600000
            })
            
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "610d9544d071d9",
              pass: "40dd723ba8da7e"
            }
          });

          const mailoptions = {
            from:'indraneelsarode@gmail.com',
            to: email,
            subject:emailtype === "VERIFY"?'verify your password':'reset your password',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedtoken}">here</a> to ${emailtype === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedtoken}
            </p>`
          }

          const mailresponse= await transport.sendMail(mailoptions);

          return mailresponse;


      
        
    } catch (error:any) {   
            throw new Error(error.message)
        
    }
    
}

