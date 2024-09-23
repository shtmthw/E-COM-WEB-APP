import React, { useContext, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../globalcontex/store_contex_GLB';
import './register.css';

function Register({ setReg }) {
    const { setToken, setUser_img } = useContext(StoreContext);

    const [image, setU_image] = useState("");
    const [u_data, setU_data] = useState({
        u_name: '',
        u_email: '',
        u_password: '',
    });

    const onchangehandler = (event) => {
        const { name, value } = event.target;
        setU_data((prev) => ({ ...prev, [name]: value }));
    };

    const handle_register = async (event) => {
        try {
            event.preventDefault();
            const form_instance = new FormData();
            form_instance.append('u_name', u_data.u_name);
            form_instance.append('u_email', u_data.u_email);
            form_instance.append('u_password', u_data.u_password);
            form_instance.append('image', image);

            const resp = await axios.post('http://localhost:5000/api/user/register', form_instance);

            if (resp.data.success) {
                window.alert("Registered Successfully!");
                setToken(resp.data.token);
                localStorage.setItem('token', resp.data.token);

                const token = resp.data.token;
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
                    localStorage.setItem('user_img', response.data.user_img);
                    setUser_img(response.data.user_img);
                }
                setReg(false); // Close the Register form
            } else {
                window.alert(resp.data.message);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="register-popup-overlay">
            <div className="register-popup">
                <h2 className="close-btn" onClick={() => setReg(false)}>X</h2>
                <div className="form-body">
                    <form onSubmit={handle_register}>
                        <input
                            type="text"
                            name="u_name"
                            placeholder="Enter your name"
                            value={u_data.u_name}
                            onChange={onchangehandler}
                            required
                        />
                        <input
                            type="email"
                            name="u_email"
                            placeholder="Enter your email"
                            value={u_data.u_email}
                            onChange={onchangehandler}
                            required
                        />
                        <input
                            type="password"
                            name="u_password"
                            placeholder="Enter your password"
                            value={u_data.u_password}
                            onChange={onchangehandler}
                            required
                        />
                        <input
                            type="file"
                            onChange={(e) => setU_image(e.target.files[0])}
                            className="image-upload"
                            name="image"
                            required
                        />
                        <button type="submit" className="register-btn">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
