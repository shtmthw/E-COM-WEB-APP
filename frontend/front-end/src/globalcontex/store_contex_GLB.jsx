import React from 'react'
import { createContext, useContext, useEffect, useState } from "react";
export const StoreContext = createContext(null)

const StoreContProv = (props) => {
    
    const [token , setToken] = useState(null)
    const [user_img , setUser_img] = useState("")
    useEffect(()=>{
        if(localStorage.getItem('token') && localStorage.getItem('user_img')){
            setToken(localStorage.getItem('token'))
            setUser_img(localStorage.getItem('user_img'))
        }
    },[])

    const contextval = {
        token,
        setToken,
        user_img,
        setUser_img
    }

    return (
        <StoreContext.Provider value={contextval}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContProv

