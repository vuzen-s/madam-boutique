import React, { useEffect, useState } from "react";
// import { FaPlus } from "react-icons/fa";
import NavTitle from "./NavTitle";

const Category = () => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [productsList, setProductsList] = useState([]);

  // Get data categories
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/categories', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((respon) => respon.json())
      .then((data) => {
        console.log(data.categories);
        setCategoriesList(data.categories);
      })
      .catch((error) => console.log(error));
  }, []);

  // Get data products
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((respon) => respon.json())
      .then((data) => {
        console.log(data.products);
        setProductsList(data.products);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleFilterProductByCategory = (idCategory) => {
    fetch('http://127.0.0.1:8000/api/product-showbycategory/' + idCategory, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((respon) => respon.json())
      .then((data) => {
        console.log(data.products);
        setCategoriesList(data.products);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {categoriesList.map((item, index) => (
            <li
              key={index}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between"
              onClick={() => handleFilterProductByCategory(item.id)}
            >
              {item.name}
              {/* {icons && (
                <span
                  onClick={() => setShowSubCatOne(!showSubCatOne)}
                  className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                >
                  <ImPlus />s
                </span>
              )} */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
