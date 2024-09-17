import express from 'express'
import multer from 'multer'
import { login_user , register_user } from '../controllers/user_controls.js'
const user_routes = express.Router()


const storage = multer.diskStorage({
    destination : 'user_images/',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
      }
})
const upload = multer({storage : storage})

user_routes.post('/register' , upload.single('image') , register_user )
user_routes.post('/login' , login_user )


export default user_routes