//take the iser id from "userId" , user find . return 

import User from "../models/user.model.js"
import uploadOnCloudinary from "../config/cloudinary.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import geminiResponse from "../gemeni.js";
import { response } from "express";
import moment from "moment";

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

export const updateAssistant = async (req, res) => {
    try {
        const { assistantName, assistantGender, imageUrl } = req.body; //this is for the preloaded image  to send in backend and save it in the database
        let assistantImage;

        if (req.file) {
            assistantImage = await uploadOnCloudinary(req.file.path);
        } else {
            assistantImage = imageUrl; //this is for the preloaded image  to send in backend and save it in the database
        }


        //update the user in the database with the new assistant name and image
        const user = await User.findByIdAndUpdate(req.userId, {
            assistantName,
            assistantGender,
            assistantImage
        }, { new: true }).select("-password")
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ message: "update assistant error" })
    }
}


//Make a Controlar for the Ask to Assistant 
export const askToAssistant = async (req, res) => {
    try {
        const { command } = req.body
        const user = await User.findById(req.userId); // TAKE USER ID FROM BACKEND DATABASE
        user.history.push(command) // add the command to the user history
        await user.save() // save the user history in the database
        const userName = user.name
        const assistantName = user.assistantName
        const result = await geminiResponse(command, assistantName, userName)
        //    if (!result) {

        //       return res.status(500).json({
        //          response: "Gemini API unavailable or quota exceeded . Please try again later."
        //     });
        //    }
        if (result?.error === "API_LIMIT") {
            return res.status(429).json({
                type: "api_limit",
                response: "The default Gemini API quota has been reached."
            });
        }
        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            return res.status(400).json({ response: "sorry i can not understand" })
        }

        const gemResult = JSON.parse(jsonMatch[0]) // response send to frontend
        const type = gemResult.type


        // retun the ans from  this code not from gemini for this type of Querry
        switch (type) {

            // DATE & TIME
            case "get_date":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Today's date is ${moment().format("Do MMMM YYYY")}`
                });

            case "get_time":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Current time is ${moment().format("hh:mm A")}`
                });

            case "get_day":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Today is ${moment().format("dddd")}`
                });

            case "get_month":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Current month is ${moment().format("MMMM")}`
                });


            case "google_search":
            case "youtube_search":
            case "youtube_play":
            case "general":
            case "calculator_open":
            case "instagram_open":
            case "facebook_open":
            case "weather_show":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: gemResult.response,
                })

            default:
                return res.status(400).json({
                    type: "unknown",
                    response: "I do not understand your request."
                });
        }

    }

    catch (error) {
        console.log("ASK ASSISTANT ERROR:", error);

        return res.status(500).json({
            response: error.message
        });
    }
}