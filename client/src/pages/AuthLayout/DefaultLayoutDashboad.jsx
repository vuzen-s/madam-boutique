import { Navigate, Outlet } from "react-router-dom"

const DefaultLayoutDashboard = () => {
    const token = sessionStorage.getItem('token')

    return token ? <Outlet /> : <Navigate to="/" />;
}
   
export default DefaultLayoutDashboard;