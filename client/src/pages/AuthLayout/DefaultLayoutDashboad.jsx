import { Navigate, Outlet } from "react-router-dom"
import useAuthContext from "../AuthContext/AuthContext"
// import Page404 from "../Dashboard2/components/Page404/Page404"

const DefaultLayoutDashboard = () => {
    const token = localStorage.getItem('token')

    return token ? <Outlet /> : <Navigate to="/" />;
}
   
export default DefaultLayoutDashboard;