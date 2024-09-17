import user_module from "../modules/user_model.js";
import multer from 'multer';
import bcrypt from 'bcrypt';
import fs from 'fs';
import JWT from 'jsonwebtoken';
import validator from "validator";
import path from 'path';  // Import path module to handle file paths

// Create JWT token function
const create_token = (id) => {
    return JWT.sign({ id }, process.env.JWT_SECRET);  // Ensure JWT_SECRET is in your environment
};

// User registration function
export const register_user = async (req, res) => {
    let image;

    try {
        if (!req.file) {
            return res.json({ success: false, message: 'No profile image uploaded!' });
        }
        image = req.file.filename;

        if (!req.body.u_email || !req.body.u_password || !req.body.u_name) {
            return res.json({ success: false, message: 'Incomplete credentials!' });
        }

        const { u_email, u_password, u_name } = req.body;

        // Check if the email already exists in the database
        const search_user = await user_module.findOne({ email: u_email });

        if (search_user) {
            fs.unlink(path.join('user_images', image), (err) => {
                if (err) console.error('Error deleting file:', err);
            });
            return res.json({ success: false, message: "User already exists!" });
        }

        // Validate password length
        if (u_password.length < 5) {
            fs.unlink(path.join('user_images', image), (err) => {
                if (err) console.error('Error deleting file:', err);
            });
            return res.json({ success: false, message: "Password is too short!" });
        }

        // Validate email format
        if (!validator.isEmail(u_email)) {
            fs.unlink(path.join('user_images', image), (err) => {
                if (err) console.error('Error deleting file:', err);
            });
            return res.json({ success: false, message: 'Invalid email address!' });
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const encrypted_pass = await bcrypt.hash(u_password, salt);

        // Create and save the new user
        const user_data = new user_module({
            name: u_name,
            password: encrypted_pass,
            profile_img: image,
            email: u_email,
        });

        const user = await user_data.save();

        // Create a JWT token for the new user
        const token = create_token(user._id);

        // Respond with success message and token
        return res.json({ success: true, message: 'Account created successfully!', token });

    } catch (e) {
        console.error('Error during account creation:', e.message);
        if (image) {
            fs.unlink(path.join('user_images', image), (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }
        return res.json({ success: false, message: 'Error creating account' });
    }
};

// User login function
export const login_user = async (req, res) => {
    try {
        const { u_email, u_password } = req.body;

        // Find user by email
        const user = await user_module.findOne({ email: u_email });
        if (!user) {
            return res.json({ success: false, message: 'User does not exist!' });
        }

        // Compare the password with the hashed password in the database
        const is_password_correct = await bcrypt.compare(u_password, user.password);
        if (!is_password_correct) {
            return res.json({ success: false, message: 'Password mismatch!' });
        }

        // Validate email format (although redundant in this context)
        if (!validator.isEmail(u_email)) {
            return res.json({ success: false, message: 'Invalid email address!' });
        }

        // Create a JWT token for the user
        const token = create_token(user._id);

        // Respond with success message and token
        return res.json({ success: true, message: 'Logged in successfully!', token });

    } catch (e) {
        console.error('Error during login:', e.message);
        return res.json({ success: false, message: 'Error logging in' });
    }
};
