import { Navigate, Outlet } from "react-router-dom"
import useAuthContext from "../AuthContext/AuthContext"

const DefaultLayoutProfile = () => {
    const { userAuth } = useAuthContext()

    console.log(userAuth)
   
    // return (userAuth && userAuth?.level === 4) ? <Outlet /> : <Navigate to="/" />;
    return userAuth ? <Outlet /> : <Navigate to="/" />;


   }
   
export default DefaultLayoutProfile;