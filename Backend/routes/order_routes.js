import { order_confirmation,order_placement,send_orders ,fetch_singleUser_order ,filter_confirmed_orders ,handle_order_status } from "../controllers/order_controls.js";
import { WTC_DECR } from "../middlewares/WBThandler.js";
import express from 'express'
const order_routes = express.Router()

//use in A/P to get evey order
order_routes.get('/fetch_all_orders' , send_orders)
//use in F/P to place order
order_routes.post('/place_order' , order_placement)
//use in A/P to confirm order
order_routes.post('/confirm_order' , order_confirmation)
//use in F/P to get the orders of a single user
order_routes.post('/my_orders' , WTC_DECR , fetch_singleUser_order)
//use in L/P to get the confirmed orders
order_routes.post('/filter_confirmed_orders', filter_confirmed_orders)
//use in L/P to handle order status
order_routes.post('/update_order_status', handle_order_status)


export default order_routes