import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        assistantName: {
            type: String
        },
        assistantGender: {
           type: String,
           enum: ["male", "female"],
           
        },
        assistantImage: {
            type: String
        },
        history: [
            {
                type: String
            }
        ]

    },
    { timestamps: true })

// create a user model using this schema

const User = mongoose.model("User", userSchema)
export default User;