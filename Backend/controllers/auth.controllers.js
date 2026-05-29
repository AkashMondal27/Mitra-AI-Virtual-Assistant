import User from "./../models/user.model.js"
import genToken from "../config/token.js";
import bcrypt from "bcryptjs";


//..................Controller for user sign up..................

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body

        //   check if user already exists
        const exitEmail = await User.findOne({ email })
        if (exitEmail) {
            return res.status(400).json({ message: "Email already exists" })
        }

        //  password lenght 
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" })
        }

        //password hasing 
        const hashedPassword = await bcrypt.hash(password, 10)

        // create a new user

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        //Generate a token for the user so that they can be authenticated in future requests

        const token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false
        })

        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({ message: `Error signing up: ${error.message}` })
    }
}


//..................Controller for user login..................

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body

        //   check if user already exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Email does not exists" })
        }


        //check if password is correct
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" })
        }




        //Generate a token for the user so that they can be authenticated in future requests

        const token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false
        })

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({ message: `Login Error: ${error.message}` })
    }
}


//..................Controller for user logout..................
export const Logout = async (req, res) => {
    try {

        res.clearCookie("token")
        return res.status(200).json({ message: "Logout successful" })
    } catch (error) {
        return res.status(500).json({ message: `Logout Error: ${error.message}` })
    }

}