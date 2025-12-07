const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

exports.signup = async (req, res) => {
    try {
        const { name, email, password, phone, role_description } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role_description
        });

        await user.save();

        res.status(201).json({
            success: true,
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role_description
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.json({
            success: true,
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role_description,
                progress: user.progress
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.googleAuth = async (req, res) => {
    try {
        console.log("Google Auth Request Body:", req.body);
        const { tokenId, accessToken } = req.body;

        let googleUser = {};

        if (tokenId) {
            // Verify ID Token
            const ticket = await client.verifyIdToken({
                idToken: tokenId,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            googleUser = {
                name: payload.name,
                email: payload.email,
                googleId: payload.sub,
                picture: payload.picture
            };
        } else if (accessToken) {
            // Verify Access Token via UserInfo API
            const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`);
            googleUser = {
                name: response.data.name,
                email: response.data.email,
                googleId: response.data.sub,
                picture: response.data.picture
            };
        } else {
            return res.status(400).json({ message: 'No token provided' });
        }

        const { name, email, googleId, picture } = googleUser;

        let user = await User.findOne({ email });

        if (user) {
            // Check if googleId is already linked, if not link it
            if (!user.googleId) {
                user.googleId = googleId;
                if (!user.avatar) user.avatar = picture;
                await user.save();
            }
        } else {
            // Create new user
            user = new User({
                name,
                email,
                googleId,
                avatar: picture,
                password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10) // random password
            });
            await user.save();
        }

        res.json({
            success: true,
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                progress: user.progress
            }
        });

    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(400).json({ message: 'Google Auth Failed' });
    }
};
