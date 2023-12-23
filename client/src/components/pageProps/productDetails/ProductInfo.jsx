import React from "react";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { addToCart } from "../../../redux/madamBoutiqueSlice";

const ProductInfo = ({ productInfo }) => {

  function dialogMess() {
    Swal.fire("Sản phẩm này không tồn tại!", "", "error");
  }

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo && productInfo.name}</h2>
      <p className="text-xl font-semibold">${productInfo && productInfo.price}</p>
      <p className="text-base text-gray-600">{productInfo && productInfo.desc}</p>
      {/* <p className="text-sm">Be the first to leave a review.</p> */}
      <p className="font-medium text-lg">
        <span className="font-normal">{productInfo ? 'Colors:' + productInfo.color : ''}</span> 
      </p>
      <button
        onClick={() =>
          productInfo != null
            ?
            dispatch(
              addToCart({
                _id: productInfo.id,
                name: productInfo.productName,
                quantity: 1,
                image: productInfo.avatar,
                // badge: productInfo.badge,
                price: productInfo.price,
                colors: productInfo.color,
              })
            )
            : dialogMess()
        }
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Categories:</span> Spring
        collection, Streetwear, Women Tags: featured SKU: N/A
      </p>
    </div>
  );
};

export default ProductInfo;
