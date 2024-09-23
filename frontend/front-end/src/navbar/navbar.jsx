import React, { useEffect, useContext, useState } from 'react'
import Register from '../user/register/register'
import Login from '../user/login/login'
import { StoreContext } from '../globalcontex/store_contex_GLB'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import search from '../assets/search.png'
import cart from '../assets/cart.jpg'

function Navbar() {
    const navigate = useNavigate()
    const { token, setToken, user_img, setUser_img } = useContext(StoreContext)
    const [showLog, setLog] = useState(false)   // For showing the Login component
    const [showReg, setReg] = useState(false)   // For showing the Register component

    return (
        <>
            <div className="main">
                <div className="nav-ops">
                    <div className="top-nav">

                    </div>
                    <div className="user">



                        {/* Conditionally render the Register form */}
                        {token ?
                            <>
                                <img onClick={() => {

                                    /// use global context to handle the visiblity of the search bar component!!

                                }} src={search} alt="" className="search-logo" width={70} />

                                <img onClick={() => {
                                    navigate('/cart')
                                }} src={cart} alt="" className="cart-logo" width={50} />

                                <img onClick={() => {
                                    navigate('/')
                                }} src={logo} alt="" className="site-logo" width={240} />

                                <img className='profile_img' onClick={() => {
                                    navigate('/my_profile')
                                }} src={`http://localhost:5000/user_images/${user_img}`} width={120} alt="" />

                                <button className='logout-button' onClick={() => {
                                    localStorage.clear('token')
                                    localStorage.clear('user_img')
                                    setToken(null)
                                    setUser_img(null)
                                }} >Logout</button>
                            </>

                            :

                            <>
                                <div className="user">
                                    <img onClick={() => {

                                        /// use global context to handle the visiblity of the search bar component!!

                                    }} src={search} alt="" className="search-logo" width={70} />

                                    <img onClick={() => {
                                        navigate('/cart')
                                    }} src={cart} alt="" className="cart-logo" width={50} />

                                    <img onClick={() => {
                                        navigate('/')
                                    }} src={logo} alt="" className="site-logo" width={240} />

                                    {/* Button to toggle Register form */}
                                    <button className='user_control' onClick={() => {
                                        setReg(true);
                                        setLog(false);  // Hide login if register is shown
                                    }}>
                                        Register
                                    </button>

                                    {/* Button to toggle Login form */}
                                    <button className='user_control' onClick={() => {
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
                </div>
            </div>
        </>
    )
}

export default Navbar
