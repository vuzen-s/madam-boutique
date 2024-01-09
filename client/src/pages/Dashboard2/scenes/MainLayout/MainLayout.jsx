import React, { useState } from "react";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, Routes, Route, Navigate} from "react-router-dom";
import { Avatar, Space } from "antd";
import UserList from "../../components/User/UserList";
import UserCreate from "../../components/User/UserCreate";
import UserEdit from "../../components/User/UserEdit";
import ProductList from "../../components/Product/ProductList";
import ProductCreate from "../../components/Product/ProductCreate";
import ProductEdit from "../../components/Product/ProductEdit";
import CategoryList from "../../components/Category/CategoryList";
import CategoryCreate from "../../components/Category/CategoryCreate";
import CategoryEdit from "../../components/Category/CategoryEdit";
import { motion } from "framer-motion";
import useAuthContext from "../../../AuthContext/AuthContext";
import Page404 from "../../components/Page404/Page404";
import DefaultLayoutDashboard from "../../../AuthLayout/DefaultLayoutDashboad";

const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboard", "1", <Link to={"/dashboard"}><PieChartOutlined /></Link>),

  getItem("User", "selectedUser", <UserOutlined />, [
    getItem(<Link to={"users"}>User List</Link>, "3"),
    getItem(<Link to={"users/create"}>User Create</Link>, "4"),
  ]),

  getItem("Product", "selectedProduct", <UnorderedListOutlined />, [
    getItem(<Link to={"products"}>Product List</Link>, "7"),
    getItem(<Link to={"products/create"}>Product Create</Link>, "8"),
  ]),

  getItem("Category", "selectedCategory", <AppstoreOutlined />, [
    getItem(<Link to={"categories"}>Category List</Link>, "11"),
    getItem(<Link to={"categories/create"}>Category Create</Link>, "12"),
  ]),

  getItem("Team", "15", <TeamOutlined />),
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const { userAuth, logout } = useAuthContext();
  

  console.log(logout)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
    {/* {(userAuth && ([1, 2, 3].includes(userAuth.level))) ? (  */}
      <>
    <Layout className="h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header className="w-full h-auto px-4 mx-auto mb-2 flex items-center justify-between bg-slate-100 cursor-pointer shadow-md" >
          <div>
            <h1 className="font-bold text-xl">Hello!</h1>
          </div>
          <Space wrap size={16}>
            <Avatar
              onClick={() => setShowUser(!showUser)}
              style={{
                backgroundColor: "#87d068",
              }}
              icon={<UserOutlined />}
            />
          </Space>
          {showUser && (
            <motion.ul
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute top-12 mt-2.5 right-5 z-50 bg-gray-800 w-40 h-auto text-center rounded-md"
            >
                <>
                <li className="text-gray-400 px-4 py-1.5 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 rounded-md">
                  <button onClick={logout} className="text-gray-400 w-full">
                    Logout
                  </button>
                </li>
              </>
            </motion.ul>
          )}
        </Header>

        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Routes>
            {/* <Route element={<DefaultLayoutDashboard />}> */}
              <Route path="users" element={<UserList />} />
              <Route path="users/create" element={<UserCreate />} />
              <Route path="users/edit/:id" element={<UserEdit />} />
            
          
              <Route path="products" element={<ProductList />} />
              <Route path="products/create" element={<ProductCreate />} />
              <Route path="products/edit/:id" element={<ProductEdit />} />
          
              <Route path="categories" element={<CategoryList />}/>
              <Route path="categories/create" element={<CategoryCreate />} />
              <Route path="categories/edit/:id" element={<CategoryEdit />} />
            {/* </Route> */}
          </Routes>
        </Content>
      </Layout>
    </Layout>
    </>
    {/* // ) : (
    //   <Navigate to="/404" />
    // )} */}
    </>
  );
};
export default MainLayout;
