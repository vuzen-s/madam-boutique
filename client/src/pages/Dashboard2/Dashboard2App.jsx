import { Route, Routes } from "react-router-dom";
import MainLayout from "./scenes/MainLayout/MainLayout";

const Dashboard2App = () => {
    return (
        <Routes>
            <Route path="/*" element={<MainLayout />} />
        </Routes>
    )
}

export default Dashboard2App;
