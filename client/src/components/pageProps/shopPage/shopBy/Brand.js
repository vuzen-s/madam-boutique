import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";

const Brand = () => {
  const [showBrands, setShowBrands] = useState(true);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandsResponse = await fetch('http://localhost:8000/api/brands');
        const brandsData = await brandsResponse.json();
        setBrands(brandsData.brands);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách brands:', error);
      }
    };

    fetchData();
  }, []);

  const handleBrandClick = async (name) => {
    try {
      const response = await fetch(`http://localhost:8000/api/products?brand=${name}`);
      const data = await response.json();
      setProducts(data.products);
      setSelectedBrand(name);
      
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    }
  };

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
            {brands.map(({ _id, name }) => (
              <li
                key={_id}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
                onClick={() => handleBrandClick(name)}
              >
                {name}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {selectedBrand && (
        <div>
          <h3>Danh sách sản phẩm của thương hiệu {selectedBrand}:</h3>
          <ul>
            {products.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Brand;
