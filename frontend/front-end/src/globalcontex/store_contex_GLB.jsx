import React from 'react'
import { createContext, useContext, useEffect, useState } from "react";
export const StoreContext = createContext(null)

const StoreContProv = (props) => {
    
    const [token , setToken] = useState(false)

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setToken(true)
        }
    },[])

    const contextval = {
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextval}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContProv

