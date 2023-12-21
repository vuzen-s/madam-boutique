import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "./Axios";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState(null);
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const axiosBasic = axios.create({
        baseURL: "http://localhost:8000",
        headers:{
            "Content-type" : "application/json",
        },
    })

    const csrf = () => Axios.get("/sanctum/csrf-cookie");

    const getUser = async () => {
        const {data} = await axiosBasic.get('api/users');
        setUser(data)
    }

    const getUserAuth = async () => {
        const {data} = await Axios.get('api/auth/user-profile');
        setUserAuth(data);
    }

    const login = async ({email, password}) => {
        await csrf();
        try {
            const response = await Axios.post('api/auth/login', {email, password})
            const { access_token, user } = response.data;

            sessionStorage.setItem('token', access_token);

            setUserAuth(user);

            if (user.level === 1 || user.level === 2 || user.level === 3) {
                navigate("/dashboard");
            } else {
                navigate("/");
            }

        } catch(e) {
            if(e.response.data.status === 422) {
                setErrors(e.response.data.errors);
            }
        }
    }

    const register = async ({fullname, email, password, password_confirmation, gender}) => {
        await csrf();
        try {
            await Axios.post('api/auth/register', {fullname, email, password, password_confirmation, gender})
            await getUser();
            navigate("/signin");
        } catch(e) {
            if(e.response.data.status === 422) {
                setErrors(e.response.data.errors);
            }
        }
    }

    const logout = async () => {
        await Axios.post('api/auth/logout').then(() => {
            setUserAuth(null);
            sessionStorage.removeItem('token');
        })
    }

    const refresh = async () => {
        const token = sessionStorage.getItem('token');

        if (!token) {
            return null;
        }

        try {
            const response = await Axios.post('api/auth/refresh');
            const newToken = response.data.access_token;
            
            // Lưu lại token mới vào sessionStorage
            sessionStorage.setItem('token', newToken);
            
            // Trả về token mới
            return newToken;
        } catch (e) {
            console.e("Error refreshing token:", e);
            return null;
        }
    }

    const checkAndRefreshToken = async () => {
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
    }

    useEffect(() => {
        const refreshSuccess = checkAndRefreshToken();
    
        if (!refreshSuccess) {
            navigate("/signin"); // Xử lý tại đây nếu cần, ví dụ đưa người dùng đến trang đăng nhập
        }
    
        const intervalToken = setInterval(() => {
            const refreshSuccess = checkAndRefreshToken();
            if (!refreshSuccess) {
                navigate("/signin");
            }
        }, 50 * 60 * 1000);  // Cập nhật lại token mỗi 50 phút
    
        return () => clearInterval(intervalToken); 
    }, []);


    return <AuthContext.Provider value={{userAuth, user, getUser , getUserAuth, login, register, logout}}>
            {children}
        </AuthContext.Provider>
}

export default function useAuthContext() {
    return useContext(AuthContext)
}

