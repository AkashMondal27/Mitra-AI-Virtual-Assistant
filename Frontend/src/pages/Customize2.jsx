import React from 'react'
import { useContext } from 'react';
import { userDataContext } from '../context/UserContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Card from '../components/Card';
import { IoArrowBackSharp } from "react-icons/io5";


const Customize2 = () => {
   
    const{userData, backendImage, selectedImage,serverUrl ,setUserData}=useContext(userDataContext);
    const [assistantName ,setAssistantName]=useState(userData?.assistantName ||"" );
    const [assistantGender ,setAssistantGender]=useState(userData?.assistantGender ||"" );
    const [loading, setLoading]=useState(false);
    const navigate=useNavigate();

    const handleUpdateAssistant= async()=>{
      setLoading(true);
      try{
        let formData=new FormData();  //we will use formData to send the image file to the backend
        formData.append("assistantGender",assistantGender)
        formData.append("assistantName",assistantName);
        if(backendImage){
          formData.append("assistantImage",backendImage);
        } else{
          formData.append("imageUrl",selectedImage); //if the user select one of the preloaded images we will send the url of the image to the backend to save it in the database
        }
         const result = await axios.post(`${serverUrl}/api/user/update`, formData, { withCredentials: true });
         setLoading(false)

         console.log(result.data);
         setUserData(result.data); //update the user data in the context with the new assistant gender , name and image
         navigate("/");
      }catch(error){
        setLoading(false)
        console.log(error);
      }
    }


    return (
        <div className='w-full min-h-screen bg-linear-to-t from-[black] to-[#010b38] flex 
                   justify-center items-center md:py-2 p-0 flex-col  ' >
            
            <button className="absolute md:top-8 left-8
                               top-18
                             text-white cursor-pointer 
                               w-9 h-9 flex justify-center 
                               items-center rounded-full
                               bg-linear-to-r from-blue-700 to-blue-1000                                       
                               font-semibold
                               text-lg
                               border-2 border-blue-900
                               shadow-lg shadow-cyan-500/30
                               hover:shadow-cyan-500/50
                               hover:scale-105
                               transition-all duration-100
                               "
                    onClick={()=>navigate("/customize")}>
                <IoArrowBackSharp  />       
            </button>


           {/*.................Select Name...................................................*/}

           <h1 className=' text-center text-blue-400 text-[30px] font-bold  mb-5  '>
                Set Your <br className="block sm:hidden" />
                <span className='text-orange-300'>Assistant Name 
                  <br className="block sm:hidden" /> & Gender </span>
            </h1>

            <input
                type="text"
                placeholder="Example :  Jarvis"
                className="
                           w-[90%]
                           max-w-100
                           h-12
                           sm:h-12
                           md:h-13
                           mt-2
                           outline-none
                           border-2 border-blue-900
                           bg-transparent                        
                         text-white
                         placeholder-gray-400
                           px-4 sm:px-5
                           rounded-full
                           text-base sm:text-lg"
                 required onChange={(e)=>setAssistantName(e.target.value)} 
                 value={assistantName} />
                 
            {/*.............................Select Gender.....................................*/}



<div className="flex gap-6 mt-8">

  {/* Male */}
  <label
    className={`cursor-pointer flex items-center justify-center gap-1
      w-30 h-11 rounded-xl border-2 transition-all duration-300
      ${
        assistantGender === "male"
          ? "border-blue-500 bg-blue-900/30 shadow-lg shadow-blue-500/30 scale-105"
          : "border-blue-900 hover:border-blue-500 hover:bg-blue-900/20"
      }`}
  >
    <input
      type="radio"
      name="gender"
      value="male"
      checked={assistantGender === "male"}
      onChange={(e) => setAssistantGender(e.target.value)}
      className="hidden"
    />

    <span className="text-2xl">👨</span>
    <span className="text-white font-semibold text-lg">Male</span>
  </label>

  {/* Female */}
  <label
    className={`cursor-pointer flex items-center justify-center gap-1
      w-30 h-11 rounded-xl border-2 transition-all duration-300
      ${
        assistantGender === "female"
          ? "border-pink-500 bg-pink-900/30 shadow-lg shadow-pink-500/30 scale-105"
          : "border-blue-900 hover:border-pink-500 hover:bg-pink-900/20"
      }`}
  >
    <input
      type="radio"
      name="gender"
      value="female"
      checked={assistantGender === "female"}
      onChange={(e) => setAssistantGender(e.target.value)}
      className="hidden"
    />

    <span className="text-2xl">👩</span>
    <span className="text-white font-semibold text-lg">Female</span>
  </label>

</div>











         {assistantName && assistantGender &&
          <button
            className="
            group
            w-[90%]
            max-w-47
            h-12
            sm:h-13
            mt-7
            rounded-full
            bg-linear-to-r from-blue-700 to-blue-1000
           text-white
            font-semibold
            text-lg
            border-2 border-blue-900
            cursor-pointer
            shadow-lg shadow-cyan-500/30
            hover:shadow-cyan-500/50
            hover:scale-105
            transition-all duration-100
            flex
            gap-2
            justify-center
            items-center
            mx-auto
             "
            disabled={loading} 
            onClick={() =>{             
                
              handleUpdateAssistant()
             }}>
           {loading ? "Updating..." : "Save & Continue"}
          
          </button>
         }       

        </div>
    )
}

export default Customize2
