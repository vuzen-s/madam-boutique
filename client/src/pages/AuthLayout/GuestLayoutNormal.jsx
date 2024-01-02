import { Navigate, Outlet } from "react-router-dom"
import useAuthContext from "../AuthContext/AuthContext"

const GuestLayoutNormal = () => {
 const token = sessionStorage.getItem('token')

 return !token ? <Outlet /> : <Navigate to="/" />
}

export default GuestLayoutNormal;

