import React from 'react'
import { createContext, useContext, useEffect, useState } from "react";
export const StoreContext = createContext(null)

const StoreContProv = (props) => {
    const Check_context = 'Hello Users!'

    const contextval = {
        Check_context
    }

    return (
        <StoreContext.Provider value={contextval}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContProv

