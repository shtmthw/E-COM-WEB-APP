import axios from 'axios';
import React from 'react'
import { createContext, useContext, useEffect, useState } from "react";
export const StoreContext = createContext(null)

const StoreContProv = (props) => {

    const [token, setToken] = useState("")
    const [user_img, setUser_img] = useState("")
    const [cart, setCart] = useState({})

    const fetch_user_cart = async (user_tok) => {
        try {
            if (user_tok) {
                const resp = await axios.post('http://localhost:5000/api/cart/get_cart', {}, {
                    headers: { Authorization: user_tok }
                });
                setCart(resp.data.cartObj);
            }
        } catch (e) {
            console.log('Error fetching user cart:', e);
        }
    };


    const add_item_inCart = async (itemID) => {
        const user_tok = localStorage.getItem('token')
        console.log(itemID)
        if (!user_tok || !itemID) {
            window.alert("Log In To Purchase Items!");
            return; // Exit the function if the user is not logged in
        }

        try {
            const resp = await axios.post('http://localhost:5000/api/cart/add_to_cart',
                { itemID },  // Sending JSON payload
                { headers: { Authorization: `${user_tok}`, 'Content-Type': 'application/json' } }  // Correct Content-Type
            );

            if (resp.data.success) {
                setCart(prevCart => {
                    const newCart = { ...prevCart };
                    // Increment the item count if it already exists
                    if (newCart[itemID]) {
                        newCart[itemID] += 1;
                    } else {
                        newCart[itemID] = 1; // Set to 1 if it's a new item
                    }
                    return newCart; // Return the updated cart
                });

            } else {
                window.alert('Error Adding To Cart');
                console.log(resp.data.message);
            }
        } catch (e) {
            console.error('Error adding item to cart:', e);
            window.alert('An error occurred while adding the item to the cart.');
        }
    };
    const rem_itm_inCart = async (itemID) => {
        const user_tok = localStorage.getItem('token')
        if (!user_tok) {
            window.alert("Log In To Purchase Items!");
            return; // Exit the function if the user is not logged in
        }

        try {
            const resp = await axios.post('http://localhost:5000/api/cart/remove_from_cart ',
                { itemID },  // Sending JSON payload
                { headers: { Authorization: `${user_tok}`, 'Content-Type': 'application/json' } }  // Correct Content-Type
            );

            if (resp.data.success) {
                // Update the cart state properly
                setCart(prevCart => {
                    const newCart = { ...prevCart };
                    newCart[itemID] -= 1;
                    return newCart;
                });

            } else {
                window.alert('Error Removing From Cart');
                console.log(resp.data.message);
            }
        } catch (e) {
            window.alert('Error Removing Item Form cart')
            console.log(e)
        }
    }




    useEffect(() => {
        if (localStorage.getItem('token') && localStorage.getItem('user_img')) {
            setToken(localStorage.getItem('token'))
            setUser_img(localStorage.getItem('user_img'))

            fetch_user_cart(localStorage.getItem('token'))
        }
    }, [])


    const contextval = {
        token,
        setToken,
        user_img,
        setUser_img,
        cart,
        setCart,
        add_item_inCart,
        rem_itm_inCart
    }

    return (
        <StoreContext.Provider value={contextval}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContProv
