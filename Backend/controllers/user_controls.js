import user_module from "../modules/user_model.js";
import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import validator from 'validator';
import path from 'path';

// Create JWT token function
const create_token = (id) => {
    return JWT.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' }); // token valid for 7 days
};

// User registration function
export const register_user = async (req, res) => {
    let image;
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No profile image uploaded!' });
        }

        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!allowedExtensions.exec(req.file.originalname)) {
            await fs.unlink(path.join('user_images', req.file.filename));
            return res.status(400).json({ success: false, message: 'Invalid image format!' });
        }

        image = req.file.filename;
        const { u_email, u_password, u_name } = req.body;

        if (!u_email || !u_password || !u_name) {
            await fs.unlink(path.join('user_images', image));
            return res.status(400).json({ success: false, message: 'Incomplete credentials!' });
        }

        if (!validator.isEmail(u_email)) {
            await fs.unlink(path.join('user_images', image));
            return res.status(400).json({ success: false, message: 'Invalid email address!' });
        }

        const search_user = await user_module.findOne({ email: u_email });
        if (search_user) {
            await fs.unlink(path.join('user_images', image));
            return res.status(400).json({ success: false, message: 'User already exists!' });
        }

        if (u_password.length < 5) {
            await fs.unlink(path.join('user_images', image));
            return res.status(400).json({ success: false, message: 'Password is too short!' });
        }

        const salt = await bcrypt.genSalt(10);
        const encrypted_pass = await bcrypt.hash(u_password, salt);

        const new_user = new user_module({
            name: u_name,
            email: u_email,
            password: encrypted_pass,
            profile_img: image
        });

        const user = await new_user.save();
        const token = create_token(user._id);

        return res.status(201).json({ success: true, message: 'Account created successfully!', token });
};

// User login function
export const login_user = async (req, res) => {
    try {
        const { u_email, u_password } = req.body;

        if (!validator.isEmail(u_email)) {
            return res.status(400).json({ success: false, message: 'Invalid email address!' });
        }

        const user = await user_module.findOne({ email: u_email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User does not exist!' });
        }

        const is_password_correct = await bcrypt.compare(u_password, user.password);
        if (!is_password_correct) {
            return res.status(400).json({ success: false, message: 'Password mismatch!' });
        }

        const token = create_token(user._id);
        return res.status(200).json({ success: true, message: 'Logged in successfully!', token });
    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ success: false, message: 'Error logging in' });
    }
};

// Get user profile image
export const get_user_img = async (req, res) => {
    try {
        const user = await user_module.findById(req.body.userID);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        return res.status(200).json({
            success: true,
            message: 'Successfully retrieved user image!',
            user_img: user.profile_img
        });
    } catch (error) {
        console.error('Error fetching user image:', error.message);
        return res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// Get user credentials
export const get_user_cred = async (req, res) => {
    try {
        const user = await user_module.findById(req.body.userID);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        return res.status(200).json({ success: true, name: user.name, email: user.email });
    } catch (error) {
        console.error('Error fetching user credentials:', error.message);
        return res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// Delete profile picture
export const delete_pfp = async (req, res) => {
    const { user_img, userID } = req.body;

    try {
        const user = await user_module.findById(userID);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        if (user_img && user_img !== 'Unset') {
            await fs.access(`user_images/${user_img}`); // Check if the file exists
            await fs.unlink(`user_images/${user_img}`);
        }

        user.profile_img = 'Unset';
        await user.save();

        return res.status(200).json({ success: true, message: 'Profile image deleted successfully.' });
    } catch (error) {
        console.error('Error deleting profile picture:', error.message);
        return res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// Update profile picture
export const update_pfp = async (req, res) => {
        const { name, userID } = req.body;
        const image_name = req.file ? req.file.filename : null;

        if (!userID || !name || !image_name) {
            return res.status(400).json({ success: false, message: 'User ID, image name, and name are required.' });
        }

        const user = await user_module.findById(userID);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        user.profile_img = image_name;
        user.name = name;
        await user.save();

        
        return res.status(200).json({ success: true, message: 'Profile photo updated!' });
 
};


export const token_decryption = async(req , res)=>{
   try{
    const userID =  req.body.userID
    res.json({success : true,message:'Token decrypted succesfully' , userID : userID})
   } catch(e){
    res.json({success : false,message:'Token Wasn"t decrypted succesfully' , userID : 'Unretrived'})
   }
}