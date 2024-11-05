// import multer from "multer";
// import path from "path"


// const storage = multer.diskStorage({
//     destination: (req,file,cb)=>{
//         cb(null,'image/img')
//     },
//     filename: (req,file,cb)=>{
//         cb(null,file.fieldname + "-"+Date.now()+ path.extname(file.originalname))
//     }
// })

// const upload =multer ({
//     storage:storage
// })

// export default upload;








import multer from 'multer';
import path from 'path';

// Define storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure the folder 'image/img' exists
        cb(null, 'image/img');
    },
    filename: (req, file, cb) => {
        // Create a unique filename with a timestamp
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });

export default upload;
