import {
  Outlet,
  Route,
  Routes,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";



import Navbar from "./components/home/Header/Navbar";
// import NavbarBottom from "./components/home/Header/NavbarBottom";

import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
// import Blog from "./pages/Blog/Blog";
import BlogList from "./components/BlogList/BlogList";
import NavbarBottom2 from "./components/home/Header/NavbarBottom2";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
// import DashboardApp from "./pages/Dashboard/DashboardApp";

import Dashboard2App from "./pages/Dashboard2/Dashboard2App";

import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/Payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ProductFavorite from "./pages/ProductFavorite/ProductFavorite";
import Shop from "./pages/Shop/Shop";
import Layout from "./Layout";
import GuestLayoutNormal from "./pages/GuestLayout/GuestLayoutNormal";
import Profile from "./pages/Profile/Profile";

const App = () => {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/blog" element={<BlogList />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/offer" element={<Offer />}></Route>
        <Route path="/product/:_id" element={<ProductDetails />}></Route>
        <Route path="/favorite" element={<ProductFavorite />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Route>
      {/* // */}
      <Route element={<GuestLayoutNormal />}>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
      </Route>
      <Route path="/dashboard/*" element={<Dashboard2App />}></Route>
    </Routes>
    </div>
 );
};

export default App;

