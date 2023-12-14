import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import './index.css';
import CategoryCreate from "./scenes/Categories/CategoryCreate";
import CategoryEdit from "./scenes/Categories/CategoryEdit";
import CategoryList from "./scenes/Categories/CategoryList";
import CollectionCreate from "./scenes/Collections/CollectionCreate";
import CollectionEdit from "./scenes/Collections/CollectionEdit";
import CollectionList from "./scenes/Collections/CollectionList";
import ProductCreate from "./scenes/Products/ProductCreate";
import ProductEdit from "./scenes/Products/ProductEdit";
import ProductList from "./scenes/Products/ProductList";
import UserCreate from "./scenes/Users/UserCreate";
import UserEdit from "./scenes/Users/UserEdit";
import UserList from "./scenes/Users/UserList";
import Bar from "./scenes/bar";
import Dashboard from "./scenes/dashboard";
import Geography from "./scenes/geography";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import { ColorModeContext, useMode } from "./theme";

function DashboardApp() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app-dashboard">
          <Sidebar isSidebar={isSidebar} />
          <main className="content-dashboard">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
            <Route path="/" element={<Dashboard />} />
              <Route path="user" element={<UserList />} />
              <Route path="user/create" element={<UserCreate />} />
              <Route path="user/edit" element={<UserEdit />} />
              <Route path="collection" element={<CollectionList />} />
              <Route path="collection/create" element={<CollectionCreate />} />
              <Route path="collection/edit" element={<CollectionEdit />} />
              <Route path="category" element={<CategoryList />} />
              <Route path="category/create" element={<CategoryCreate />} />
              <Route path="category/edit" element={<CategoryEdit />} />
              <Route path="product" element={<ProductList />} />
              <Route path="product/create" element={<ProductCreate />} />
              <Route path="product/edit" element={<ProductEdit />} />
              {/* // */}
              <Route path="bar" element={<Bar />} />
              <Route path="pie" element={<Pie />} />
              <Route path="line" element={<Line />} />
              <Route path="geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default DashboardApp;
