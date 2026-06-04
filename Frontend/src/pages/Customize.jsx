import React, { useRef } from 'react'
import Card from '../components/Card'
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/authBg.png"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"
import { RiImageAddLine } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from 'react';
import { useContext } from 'react';
import { userDataContext } from '../context/UserContext';



function  Customize  ()  {

    //input of the Image 
    const{serverUrl,
       userData,setUserData,
       frontendImage,setFrontendImage,
       backendImage,setBackendImage,
       selectedImage,setSelectedImage}=useContext(userDataContext);
   
    const inputImage=useRef()

    //function to handle the image when the user select it
     const handleImage=(e)=>{
         const file=e.target.files[0]; //get the file from the input
         setBackendImage(file);  //we will send this file to the backend to save it in the database and use it later for the avatar of the assistant
         setFrontendImage(URL.createObjectURL(file)); //converting the file to a url to show it in the frontend
    }
  return (
    <div className='w-full min-h-screen bg-linear-to-t from-[black] to-[#010b38] flex 
                   justify-center items-center md:py-3 p-0 flex-col ' >

        <h1 className=' text-center text-blue-400 text-[30px] font-semibold mb-5  '>
              Select your  <br className="block sm:hidden" />
              <span className='text-orange-300 '>Assistant Avatar</span>
        </h1>
        <div className='md:w-[70%] md:max-w-225 flex justify-center items-center flex-wrap gap-5 sm:gap-8 md:gap-10'>
                <Card image={image1}/>
                <Card image={image2}/>
                <Card image={image3}/>
                <Card image={image4}/>
                <Card image={image5}/>
                <Card image={image6}/>
                <Card image={image7}/>
            {/* adding a div for add option of image  */}
               <div    className="
                              w-20 h-30
                              sm:w-28 sm:h-48
                              md:w-30 md:h-55
                            bg-[#030326]
                              border-2 border-[#03037178]
                              rounded-2xl
                              overflow-hidden
                              hover:shadow-2xl
                             hover:shadow-blue-900
                             hover:border-white
                              cursor-pointer
                              transition-all
                              duration-300
                             flex justify-center items-center"
                    onClick={() => inputImage.current.click()} >

                        {!frontendImage && <RiImageAddLine  className='text-white w-8 h-8'/>}
                        {frontendImage && <img src={frontendImage} alt="Selected"  className='h-full object-cover'/>}
                </div>

                <input type="file" accept="image/*" ref={inputImage} hidden 
                   onChange={handleImage} />
               
        </div> 
            {/* button for next  */}
        <button className=' group min-w-30 h-10  mt-5 bg-orange-100 rounded-full text-amber-800 text-xl cursor-pointer 
                                     hover:bg-orange-300 shadow-2xl shadow-amber-100  flex  gap-1.5 justify-center items-center' >
                    Next <FaArrowRightLong className="text-amber-800 transition-transform duration-300 group-hover:translate-x-1 " />

                </button>

     
    </div>
  )
}

export default Customize
