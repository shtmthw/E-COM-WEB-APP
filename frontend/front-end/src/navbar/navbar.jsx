import React, { useContext, useState } from 'react'
import Register from '../user/register/register'
import Login from '../user/login/login'
import { StoreContext } from '../globalcontex/store_contex_GLB'
function Navbar() {
    const { token, setToken } = useContext(StoreContext)
    const [showLog, setLog] = useState(false)   // For showing the Login component
    const [showReg, setReg] = useState(false)   // For showing the Register component

    return (
        <>
            <div className="main">
                <div className="nav-ops">
                    <div className="user">

                    </div>
                </div>

                {/* Conditionally render the Register form */}
                {token ? 
                
                
                <><button onClick={() => {
                    localStorage.clear('token')
                    setToken(false)
                }} >Logout</button>
                </>
                 
                : 
                
                <>
                    <div className="user_cntrl">
                        {/* Button to toggle Register form */}
                        <button onClick={() => {
                            setReg(true);
                            setLog(false);  // Hide login if register is shown
                        }}>
                            Register
                        </button>

                        {/* Button to toggle Login form */}
                        <button onClick={() => {
                            setLog(true);
                            setReg(false);  // Hide register if login is shown
                        }}>
                            Login
                        </button>
                        {showReg ? <Register setReg={setReg} /> : <></>}

                        {/* Conditionally render the Login form */}
                        {showLog ? <Login setLog={setLog} /> : <></>}
                    </div>
                </>}

            </div>
        </>
    )
}

export default Navbar
