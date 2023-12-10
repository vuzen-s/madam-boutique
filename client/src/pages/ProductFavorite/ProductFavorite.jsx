import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { emptyCart } from "../../assets/images/index";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { addAllToCart, resetFavoriteList } from "../../redux/madamBoutiqueSlice";
import ProductFavoriteItem from './ProductFavoriteItem';

const ProductFavorite = () => {
  const dispatch = useDispatch();
  const productsFavorite = useSelector((state) => state.madamBoutiqueReducer.productsFavorite);

  function handleResetFavoriteList() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(resetFavoriteList());
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }

  return (
    <div className="max-w-container mx-auto px-4">
      <ToastContainer />
      <Breadcrumbs title="Product Favorite" />
      {productsFavorite.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2 className="">Price</h2>
            <h2 className="">Action</h2>
          </div>
          <div className="mt-5">
            {productsFavorite.map((item) => (
              <div key={item._id}>
                <ProductFavoriteItem item={item} />
              </div>
            ))}
          </div>

          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <button
              onClick={() => handleResetFavoriteList()}
              className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
            >
              Reset Favorite List
            </button>

            <div className="flex justify-end">
              <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300"
                onClick={() => dispatch(addAllToCart())}>
                Add all to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Favorite List feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping  Favorite List lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductFavorite;
