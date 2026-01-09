import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser=async(req,res)=>{
    try {
        const{name,email,password}=req.body;
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }
        const hashPassword=await bcrypt.hash(password,10);
        const user=new User({name,email,password:hashPassword});
        await user.save();
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(201).json({user:{id:user._id,name:user.name,email:user.email},token});
    } catch (error) {
        res.status(500).json({message:"Registration failed"});
    }
}

export const loginUser=async(req,res)=>{
    try {
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).json({user:{id:user._id,email},token});
    } catch (error) {
        res.status(500).json({message:"Login Failed"});
    }
}