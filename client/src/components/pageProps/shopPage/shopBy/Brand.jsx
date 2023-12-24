import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavTitle from "./NavTitle";

const Brand = () => {
  const [showBrands, setShowBrands] = useState(true);
  const [brandsList, setBrandsList] = useState([]);

  // Get data products
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/brands', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((respon) => respon.json())
      .then((data) => {
        console.log(data.brands);
        setBrandsList(data.brands);
      })
      .catch((error) => console.log(error));
  }, []);

  const navigate = useNavigate();

  // get product by id category
  const handleFilterProductByBrand = (idBrand) => {
    navigate(`/shop?idBrand=${idBrand}`);
  }

  return (
    <div>
      <div
        onClick={() => setShowBrands(!showBrands)}
        className="cursor-pointer"
      >
        <NavTitle title="Shop by Brand" icons={true} />
      </div>
      {showBrands && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {brandsList.map((item) => (
              <li
                key={item.id}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
              >
                <button onClick={() => handleFilterProductByBrand(item.id)}>{item.name}</button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Brand;
