import express from 'express';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import { 
    login_user, 
    register_user, 
    get_user_img, 
    get_user_cred, 
    delete_pfp, 
    update_pfp ,
    token_decryption
} from '../controllers/user_controls.js';
import { WTC_DECR } from '../middlewares/WBThandler.js';

const user_routes = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'user_images/');  // Ensure the 'user_images' directory exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
    }
});

// File filter to accept images only
const fileFilter = (req, file, cb) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(file.originalname)) {
        return cb(new Error('Invalid image format!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage, fileFilter });

// Rate limiting for login route to prevent brute-force attacks
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per window
    message: "Too many login attempts, please try again later."
});

// User routes
user_routes.post('/register', upload.single('image'), register_user);
user_routes.post('/login', loginLimiter, login_user);
user_routes.post('/get_userImg', WTC_DECR, get_user_img);
user_routes.post('/get_user_cred', WTC_DECR, get_user_cred);
user_routes.post('/del_user_pfp', WTC_DECR, delete_pfp);
user_routes.post('/Token_decryption' , WTC_DECR , token_decryption)
user_routes.post('/update_user_pfp', upload.single('image'), update_pfp);

export default user_routes;
