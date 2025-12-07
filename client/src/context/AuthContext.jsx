import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { googleLogout } from '@react-oauth/google';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem('token');
            if (token) {
                try {
                    // Ideally verify token with backend
                    const storedUser = localStorage.getItem('user');
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                    }
                } catch (error) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            }
            setLoading(false);
        };

        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        return res.data;
    };

    const signup = async (userData) => {
        const res = await axios.post(`${BASE_URL}/auth/signup`, userData);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        return res.data;
    };

    const googleLogin = async (tokenResponse) => {
        console.log("Google Token Response:", tokenResponse);
        // Supports both ID Token (credential) and Access Token (access_token)
        const payload = {};
        if (tokenResponse.credential) {
            payload.tokenId = tokenResponse.credential;
        } else if (tokenResponse.access_token) {
            payload.accessToken = tokenResponse.access_token;
        }

        const res = await axios.post(`${BASE_URL}/auth/google`, payload);

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        return res.data;
    };

    const logout = () => {
        googleLogout();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        signup,
        googleLogin,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
