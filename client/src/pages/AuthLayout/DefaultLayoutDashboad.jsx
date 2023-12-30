import { Navigate, Outlet } from "react-router-dom"
import useAuthContext from "../AuthContext/AuthContext"
// import Page404 from "../Dashboard2/components/Page404/Page404"

const DefaultLayoutDashboard = () => {
    const { userAuth } = useAuthContext()
    
    return userAuth  ? <Outlet /> : <Navigate to="/" />

}
   
export default DefaultLayoutDashboard;