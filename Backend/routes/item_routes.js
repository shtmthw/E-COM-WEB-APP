import express, { Router } from 'express'
import multer from 'multer';
const item_route = express.Router()
import { add_itemm , fetch_items , del_item , update_item_ordered_amnt} from '../controllers/item_controls.js';

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'item_images/');  // Ensure the 'item_images' directory exists
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

item_route.post('/add_item' , upload.single('image') , add_itemm )
item_route.get('/getall_item' , fetch_items)
item_route.post('/del_item' , del_item)
item_route.post('/update_total_item_ordered_amnt' , update_item_ordered_amnt)



export default item_route