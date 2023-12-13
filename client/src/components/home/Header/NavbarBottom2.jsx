import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { navBarList } from "../../../constants";
import Flex from "../../designLayouts/Flex";

const NavbarBottom2 = () => {
  const [showMenu, setShowMenu] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
  }, []);

  return (
    <div>
      {showMenu && (
        <div className="w-full h-16 bg-gray-300 flex justify-center items-center text-center sticky top-0 z-10 border-b-[1px] border-b-gray-200">
          <nav className="h-full px-4 max-w-container mx-auto relative">
            <Flex className="flex items-center justify-between h-full">
              <div>
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center w-auto z-50 p-0 gap-2"
                >
                  <>
                    {navBarList.map(({ _id, title, link }) => (
                      <NavLink
                        key={_id}
                        className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                        to={link}
                        state={{ data: location.pathname.split("/")[1] }}
                      >
                        <li>{title}</li>
                      </NavLink>
                    ))}
                  </>
                </motion.ul>
              </div>
            </Flex>
          </nav>
        </div>
      )}
    </div>
  );
};

export default NavbarBottom2;
