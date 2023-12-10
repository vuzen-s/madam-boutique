import React from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import {
    addToCart,
    deleteFavoriteItem
} from "../../redux/madamBoutiqueSlice";

const ProductFavoriteItem = ({ item }) => {
    const dispatch = useDispatch();

    const showToastMessage = () => {
        toast.success('Deleted', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    
      function handleDeleteFavoriteItem() {
        showToastMessage();
        dispatch(deleteFavoriteItem(item._id));
      }

    return (
        <div className="w-full grid grid-cols-5 mb-4 border py-2">
            <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
                <ImCross
                    onClick={() => handleDeleteFavoriteItem()}
                    className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
                />
                <img className="w-32 h-32" src={item.image} alt="productImage" />
                <h1 className="font-titleFont font-semibold">{item.name}</h1>
            </div>
            <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
                <div className="flex w-1/3 items-center text-lg">
                    ${item.price}
                </div>
                <div className="flex w-1/3 items-center text-lg">
                    <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300"
                        onClick={() => dispatch(addToCart({
                            _id: item.id,
                            name: item.productName,
                            quantity: 1,
                            image: item.img,
                            badge: item.badge,
                            price: item.price,
                            colors: item.color,
                        }))}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductFavoriteItem;
