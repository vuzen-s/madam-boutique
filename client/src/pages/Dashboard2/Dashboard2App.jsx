import { Route, Routes } from "react-router-dom";
import MainLayout from "./scenes/MainLayout/MainLayout";
// import Page404 from "./components/Page404/Page404";

const Dashboard2App = () => {
    return (
        <Routes>
            <Route path="/*" element={<MainLayout />} />
        </Routes>
    )
}

export default Dashboard2App;
