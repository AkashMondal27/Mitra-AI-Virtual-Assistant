import React, { Children, createContext } from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

export const userDataContext = createContext();


const UserContext = ({ children }) => {


    const serverUrl = "http://localhost:8000"

    const [userData, setUserData] = useState(null);

    //we will use these two states to show the image that the user select in the customize page before sending it to the backend
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleCurrentUser = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true })
            setUserData(result.data);
            console.log(result.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    // make  A Funcation for Gemini Respinse 
    const getGemeniResponse = async (command) => {
        console.log("Calling Backend...");
        try {
            const result = await axios.post(`${serverUrl}/api/user/asktoassistant`,
                { command },
                { withCredentials: true })
            console.log("Backend Response :", result.data);
            return result.data
        }
        // catch (error) {
        //     console.log("full error : ",error)
        //     console.log("Backend Response:", error.response?.data);

        // }
        catch (error) {

            if (error.response?.status === 429) {

                return {
                    type: "api_limit",
                    response: "The default Gemini API quota has been reached."
                }

            }

            console.log(error);

        }

    }



    useEffect(() => {
        handleCurrentUser();
    }, [])

    const value = {
        serverUrl,
        userData, setUserData,
        frontendImage, setFrontendImage,
        backendImage, setBackendImage,
        selectedImage, setSelectedImage, getGemeniResponse
    }
    return (
        <div>
            <userDataContext.Provider value={value}>
                {children}
            </userDataContext.Provider>
        </div>
    )
}

export default UserContext




