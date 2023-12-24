import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [productsList, setProductsList] = useState([]);

  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const queryString = params.toString();

  const idCategory = params.get("idCategory");
  const idBrand = params.get("idBrand");
  const start = params.get("start");
  const end = params.get("end");
  const nameColor = params.get("nameColor");

  // Get data products
  const CallApiProduct = (api, byID, depen, queryString) => {
    useEffect(() => {
      fetch(api + byID, {
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
    }, [byID, depen, queryString]);
  }

  if (idCategory !== null) {
    // Get data products by category
    CallApiProduct('http://127.0.0.1:8000/api/products-showbycategory/', idCategory, idCategory, queryString);
  } else if (idBrand !== null) {
    // Get data products by brand
    CallApiProduct('http://127.0.0.1:8000/api/products-showbybrand/', idBrand, idBrand, queryString);
  } else if (start !== null && end !== null) {
    // Get data products by price
    CallApiProduct(`http://127.0.0.1:8000/api/products-${start}-to-${end}`, '', start + end, null);
  } else if (nameColor !== null) {
    // Get data products by color
    CallApiProduct(`http://127.0.0.1:8000/api/products-color/`, nameColor, nameColor, null);
  } else {
    // Get data products all
    CallApiProduct('http://127.0.0.1:8000/api/products', '');
  }

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />
      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
          <Pagination itemsPerPage={itemsPerPage} productsList={productsList} />
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;
