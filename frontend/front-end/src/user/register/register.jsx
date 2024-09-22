import React, { useContext, useState } from 'react'
import axios from 'axios'
import { StoreContext } from '../../globalcontex/store_contex_GLB'

function Register({ setReg }) {
    const { token, setToken,user_img,setUser_img } = useContext(StoreContext)

    const [image, setU_image] = useState("")
    const [u_data, setU_data] = useState({
        u_name: '',
        u_email: '',
        u_password: '',
        image: image
    })

    const onchangehandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setU_data(prev => ({ ...prev, [name]: [value] }))
    }

    const handle_register = async (event) => {
        try {
            event.preventDefault()
            const form_instance = new FormData()
            form_instance.append('u_name', u_data.u_name)
            form_instance.append('u_email', u_data.u_email)
            form_instance.append('u_password', u_data.u_password)
            form_instance.append('image', image)
            const resp = await axios.post('http://localhost:5000/api/user/register', form_instance)
            if (resp.data.success) {
                window.alert("Register Successfully!")
                setU_data({
                    u_name: '',
                    u_email: '',
                    u_password: '',
                    image: ''
                })
                const inr_token = resp.data.token
                setToken(inr_token)
                localStorage.setItem('token', inr_token)
                const token = localStorage.getItem('token'); // Retrieve token from localStorage

                const response = await axios.post(
                    'http://localhost:5000/api/user/get_userImg',  // API endpoint
                    {},  // Empty body for this request
                    {
                        headers: {
                            Authorization: `${token}`  // Set the Authorization header with Bearer token
                        }
                    }
                );
                if(response.data.success){
                    localStorage.setItem('user_img', response.data.user_img)
                    setUser_img(response.data.user_img)
                }
            }
            else {
                window.alert(resp.data.message)
                setU_data({
                    u_email: '',
                    u_password: ''
                })
            }
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <>
            <div className="main">
                <h2 onClick={() => {
                    setReg(false)
                }}>X</h2>
                <div className="form-body">
                    <form action="" onSubmit={handle_register}>
                        <input type="text" name='u_name' value={u_data.u_name} onChange={onchangehandler} />
                        <input type="email" name='u_email' value={u_data.u_email} onChange={onchangehandler} />
                        <input type="password" name='u_password' value={u_data.u_password} onChange={onchangehandler} />
                        <input type='file' onChange={(e) => {
                            setU_image(e.target.files[0])
                        }} className='image`' name='image' required />
                        <button type='submit'>Register</button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Register