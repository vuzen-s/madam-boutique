import { Navigate, Outlet } from "react-router-dom"
import useAuthContext from "../AuthContext/AuthContext"

const GuestLayoutNormal = () => {
 const { userAuth } = useAuthContext()

 return !userAuth ? <Outlet /> : <Navigate to="/" />
}

export default GuestLayoutNormal;

