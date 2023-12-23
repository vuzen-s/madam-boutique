import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Comments from "../../components/pageProps/productDetails/Comments/Comments";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";

const ProductDetails = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState([]);

  const { id } = useParams();

    // Get data edit by ID
    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/products/' + id, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((respon) => respon.json())
        .then((data) => {
          console.log(data);
          console.log(id);
          setProductInfo(data.product)
          setPrevLocation(location.pathname);
        })
        .catch((error) => console.log(error));
    }, [location, id]);

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="h-full">
            <ProductsOnSale />
          </div>
          <div className="h-full xl:col-span-2">
            <img
              className="w-full h-full object-cover"
              src={productInfo && productInfo.avatar}
              alt={productInfo && productInfo.name}
            />
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
      </div>
      <div>
        <Comments idProduct={id} />
      </div>
    </div>
  );
};

export default ProductDetails;
