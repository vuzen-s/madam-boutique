import { Outlet } from "react-router-dom";

import SpecialCase from "./components/SpecialCase/SpecialCase";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Navbar from "./components/home/Header/Navbar";
import NavbarBottom2 from "./components/home/Header/NavbarBottom2";

const Layout = () => {

  return (
    <div>
      <Navbar />
      <NavbarBottom2 />
      <SpecialCase />
      {/* <ScrollRestoration /> */}
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

export default Layout;
