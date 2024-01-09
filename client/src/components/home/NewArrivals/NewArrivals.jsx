import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { newArrOne, newArrThree, newArrTwo } from "../../../assets/images";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";

const NewArrivals = () => {
  const [productsList, setProductsList] = useState([]);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  // Get data products
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products', {
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
  }, []);

  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {
          productsList.map((item, index) => (
            <div key={index} className="px-2">
              <Product
                _id={item.id}
                img={item.avatar}
                productName={item.name}
                price={item.price}
                color={item.color}
                // badge={true}
                desc={item.desc}
              />
            </div>
          ))
        }
        <div className="px-2">
          <Product
            _id="100001"
            img={newArrOne}
            productName="Round Table Clock"
            price="44.00"
            color="Black"
            badge={true}
            des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
          />
        </div>
        <div className="px-2">
          <Product
            _id="100002"
            img={newArrTwo}
            productName="Smart Watch"
            price="250.00"
            color="Black"
            badge={true}
            des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
          />
        </div>
        <div className="px-2">
          <Product
            _id="100003"
            img={newArrThree}
            productName="cloth Basket"
            price="80.00"
            color="Mixed"
            badge={true}
            des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
          />
        </div>
       
      </Slider>
    </div>
  );
};

export default NewArrivals;
