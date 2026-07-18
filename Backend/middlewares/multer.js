import multer from 'multer';

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public')
    },
    filename:(req,file,cd)=>{
        cd(null,Date.now() + "-" + file.originalname)
    }
})


const upload=multer({storage:storage})
export default upload;

/*  through this the image will be uploaded to the public directory */