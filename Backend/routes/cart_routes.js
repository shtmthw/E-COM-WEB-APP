import express from 'express';
import { add_item_incart, remove_cartitem, get_cart } from '../controllers/cart_controls.js';
import { WTC_DECR } from '../middlewares/WBThandler.js';
const cart_routes = express.Router();

// Route to add an item to the cart
cart_routes.post('/add_to_cart',WTC_DECR, add_item_incart);

// Route to remove an item from the cart
cart_routes.post('/remove_from_cart', WTC_DECR,remove_cartitem);

// Route to get the user's cart
cart_routes.post('/get_cart', WTC_DECR ,get_cart);

export default cart_routes;
