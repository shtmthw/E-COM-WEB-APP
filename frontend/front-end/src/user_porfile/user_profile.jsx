import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../globalcontex/store_contex_GLB';
import { useNavigate } from 'react-router-dom';
import './user_profile.css';
import axios from 'axios';

function User_profile() {
    const { user_img } = useContext(StoreContext);
    const [showUP, setShowUP] = useState(false);
    const [UP_token, setUP_token] = useState(null);
    const [image, setImage] = useState(null);
    const [U_Cred, setU_Cred] = useState({
        name: "",
        email: "",
    });
    const Navigator = useNavigate()

    // Handle user image update
    const handleUpdate = async (form_data) => {
        try {
            const deleteResp = await axios.post(
                'http://localhost:5000/api/user/del_user_pfp',
                { user_img },
                { headers: { Authorization: `${UP_token}` } }
            );
            if (deleteResp.data.success) {
                await updateProfilePicture(form_data);
                console.log(form_data);
            } else {
                console.log(deleteResp.data.message);
            }
        } catch (error) {
            console.error('Error in handling update:', error);
        }
    };

    // Update profile picture in the database
    const updateProfilePicture = async (form_data) => {
        try {
            const resp = await axios.post(
                'http://localhost:5000/api/user/update_user_pfp',
                form_data,
                { headers: { Authorization: `${UP_token}`, 'Content-Type': 'multipart/form-data' } }
            );
            if (resp.data.success) {
                const response = await axios.post(
                    'http://localhost:5000/api/user/get_userImg',
                    {},
                    {
                        headers: {
                            Authorization: `${UP_token}`
                        }
                    }
                );
                if (response.data.success) {
                    localStorage.removeItem('user_img');
                    localStorage.setItem('user_img', response.data.user_img);
                    window.alert('Profile Photo Updated!');
                } else {
                    console.log('Error getting image!');
                }
            } else {
                window.alert(resp.data.message);
            }
        } catch (error) {
            console.error('Error updating profile picture:', error);
        }
    };

    // Fetch user data
    const fetchUserData = async () => {
        try {
            const resp = await axios.post(
                'http://localhost:5000/api/user/get_user_cred',
                {},
                { headers: { Authorization: `${UP_token}` } }
            );
            if (resp.data.success) {
                setU_Cred({
                    name: resp.data.name,
                    email: resp.data.email,
                });
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Fetch token from localStorage on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setShowUP(true);
            setUP_token(token);
        }
    }, []);

    // Fetch user data when token is available
    useEffect(() => {
        if (UP_token) {
            fetchUserData();
        }
    }, [UP_token]);

    // Handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setU_Cred((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const updateForm = async (event) => {
        event.preventDefault();
        const get_userID = await axios.post('http://localhost:5000/api/user/Token_decryption', {}, { headers: { Authorization: `${UP_token}` } });
        if (get_userID.data.success) {
            const userId = get_userID.data.userID;
            const form_instance = new FormData();
            form_instance.append('userID', userId);
            form_instance.append('name', U_Cred.name);
            form_instance.append('image', image); // Use correct key
            await handleUpdate(form_instance);
        }
    };

    return (
        <div className='main_User_Profile'>
            {showUP ? (
                <>
                    <div className="profile-container">
                        <div className="profile-info">
                            <div className="profile-image-label">Profile Picture</div>
                            <img className='profile-image' src={`http://localhost:5000/user_images/${user_img}`} alt="User" />
                        </div>
                        <div className="user-info">
                            <h2>{U_Cred.email}</h2>
                            <form onSubmit={updateForm} encType="multipart/form-data">
                                <input type="text" name='name' value={U_Cred.name} onChange={handleInputChange} className='input-field' placeholder="Your Name" required />
                                <input type='file' onChange={(e) => setImage(e.target.files[0])} className='img' name='profilePic' required />
                                <input type="submit" value="Update Profile" className='update-button' />
                            </form>
                            <div className="check_orders_btn">
                                <button className='update-button' onClick={()=>{
                                   Navigator('/my_orders')
                                }} style={{backgroundColor : "orange" , padding: '14px' , margin : '20px' , marginLeft : "2.5px" }}>My Orders</button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <h1>Please log in</h1>
            )}
        </div>
    );
}

export default User_profile;
