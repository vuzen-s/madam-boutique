import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [usersAuthFetch, setUsersAuthFetch] = useState([]);
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')
  const axiosAuth = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      "Content-type": "application/json",
    "Authorization" : `bearer ${token}`
    },
  });

  useEffect(() => {
    axiosAuth
      .get(`api/auth/user-profile`)
      .then((res) => {
        console.log(res.data.user);
        setUsersAuthFetch(res.data.user);
      })
      .catch((e) => {
        if (e.response && e.response.status === 401) {
            sessionStorage.removeItem('token');
            navigate("/signin")
        }
      });
  }, [token]);

  return (
    <AuthContext.Provider value={{ usersAuthFetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
