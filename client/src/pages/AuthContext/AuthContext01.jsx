// import axios from "axios";
// import { createContext, useContext, useEffect, useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import Axios from "./api";
// import Swal from "sweetalert2";

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//     const [userAuth, setUserAuth] = useState(null);
//     const [errorsLogin, setErrorsLogin] = useState([]);
//     const [emailNotExist, setEmailNotExist] = useState("");
//     const [errorsUpdate, setErrorsUpdate] = useState([]);
//     const [token, setToken_] = useState(localStorage.getItem("token"));
//     const [refreshToken, setRefreshToken_] = useState(localStorage.getItem("refreshToken"));
//     const navigate = useNavigate();

//     const csrf = () => Axios.get("/sanctum/csrf-cookie");

//     const getUserAuth = async () => {
//         try {
//             const { data } = await Axios.get('api/auth/user-profile');
//             setUserAuth(data);
//         } catch (e) {
//             if (e.response && e.response.status === 401) {
//                 setUserAuth(null); 
//                 sessionStorage.removeItem('token'); 
//                 navigate("/signin");
//             }
//         }
//     }

//     // const login = async ({email, password}) => {
//     //     await csrf();
        
//     //     try {
//     //         const response = await Axios.post('api/auth/login', {email, password})
//     //         const { access_token, user} = response.data;

//     //         sessionStorage.setItem('token', access_token);

//     //         console.log(user)

//     //         setUserAuth(user)

//     //         console.log(userAuth)

//     //         if(response.status === 200){
//     //             navigate("/")
//     //         }

//     //         // if (user.level === 1 || user.level === 2 || user.level === 3) {
//     //         //     navigate("/dashboard");
//     //         // } else if (user.level === 4) {
//     //         //     navigate("/");
//     //         // }

//     //     } catch(e) {
//     //         if(e.response.data.status === 422) {
//     //             setErrorsLogin(e.response.data.errors);
//     //         }

//     //         if(e.response.data.status === 401) {
//     //             setEmailNotExist(e.response.data.errors);
//     //         }
//     //     } 
//     // }

//     // const resetFilterError = () => {
//     //     setEmailNotExist("");
//     //     setErrorsLogin();
//     // };

      
//     // const logout = async () => {
//     //     const token = sessionStorage.getItem('token');
        
//     //     if (!token) {
//     //         console.log("No token found !");
//     //         return;
//     //     }
    
//     //     try {
//     //         await Axios.post('api/auth/logout');
//     //         setUserAuth(null);
//     //         sessionStorage.removeItem('token');
//     //         navigate("/");
//     //     } catch (e) {
//     //         console.log("Error logout:", e);
//     //         if (e.response && e.response.status === 401) {
//     //             setUserAuth(null);
//     //             sessionStorage.removeItem('token');
//     //             navigate("/signin");
//     //         }
//     //     }
//     // }


//     const updateProfile = async (formData) => {
//         await csrf();

//         try {
//             const response = await Axios.put('api/auth/update-profile', formData);

//             if (response.status === 200) {
//                 setUserAuth(response.data.user);
//                 Swal.fire({
//                     position: "top-center",
//                     icon: 'success',
//                     title: 'Update Profile Successfully',
//                     text: 'After changing your profile, you need to SignIn again. Thank you!',
//                     confirmButtonText: 'Ok',
//                     timer: 10000
//                 });
//                 // return { success: true, message: "Profile updated successfully" };

//             }

//         } catch (e) {
//             // return { success: false, message: "Error updating profile" };
//             // if (e.response && e.response.status === 401) {
//             //     setUserAuth(null);
//             //     sessionStorage.removeItem('token');
//             //     navigate("/signin");
//             // }

//             if(e.response.data.status === 400) {
//                 setErrorsUpdate(e.response.data.errors);
//                 console.log(e.response.data.errors)
//             }
//         }
//     }


//     return <AuthContext.Provider value={{userAuth, getUserAuth, login, logout, errorsLogin, emailNotExist, resetFilterError, errorsUpdate, updateProfile}}>
//             {children}
//         </AuthContext.Provider>
// }

// export default function useAuthContext() {
//     return useContext(AuthContext)
// }

