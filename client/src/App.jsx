import {
    Route,
    RouterProvider,
    Routes,
    createBrowserRouter,
    createRoutesFromElements
} from "react-router-dom";
import {useEffect} from 'react';

// import NavbarBottom from "./components/home/Header/NavbarBottom";

import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
// import Blog from "./pages/Blog/Blog";
import BlogList from "./components/BlogList/BlogList";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
// import DashboardApp from "./pages/Dashboard/DashboardApp";
import DashBoardMain from './pages/DashBoardMain/DashBoardMain';


import Layout from "./Layout";
import DefaultLayoutProfile from "./pages/AuthLayout/DefaultLayoutProfile";
import GuestLayoutNormal from "./pages/AuthLayout/GuestLayoutNormal";
import Page404 from "./pages/Dashboard2/components/Page404/Page404";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/Payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ProductFavorite from "./pages/ProductFavorite/ProductFavorite";
import Profile from "./pages/Profile/Profile";
import Shop from "./pages/Shop/Shop";
import {getMessagingToken, onMessageListener} from "./firebase.ts";
import 'firebase/auth';
import 'firebase/firestore';

const App = () => {
    useEffect(() => {
        getMessagingToken();
    }, [])

    useEffect(() => {
        onMessageListener().then(data => {
            console.log("Receive foreground: ", data)
        })
    })

    useEffect(() => {
        getMessagingToken();
        const channel = new BroadcastChannel("notifications");
        channel.addEventListener("message", (event) => {
            console.log("Receive background: ", event.data);
        });
    }, [])

    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    {/* ==================== Header Navlink Start here =================== */}
                    <Route index element={<Home/>}></Route>
                    <Route path="/shop" element={<Shop/>}></Route>
                    <Route path="/about" element={<About/>}></Route>
                    <Route path="/contact" element={<Contact/>}></Route>
                    <Route path="/blog" element={<BlogList/>}></Route>
                    {/* ==================== Header Navlink End here ===================== */}
                    <Route path="/offer" element={<Offer/>}></Route>
                    <Route path="/product/:id" element={<ProductDetails/>}></Route>
                    <Route path="/favorite" element={<ProductFavorite/>}></Route>
                    <Route path="/cart" element={<Cart/>}></Route>
                    <Route path="/paymentgateway" element={<Payment/>}></Route>

                    <Route element={<DefaultLayoutProfile/>}>
                        <Route path="/profile" element={<Profile/>}></Route>
                    </Route>
                </Route>
                {/* // */}

                <Route element={<GuestLayoutNormal/>}>
                    <Route path="/signup" element={<SignUp/>}></Route>
                    <Route path="/signin" element={<SignIn/>}></Route>
                </Route>

                {/* <Route path="/dashboard/*" element={<Dashboard2App />}></Route> */}
                <Route path="/dashboard/*" element={<DashBoardMain/>}></Route>
                {/* </Route> */}
                <Route path="/404" element={<Page404/>}></Route>
            </Routes>
        </div>
    );
};

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Routes>
//       <Route path="/" element={<Layout />}>
//         {/* ==================== Header Navlink Start here =================== */}
//         <Route index element={<Home />}></Route>
//         <Route path="/shop" element={<Shop />}></Route>
//         <Route path="/about" element={<About />}></Route>
//         <Route path="/contact" element={<Contact />}></Route>
//         <Route path="/blog" element={<BlogList />}></Route>
//         {/* ==================== Header Navlink End here ===================== */}
//         <Route path="/offer" element={<Offer />}></Route>
//         <Route path="/product/:_id" element={<ProductDetails />}></Route>
//         <Route path="/favorite" element={<ProductFavorite />}></Route>
//         <Route path="/cart" element={<Cart />}></Route>
//         <Route path="/paymentgateway" element={<Payment />}></Route>

//         <Route element={<DefaultLayoutProfile />}>
//           <Route path="/profile" element={<Profile />}></Route>
//         </Route>
//       </Route>
//       {/* // */}

//       <Route element={<GuestLayoutNormal />}>
//         <Route path="/signup" element={<SignUp />}></Route>
//         <Route path="/signin" element={<SignIn />}></Route>
//       </Route>

//       {/* <Route path="/dashboard/*" element={<Dashboard2App />}></Route> */}
//       <Route path="/dashboard/*" element={<DashBoardMain />}></Route>
//       {/* </Route> */}
//       <Route path="/404" element={<Page404 />}></Route>
//     </Routes>
//   )
// );

// function App() {
//   return (
//     <div className="font-bodyFont">
//       <RouterProvider router={router} />
//     </div>
//   );
// }

export default App;
