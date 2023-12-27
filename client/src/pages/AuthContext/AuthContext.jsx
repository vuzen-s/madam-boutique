import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Axios from "./Axios";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState(null);
    const [userNormal, setUserNormal] = useState(null);
    const [errorsRegister, setErrorsRegister] = useState([]);
    const [errorsLogin, setErrorsLogin] = useState([]);
    const [emailNotExist, setEmailNotExist] = useState("");
    const navigate = useNavigate();

    const axiosBasic = axios.create({
        baseURL: "http://localhost:8000",
        headers: {
            "Content-type" : "application/json",
        }
    })

    const csrf = () => Axios.get("/sanctum/csrf-cookie");

    const getUser = async () => {
        const {data} = await axiosBasic.get('api/users');
        setUserNormal(data);
    }

    // const getUserAuth = async () => {
    //     const {data} = await Axios.get('api/auth/user-profile');
    //     setUserAuth(data);
    // }

    const getUserAuth = async () => {
        try {
            const { data } = await Axios.get('api/auth/user-profile');
            setUserAuth(data);
        } catch (e) {
            if (e.response && e.response.status === 401) {
                setUserAuth(null); 
                sessionStorage.removeItem('token'); 
                navigate("/signin");
            }
        }
    }

    const login = async ({email, password}) => {
        await csrf();
        
        try {
            const response = await Axios.post('api/auth/login', {email, password})
            const { access_token, user} = response.data;

            sessionStorage.setItem('token', access_token);

            console.log(user)

            setUserAuth(user)

            console.log(userAuth)

            // if (user.level === 1 || user.level === 2 || user.level === 3) {
            //     navigate("/dashboard");
            // } else if (user.level === 4) {
            //     navigate("/");
            // }

        } catch(e) {
            if(e.response.data.status === 422) {
                setErrorsLogin(e.response.data.errors);
            }

            if(e.response.data.status === 401) {
                setEmailNotExist(e.response.data.errors);
            }
        } 
    }

    const resetFilterError = () => {
        setEmailNotExist("");
        setErrorsLogin();
        setErrorsRegister();
    };

    const register = async ({fullname, email, password, password_confirmation, gender, phone}) => {
        await csrf();
        try {
            await Axios.post('api/auth/register', {fullname, email, password, password_confirmation, gender, phone})
            await getUser();
            navigate("/signin");
        } catch(e) {
            if(e.response.data.status === 422) {
                setErrorsRegister(e.response.data.errors);
                console.log(e.response.data.errors)
            }
        }
    }
      
    const logout = async () => {
        const token = sessionStorage.getItem('token');
        
        if (!token) {
            console.log("No token found !");
            return;
        }
    
        try {
            await Axios.post('api/auth/logout');
            setUserAuth(null);
            sessionStorage.removeItem('token');
            navigate("/");
        } catch (e) {
            console.log("Error logout:", e);
            if (e.response && e.response.status === 401) {
                setUserAuth(null);
                sessionStorage.removeItem('token');
                navigate("/signin");
            }
        }
    }

    const refresh = async () => {
        const token = sessionStorage.getItem('token');

        if (!token) {
            return null;
        }

        try {
            const response = await Axios.post('api/auth/refresh');
            const newToken = response.data.access_token;
            
            sessionStorage.setItem('token', newToken);
            
            return newToken;
        } catch (e) {
            console.log("Error refreshing token:", e);
            if (e.response && e.response.status === 401) {
                return false
            }
        }
    }

    const checkAndRefreshToken = useCallback(async () => {
        const token = sessionStorage.getItem('token');

        if (!token) {
            return false;
        }

        // Thư viện jwt-decode biên dịch token để lấy thời gian hết hạn
        const decodedToken = jwtDecode(token);; 
        const expirationTime = decodedToken.exp * 1000; // Convert từ giây sang mili giây

        if (Date.now() >= expirationTime) {
            const newToken = await refresh();

            if (newToken) {
                await getUserAuth(); // Update user info hoặc state nếu cần
                return true;
            } else {
                return false; // Xử lý khi không thể refresh token
            }
        }

        return true;
    }, [])

    useEffect(() => {
        const refreshSuccess = checkAndRefreshToken();
    
        if (!refreshSuccess) {
            navigate("/signin");
        }
    
        const intervalToken = setInterval(() => {
            const refreshSuccess = checkAndRefreshToken();
            if (!refreshSuccess) {
                navigate("/signin");
            }
        }, 50 * 60 * 1000);
    
        return () => clearInterval(intervalToken); 
    }, [checkAndRefreshToken, navigate]);
    

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            getUserAuth();
        }
    }, []);



    return <AuthContext.Provider value={{userAuth, getUserAuth, login, register, logout, errorsRegister, errorsLogin, emailNotExist, resetFilterError}}>
            {children}
        </AuthContext.Provider>
}

export default function useAuthContext() {
    return useContext(AuthContext)
}

