import { Request,Response } from "express";
import { UserModel } from "../model/signup.model";
import jwt from 'jsonwebtoken'
import { generateAccessToken, generateRefreshToken } from "../services/generateAcess&RefreshToken";
export const genNewAcessToken=async(req:Request,res:Response)=>{
    const {refreshToken}=req.body;
    try{
     if(!refreshToken){
        return res.status(400).json({message:"refresh token missin "})
     }
     const user = await UserModel.findOne({ refreshToken });

    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
     const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as { userId: string };

    const newAccessToken = generateAccessToken(decoded.userId);

    const newRefreshToken = generateRefreshToken(decoded.userId);
    user.refreshToken = newRefreshToken;
    await user.save();

    return res.status(200).json({
      message: "Access token refreshed",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken, 
    });
    }
    catch(err){
 return res.status(403).json({ message: "Invalid or expired refresh token" });
    }

}