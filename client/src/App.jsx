import {
  Route,
  Routes
} from "react-router-dom";



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
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/Payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ProductFavorite from "./pages/ProductFavorite/ProductFavorite";
import Shop from "./pages/Shop/Shop";

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
        </Route>
        {/* // */}
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/dashboard/*" element={<DashBoardMain />}></Route>
      </Routes>
    </div>
  );
}

// function App() {
//   return (
//     <div className="font-bodyFont">
//       <RouterProvider router={router} />
//       <Route path="/dashboard/*" element={<Dashboard2App />}></Route>
//     </Routes>
//     </div>
//  );
// };

export default App;

