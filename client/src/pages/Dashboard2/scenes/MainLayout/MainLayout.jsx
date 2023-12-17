import React, { useState } from "react";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, Routes, Route} from "react-router-dom";
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
    getItem(<Link to={"user/create"}>User Create</Link>, "4"),
    getItem(<Link to={"user/edit"}>User Edit</Link>, "5"),
  ]),

  getItem("Product", "selectedProduct", <UnorderedListOutlined />, [
    getItem(<Link to={"products"}>Product List</Link>, "7"),
    getItem(<Link to={"product/create"}>Product Create</Link>, "8"),
    getItem(<Link to={"product/edit"}>Product Edit</Link>, "9"),
  ]),

  getItem("Category", "selectedCategory", <AppstoreOutlined />, [
    getItem(<Link to={"categories"}>Category List</Link>, "11"),
    getItem(<Link to={"category/create"}>Category Create</Link>, "12"),
    getItem(<Link to={"category/edit"}>Category Edit</Link>, "13"),
  ]),

  getItem("Team", "15", <TeamOutlined />),
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
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
            <h1 className="font-bold text-xl">Hello, Trường Anh!</h1>
          </div>
          <Space wrap size={16}>
            <Avatar
              style={{
                backgroundColor: "#87d068",
              }}
              icon={<UserOutlined />}
            />
          </Space>
        </Header>

        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Routes>
            <Route path="users" element={<UserList />} />
            <Route path="user/create" element={<UserCreate />} />
            <Route path="user/edit" element={<UserEdit />} />
            <Route path="products" element={<ProductList />} />
            <Route path="product/create" element={<ProductCreate />} />
            <Route path="product/edit" element={<ProductEdit />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="category/create" element={<CategoryCreate />} />
            <Route path="category/edit" element={<CategoryEdit />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
