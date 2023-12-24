import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavTitle from "./NavTitle";

const Color = () => {
  const [showColors, setShowColors] = useState(true);
  const colors = [
    {
      _id: 9001,
      title: "Xanh",
      base: "#22c55e",
    },
    {
      _id: 9002,
      title: "Đỏ",
      base: "#dc2626",
    },
    {
      _id: 9004,
      title: "Tím",
      base: "#8a2be2",
    },
    {
      _id: 9005,
      title: "Vàng",
      base: "#f59e0b",
    },
  ];

  const navigate = useNavigate();

  // get product by color
  const handleFilterProductByColor = (nameColor) => {
    navigate(`/shop?nameColor=${nameColor}`);
  }

  return (
    <div>
      <div
        onClick={() => setShowColors(!showColors)}
        className="cursor-pointer"
      >
        <NavTitle title="Shop by Color" icons={true} />
      </div>
      {showColors && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {colors.map((item) => (
              <li
                key={item._id}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2"
              >
                <span
                  style={{ background: item.base }}
                  className={`w-3 h-3 bg-gray-500 rounded-full`}
                ></span>
                <button onClick={() => handleFilterProductByColor(item.title)}>{item.title}</button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Color;
