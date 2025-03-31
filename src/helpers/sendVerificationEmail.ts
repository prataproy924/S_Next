import {resend} from "../lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { string } from "zod";
import { promises } from "dns";
import { Verification } from "next/dist/lib/metadata/types/metadata-types";


export async function sendVerificationEmail(
  email:string,
  username:string,
  verificationCode:string

):Promise<ApiResponse>{
  try{
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'verification code ',
      react: VerificationEmail({username, otp: verificationCode}),
    });
    return {success:true,message:'verification email sent'}

  }catch(emailError){
    console.log("error sending verification email");
    return {success:false,message:'failed to send verification email'}
  }

}



