import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import Swal from 'sweetalert2';
import {addToCart} from "../../../redux/madamBoutiqueSlice";

const ProductInfo = ({productInfo}) => {
    const [publicPath, setPublicPath] = useState(null);

    /// Get path to public in server
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products-publicPath', {
            method: "GET", headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data);
                setPublicPath(data.publicPath);
            })
            .catch((error) => console.log(error));
    }, []);

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
                    dispatch(
                        addToCart({
                            _id: productInfo && productInfo.id,
                            name: productInfo && productInfo.productName,
                            quantity: 1,
                            image: productInfo && productInfo.avatar === "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg" ? "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg" : publicPath + '/' + productInfo.avatar,
                            // badge: productInfo.badge,
                            price: productInfo && productInfo.price,
                            colors: productInfo && productInfo.color,
                        })
                    )
                }
                className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductInfo;
