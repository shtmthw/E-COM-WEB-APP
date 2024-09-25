import React, { useState, useContext } from 'react'
import axios from 'axios'
import { StoreContext } from '../../globalcontex/store_contex_GLB'
import './login.css' // Adding custom CSS for the popup modal

function Login({ setLog }) {
    const { token, setToken, user_img, setUser_img } = useContext(StoreContext)

    const [u_data, setU_data] = useState({
        u_email: '',
        u_password: ''
    })

    const onchangehandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setU_data(prev => ({ ...prev, [name]: value }))
    }

    const handle_login = async (event) => {
        try {
            event.preventDefault();

            const resp = await axios.post('http://localhost:5000/api/user/login', u_data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (resp.data.success) {
                window.alert("Logged In Successfully!");
                setToken(resp.data.token)
                localStorage.setItem('token', resp.data.token);
                setU_data({
                    u_email: '',
                    u_password: ''
                });
                const token = resp.data.token
                const response = await axios.post(
                    'http://localhost:5000/api/user/get_userImg', 
                    {}, 
                    {
                        headers: {
                            Authorization: `${token}`  
                        }
                    }
                );
                if (response.data.success) {
                    localStorage.setItem('user_img', response.data.user_img)
                    setUser_img(response.data.user_img)
                }
            } else {
                window.alert(resp.data.message);
                setU_data({
                    u_email: '',
                    u_password: ''
                });
            }
        } catch (e) {
            console.log(e);
            window.alert(e.response.data.message)
        }
    }

    return (
        <div className="login-popup-overlay">
            <div className="login-popup">
                <h2 className="close-btn" onClick={() => setLog(false)}>X</h2>
                <div className="form-body">
                    <form onSubmit={handle_login}>
                        <input 
                            type="email" 
                            name='u_email' 
                            placeholder="Email" 
                            value={u_data.u_email} 
                            onChange={onchangehandler} 
                            required
                        />
                        <input 
                            type="password" 
                            name='u_password' 
                            placeholder="Password" 
                            value={u_data.u_password} 
                            onChange={onchangehandler} 
                            required
                        />
                        <button type='submit' className="login-btn">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
