import React from 'react'
import Card from '../components/Card'
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/authBg.png"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"
import { RiImageAddLine } from "react-icons/ri";


function  Customize  ()  {
  return (
    <div className='w-full h-screen bg-linear-to-t from-[black] to-[#010b38] flex 
                   justify-center items-center py-8 flex-col ' >

        <h1 className='text-blue-400 text-[30px] font-semibold mb-7.5'>
              Select your <span className='text-orange-300'>Assistant Avatar</span>
        </h1>
        <div className='w-full max-w-225 flex justify-center items-center flex-wrap gap-5 sm:gap-8 md:gap-10'>
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
                             flex justify-center items-center">
                     <RiImageAddLine  className='text-white w-8 h-8'/>
                </div>
        </div>
     
    </div>
  )
}

export default Customize
