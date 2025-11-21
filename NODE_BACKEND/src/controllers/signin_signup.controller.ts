import {Request,Response} from 'express';
import { userJoiValidation } from '../model/signup.model';
import { UserModel } from '../model/signup.model';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../services/generateAcess&RefreshToken';

export const saveUser=async(req:Request,res:Response)=>{
  const userDetails=req.body;
  const {error}=userJoiValidation.validate(userDetails,{abortEarly:false});
  if(error){
     const messages = error.details.map((err) => err.message);
  return res.status(400).json({ errors: messages });
  }
  try{
       let saveduser=await UserModel.create(userDetails)
       res.status(201).json({
        message:"user saved sucessfull",
        saveduser
       })
  }
  catch(err){
res.status(500).json({
        message:"user failed to register",
        reasion:err.message
       })
  }

}
export const login=async(req:Request,res:Response)=>{
    const {email,password}=req.body;
    try{
    const user=await UserModel.findOne({email})
    if(user){
        const isMatch = await bcrypt.compare(password, user.password);

         if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
            }
        
  const accessToken = generateAccessToken(user._id as string);
  const refreshToken = generateRefreshToken(user._id as string);
  user.refreshToken = refreshToken;
  await user.save();
   return res.status(200).json({
    sucess:true,
    message: "Login successful",
    accessToken,
    refreshToken,
  });
 
    }
    }

    catch(err){
res.status(500).json({
    sucess:false,
    message: "Login failed",
    reasion:err.message
    })
}
}