import React from "react";
import { useNavigate } from "react-router-dom";
import NavTitle from "./NavTitle";

const Price = () => {
  const priceList = [
    {
      _id: 950,
      priceOne: 0,
      priceTwo: 49,
    },
    {
      _id: 951,
      priceOne: 50,
      priceTwo: 99,
    },
    {
      _id: 952,
      priceOne: 100,
      priceTwo: 199,
    },
    {
      _id: 953,
      priceOne: 200,
      priceTwo: 399,
    },
    {
      _id: 954,
      priceOne: 400,
      priceTwo: 599,
    },
    {
      _id: 955,
      priceOne: 600.0,
      priceTwo: 1000.0,
    },
  ];

  const navigate = useNavigate();

  // get product by price
  const handleFilterProductByPrice = (start, end) => {
    navigate(`/shop?start=${start}&end=${end}`);
  }

  return (
    <div className="cursor-pointer">
      <NavTitle title="Shop by Price" icons={false} />
      <div className="font-titleFont">
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {priceList.map((item) => (
            <li
              key={item._id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              <button onClick={() => handleFilterProductByPrice(item.priceOne, item.priceTwo)}>${item.priceOne.toFixed(2)} - ${item.priceTwo.toFixed(2)}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Price;
