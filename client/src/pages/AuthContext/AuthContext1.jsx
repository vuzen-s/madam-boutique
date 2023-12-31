import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "./Axios";
// import AlertSuccess from "./AlertSuccess";
import Swal from "sweetalert2";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState(null);
    const [userNormal, setUserNormal] = useState(null);
    const [errorsRegister, setErrorsRegister] = useState([]);
    const [errorsLogin, setErrorsLogin] = useState([]);
    const [emailNotExist, setEmailNotExist] = useState("");
    const [errorsUpdate, setErrorsUpdate] = useState([]);
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

    const getUserAuth = async () => {
        try {
            const { data } = await Axios.get('api/auth/user-profile');
            setUserAuth(data);
        } catch (e) {
            if (e.response && e.response.status === 401) {
                setUserAuth(null); 
                localStorage.removeItem('token'); 
                navigate("/signin");
            }
        }
    }

    // const login = async ({email, password}) => {
    //     await csrf();
        
    //     try {
    //         const response = await axios.post('api/auth/login', {email, password})
    //         const { access_token, user} = response.data;

    //         localStorage.setItem('token', access_token);

    //         // axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

    //         setUserAuth(user)

    //         // if(response.status === 200){
    //         //     navigate("/")
    //         // }

    //         // if (user.level === 1 || user.level === 2 || user.level === 3) {
    //         //     navigate("/dashboard");
    //         // } else if (user.level === 4) {
    //         //     navigate("/");
    //         // }

    //     } catch(e) {
    //         if(e.response.data.status === 422) {
    //             setErrorsLogin(e.response.data.errors);
    //         }

    //         if(e.response.data.status === 401) {
    //             setEmailNotExist(e.response.data.errors);
    //         }
    //     } 
    // }


    const login = async ({ email, password }) => {
        await csrf();
        
        try {
            const response = await Axios.post('api/auth/login', { email, password });
    
            const { access_token, user } = response.data;
    
            // Lưu token vào localStorage
            localStorage.setItem('token', access_token);
    
            // Đặt token vào header cho tất cả các yêu cầu tiếp theo
            // axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    
            // Lưu thông tin user vào state
            // setUserAuth(user);


            if(response.status === 200){
                setUserAuth(user);
                navigate("/")
            }
    
            // Chuyển hướng người dùng đến trang chính sau khi đăng nhập thành công
            // Tùy thuộc vào loại người dùng, bạn có thể thay đổi điều này
            // if (user.level === 1 || user.level === 2 || user.level === 3) {
            //     navigate("/dashboard");
            // } else if (user.level === 4) {
            //     navigate("/");
            // }
    
        } catch (e) {
            if (e.response && e.response.status === 422) {
                setErrorsLogin(e.response.data.errors);
            }
    
            if (e.response && e.response.status === 401) {
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
        const token = localStorage.getItem('token');
        
        if (!token) {
            console.log("No token found !");
            return;
        }
    
        try {
            await Axios.post('api/auth/logout');
            setUserAuth(null);
            localStorage.removeItem('token');
            navigate("/");
        } catch (e) {
            console.log("Error logout:", e);
            if (e.response && e.response.status === 401) {
                setUserAuth(null);
                localStorage.removeItem('token');
                navigate("/signin");
            }
        }
    }


    const updateProfile = async (formData) => {
        await csrf();

        try {
            const response = await Axios.put('api/auth/update-profile', formData);

            if (response.status === 200) {
                setUserAuth(response.data.user);
                Swal.fire({
                    position: "top-center",
                    icon: 'success',
                    title: 'Update Profile Successfully',
                    text: 'After changing your profile, you need to SignIn again. Thank you!',
                    confirmButtonText: 'Ok',
                    timer: 10000
                });
                // return { success: true, message: "Profile updated successfully" };

            }

        } catch (e) {
            // return { success: false, message: "Error updating profile" };
            // if (e.response && e.response.status === 401) {
            //     setUserAuth(null);
            //     sessionStorage.removeItem('token');
            //     navigate("/signin");
            // }

            if(e.response.data.status === 400) {
                setErrorsUpdate(e.response.data.errors);
                console.log(e.response.data.errors)
            }
        }
    }
    

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getUserAuth();
        }
    }, []);
    



    return <AuthContext.Provider value={{userAuth, login, register, logout, csrf, errorsRegister, errorsLogin, emailNotExist, resetFilterError, errorsUpdate, updateProfile}}>
            {children}
        </AuthContext.Provider>
}

export default function useAuthContext() {
    return useContext(AuthContext)
}

