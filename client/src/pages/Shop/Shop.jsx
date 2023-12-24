import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };
  const [resfreshData, setResfreshData] = useState(new Date().getTime());

  const [productsList, setProductsList] = useState([]);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const idCategory = params.get("idCategory");

  // Get data products
  const CallApiProduct = (url, params, depen) => {
    useEffect(() => {
      fetch(url + params, {
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
    }, [params, depen]);
  }

  if (idCategory !== null) {
    //
    CallApiProduct('http://127.0.0.1:8000/api/products-showbycategory/', idCategory, idCategory);
    //
    // CallApiProduct('http://127.0.0.1:8000/api/products-showbybrand/', idBrand, idBrand);
  } else {
    // Get data products
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
