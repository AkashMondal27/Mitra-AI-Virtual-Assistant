import{v2 as cloudinary} from 'cloudinary'
import fs from 'fs' ; //use to dlt the result from local storage after uploading to cloudinary

const uploadOnCloudinary=async(filePath)=>{
  try{cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
  })


//upload an image

    const uploadResult=  await cloudinary.uploader.upload(filePath)
    fs.unlinkSync(filePath) //delete the file from local storage after uploading to cloudinary
    return uploadResult.secure_url
    
}catch(error){
     fs.unlinkSync(filePath) //delete the file from local storage if there is an error
     return res.status(500).json({message:"Error uploading image"})
    console.error("Error uploading to Cloudinary:",error)
}
};
export default uploadOnCloudinary ;

/* 
it will use the cloudinary package to upload images to cloudinary and return the secure url of the uploaded image. 
It will also delete the file from local storage after uploading to cloudinary. If there is an error,
 it will delete the file from local storage and return a 500 status code with an error message.

 Now neeed a middleware "multer " to handle the file upload from the client and pass the file path to this function.
*/