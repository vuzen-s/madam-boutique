import { Navigate, Outlet } from "react-router-dom"
import useAuthContext from "../AuthContext/AuthContext"
// import Page404 from "../Dashboard2/components/Page404/Page404"

const DefaultLayoutDashboard = () => {
    const { userAuth } = useAuthContext()
    
    return (userAuth && (userAuth?.level === 1 || userAuth?.level === 2 || userAuth?.level === 3))  ? <Outlet /> : <Navigate to="/" />

}
   
export default DefaultLayoutDashboard;