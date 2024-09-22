import WBT from 'jsonwebtoken';

export const WTC_DECR = async (req, res, next) => {
    try {
        // Extract the Authorization header
        const token = req.headers['authorization'];
        
        // Check if the Authorization header is present
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token received by the backend' });
        }
        
        // Extract the token part (remove the 'Bearer ' prefix)

        // If there's no token after 'Bearer '

        // Verify the token
        const decrypted_token = await WBT.verify(token, process.env.JWT_SECRET);

        // Do something with the decrypted token (e.g., attach user data to the request)
        req.body.userID = decrypted_token.id;

        // Pass control to the next middleware or route
        next();
    } catch (e) {
        // Handle JWT errors such as token expiration or invalid token
        res.status(403).json({ success: false, message: e.message });
    }
};
