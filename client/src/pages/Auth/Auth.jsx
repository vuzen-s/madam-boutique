import axios from 'axios';

const AuthUser = () => {

    const http = axios.create({
        baseURL: "http://localhost:8000/api",  
        headers: {
            "Content-Type" : "application/json",
            // "Authorization" : `Bearer ${token}`
        }
    });

    // const SignIn = () => {

    // }
}

export default AuthUser