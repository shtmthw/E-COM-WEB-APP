import express, { Router } from 'express'
import { get_all } from '../controllers/item_controls.js'
const item_route = express.Router()

item_route.get('/get_all' , get_all)


export default item_route