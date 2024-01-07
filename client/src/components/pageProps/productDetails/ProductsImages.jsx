import React, {useEffect, useState} from "react";
import {SplOfferData} from "../../../constants";
import {useParams} from "react-router-dom";

const ProductsImages = () => {
    const [publicPath, setPublicPath] = useState("");
    const [productsImages, setProductsImages] = useState("");

    const {id} = useParams();

    /// Get path to public in server
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products-images-publicPath', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data);
                setPublicPath(data.publicProductImagesPath);
            })
            .catch((error) => console.log(error));
    }, []);

    // Get data edit by product ID
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products-images/' + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data);
                console.log(id);
                setProductsImages(data.product_images)
            })
            .catch((error) => console.log(error));
    }, [id]);

    return (
        <div>
            <h3 className="font-titleFont text-xl font-semibold mb-6 underline underline-offset-4 decoration-[1px]">
                Product Images
            </h3>
            <div className="flex flex-col gap-2">
                {productsImages && productsImages.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-4 border-b-[1px] border-b-gray-300 py-1"
                    >
                        <div>
                            <img className="w-24" src={publicPath + '/' + item.file_name} alt={item.filename}/>
                        </div>
                        {/*<div className="flex flex-col gap-2 font-titleFont">*/}
                        {/*    <p className="text-base font-medium">{item.productName}</p>*/}
                        {/*    <p className="text-sm font-semibold">${item.price}</p>*/}
                        {/*</div>*/}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsImages;
