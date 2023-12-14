
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";



const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);

  return (
    <section className="text-gray-600 body-font">
         <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded"
            alt="since2023"
            src="/about_img/since2023.jpg"
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <Breadcrumbs title="About us" prevLocation={prevLocation} />
          <h2 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          Our Story
            <br className="hidden lg:inline-block" />
            "The Journey of Passion in the World of Fashion"
          </h2>
          <p className="mb-8 leading-relaxed">
         
            Since 2023, Madam Boutique has embarked on its journey with a clear goal: to change the perspective on fashion and offer a fresh and unique shopping experience for customers worldwide. The history of our website formation is a story of commitment and innovation, with the desire to share a passion for style and sophistication in the world of fashion.   
          </p>
         
        </div>
      </div>
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
 
         

          <h2 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Online Store
 
            <br className="hidden lg:inline-block" />Premier Online Shopping"

          </h2>
          <p className="mb-8 leading-relaxed">We are the ideal destination for fashion enthusiasts and those passionate about unique styles. We take pride in being a leading online shopping destination, where we offer customers not only a diverse selection of fashion but also a sophisticated and enjoyable shopping experience.</p>
         
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img className="object-cover object-center rounded" alt="shoponline" src="/about_img/shoponline.jpg" />
        </div>
      </div>

      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img width="50%" height="50%"
            className="object-cover object-center rounded"
            alt="style"
            src="\about_img\style.jpg"
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
         
          <h2 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          Our Style
            <br className="hidden lg:inline-block" />
            "Infused with Our Own Distinctive Style"
          </h2>
          <p className="mb-8 leading-relaxed">
         
          Madam Boutique is a gathering place for top-notch fashion collections and accessories from renowned designers both locally and internationally. We not only select products of the highest quality but also focus on seeking unique, personal, and artistic elements to bring exclusivity to our customers.
          </p>
         
        </div>
      </div>
    </section>
  );
};

export default About;