import {add_new_categories , get_categories , lazy_category_loading,lazy_categorySelection_loading,remove_category} from "../controllers/category_controller.js";
import express from 'express'
const category_routes = express.Router()

category_routes.get('/get_categories' , get_categories)
category_routes.post('/add_category', add_new_categories)
category_routes.post('/remove_categories', remove_category)
category_routes.post('/lazyLoad_categories', lazy_category_loading)
category_routes.post('/lazyLoad_categoriesSelection', lazy_categorySelection_loading)



export default category_routes