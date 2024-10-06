import {add_new_categories , get_categories , remove_category} from "../controllers/category_controller.js";
import express from 'express'
const category_routes = express.Router()

category_routes.get('/get_categories' , get_categories)
category_routes.post('/add_category', add_new_categories)
category_routes.post('/remove_categories', remove_category)


export default category_routes