//take the iser id from "userId" , user find . return 

import User from "../models/user.model.js"
import uploadOnCloudinary from "../config/cloudinary.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId).select("-password")
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        } else {
            return res.status(200).json(user)
        }
    } catch (error) {
        return res.status(400).json({ message: "get current user error" })
    }
}

export const updateAssistant =async(req, res)=>{
    try{
        const {assistantName, imageUrl}=req.body; //this is for the preloaded image  to send in backend and save it in the database
        let assistantImage;

        if(req.file){
            assistantImage= await uploadOnCloudinary(req.file.path);  
        }else{
            assistantImage=imageUrl; //this is for the preloaded image  to send in backend and save it in the database
        }


        //update the user in the database with the new assistant name and image
        const user=await User.findByIdAndUpdate(req.userId,{
            assistantName,
            assistantImage
        },{ new: true }).select("-password")
        return res.status(200).json(user)
    }catch(error){
       return res.status(400).json({ message: "update assistant error" })
    }
}