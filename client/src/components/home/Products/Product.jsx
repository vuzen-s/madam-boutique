import React, {useEffect, useState} from "react";
import {BsSuitHeartFill} from "react-icons/bs";
import {FaShoppingCart} from "react-icons/fa";
import {MdOutlineLabelImportant} from "react-icons/md";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {addProductsFavorite, addToCart} from "../../../redux/madamBoutiqueSlice";
import Image from "../../designLayouts/Image";
import Badge from './Badge';

const Product = (props) => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const productItem = props;

    const handleProductDetails = () => {
        navigate(`/product/${props.id}`, {
            state: {
                item: productItem,
            },
        });
    };

    return (
        <div className="w-full relative group">
            <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
                <div>
                    <Image className="w-full h-full"
                           imgSrc={props.avatar}/>
                </div>
                <div className="absolute top-6 left-8">
                    {<Badge text={props.category && props.category.name}/>}
                </div>
                <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
                    <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
               
                        <li
                            onClick={() => dispatch(addToCart({
                                _id: props.id, name: props.name, quantity: 1, image: props.avatar, 
                                price: props.price, colors: props.color,
                            }))}
                            className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
                        >
                            Add to Cart
                            <span>
                <FaShoppingCart/>
              </span>
                        </li>
                        <li
                            onClick={handleProductDetails}
                            className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
                        >
                            View Details
                            <span className="text-lg">
                <MdOutlineLabelImportant/>
              </span>
                        </li>
                        <li
                            onClick={() => dispatch(addProductsFavorite({
                                _id: props.id, name: props.name, quantity: 1, image: props.avatar, 
                                price: props.price, colors: props.color,
                            }))}
                            className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
                            Add to Favorite List
                            <span>
                <BsSuitHeartFill/>
              </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
                <div className="flex items-center justify-between font-titleFont">
                    <h2 className="text-lg text-primeColor font-bold" style={{
                        'height': '32px',
                        'overflow': 'hidden',
                        'textOverflow': 'ellipsis',
                        'whiteSpace': 'nowrap',
                        'paddingRight': '4px',
                    }}>
                        {props.name}
                    </h2>
                    <p className="text-[#767676] text-[14px]">${props.price}</p>
                </div>
                <div className="flex items-center justify-between font-titleFont">
                    <div>
                        <p className="text-[#767676] text-[14px]">{props.color}</p>
                    </div>
                    <div>
                        <p className="text-[#767676] text-[14px]">{props.brand && props.brand.name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
