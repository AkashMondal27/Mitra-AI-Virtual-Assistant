//take the iser id from "userId" , user find . return 

import User from "../models/user.model"

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