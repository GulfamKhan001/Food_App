import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {useNavigate}  from 'react-router-dom';
import Cookies from 'js-cookie';

export const AuthContext = React.createContext();
//custom hook that allows components to access context data
export function useAuth() {
    return useContext(AuthContext)
}
function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, userSet] = useState("");
    const [loading, setLoading] = useState(false);
    const [token,setToken] = useState("");

    async function signUp(name,email,password,confirmPassword) {
        const data = await axios.post("https://foodapp-back-8af034b238dd.herokuapp.com/user/signup", {
            name:name,
            email: email,
            password: password,
            confirmPassword:confirmPassword
        });
        // console.log(data,user);
        userSet(user);
    }
    async function login(email, password) {
        try {
            const data = await axios.post("https://foodapp-back-8af034b238dd.herokuapp.com/user/login", {
                email: email,
                password: password
            });
            // console.log("dataaa",data);
            userSet(data.data);
            if (data.data.tok){
                Cookies.set('log',data.data.tok);
                setToken(data.data.tok);
            }
            // console.log(data.data.tok);

            localStorage.setItem("user", JSON.stringify(data.data));
            return data;
        }
        catch (err) {
            console.log(err);
        }
    }
    async function logout() {
        localStorage.removeItem("user")
        Cookies.remove('log');
        setToken(null);
        const data = await axios.get("https://foodapp-back-8af034b238dd.herokuapp.com/user/logout");
        // console.log(data);
        userSet(null);
    }

    useEffect(() => {
        let tok = Cookies.get('log');
        if (tok) {
            setToken(tok);
        }
        async function getUser() {
            let data = localStorage.getItem("user");
            // console.log(data,898787);
            if (data) {
                userSet(JSON.parse(data));
                // console.log(user);
                navigate("/");
            } else {
                userSet(null);
            }
        }
        getUser();
    }, [])

    const value = {
        user,
        login,
        signUp,
        logout,
        token
    }

    return (
        < AuthContext.Provider value={value} >
            {!loading && children}
        </AuthContext.Provider >
    )
}

export default AuthProvider
