import React from 'react'
import { useContext } from 'react';
import { userDataContext } from '../context/UserContext';

const Card = ({ image }) => {
    const{serverUrl,
       userData,setUserData,
       frontendImage,setFrontendImage,
       backendImage,setBackendImage,
       selectedImage,setSelectedImage}=useContext(userDataContext);
  return (
    <div
      className={`
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
      ${selectedImage == image ? "border-2 border-white shadow-2xl shadow-blue-900" : null}`}
      onClick={() => {setSelectedImage(image)    > {/*when the user click on the card we will set the selected 
                                                    image in the context to show it in the customize page and 
                                               send it to the backend when the user click on the next button */}
                      setBackendImage(null)
                      setFrontendImage(null)                        
    
        
      }} >
      <img
        src={image}
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  )
}

export default Card