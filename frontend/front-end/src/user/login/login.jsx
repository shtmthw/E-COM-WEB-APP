import React, { useState, useContext } from 'react'
import axios from 'axios'
import { StoreContext } from '../../globalcontex/store_contex_GLB'
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

            // Sending as JSON, no need for FormData
            const resp = await axios.post('http://localhost:5000/api/user/login', u_data, {
                headers: {
                    'Content-Type': 'application/json',  // Explicitly set JSON header
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
                    'http://localhost:5000/api/user/get_userImg',  // API endpoint
                    {},  // Empty body for this request
                    {
                        headers: {
                            Authorization: `${token}`  // Set the Authorization header with Bearer token
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
        }
    }


    return (
        <>
            <div className="main">
                <h2 onClick={() => {
                    setLog(false)
                }}>X</h2>
                <div className="form-body">
                    <form action="" onSubmit={handle_login}>
                        <input type="email" name='u_email' value={u_data.u_email} onChange={onchangehandler} />
                        <input type="password" name='u_password' value={u_data.u_password} onChange={onchangehandler} />

                        <button type='submit'>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login