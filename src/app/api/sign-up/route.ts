import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";


export async function POST(request:Request) {
  await dbConnect()

  try{
    const {username,email,password}=await request.json()
    const existingUserVerifiedByUsername=await UserModel.findOne({
      username,
      isVerified:true
    })
    if (existingUserVerifiedByUsername){
      return Response.json({
        success:false,
        message:"Username is already Exist",
      },{status:400})
    }
    const existingUserByEmail=await UserModel.findOne({
      email

    })
    const verifyCode =Math.floor(100000+Math.random()*900000).toString()
    if (existingUserByEmail){
      if (existingUserByEmail.isVerified){
        return Response.json({
          success:false,
          message:"Email is already Exist",
        },{status:400})
        
      }else{
        const hasedPassword=await bcrypt.hash(password,10)
        existingUserByEmail.password=hasedPassword;
        existingUserByEmail.verifyCode=verifyCode;
        existingUserByEmail.verifyCodeExpire=new Date(Date.now()+3600000
        )
        await existingUserByEmail.save();
      }
    }else{
      const hasedPassword =await bcrypt.hash(password,10)
      const experyDate=new Date()
      experyDate.setHours(experyDate.getHours()+1)
      const newUser=new UserModel({
        username,
          email,
          password: hasedPassword,
          verifyCode,
          verifyCodeExpire: experyDate,
          isVerified:false,
          isAcceptingMassage:true,
          massages:[]
      })
      await newUser.save()
    }
    //send email
    const emailResponse=await sendVerificationEmail(
      email,
      username,
      verifyCode

    )
    if (!emailResponse.success){
      return Response.json(
        {
          success:false,
          message:emailResponse.message
        },{status:500}
      )
    }
    return Response.json(
      {
        success:false,
        message:"user register successfully"
      },{status:201
      })



  }catch(error){
    console.log("error registering user",error)
    return Response.json(
      {
        success:false,
        message:"error registering user"
      },
      {status:500}
    )

  }
  
}