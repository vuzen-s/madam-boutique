import './SlideLogo.scss';
import Heading from "../Products/Heading";
import * as React from "react";

const SlideLogo = () => {
    return (
        <div style={{padding: '80px 0'}}>
            <Heading heading="Featured in"/>
            <div className="container h-100">
                <div className="row align-items-center h-100">
                    <div className="container rounded">
                        <div className="slider">
                            <div className="logos">
                                <img src={process.env.PUBLIC_URL + '/home/logo_brand/brand1.jpg'} alt="brand1"
                                     className="logo-item"/>
                                <img src={process.env.PUBLIC_URL + '/home/logo_brand/brand2.png'} alt="brand2"
                                     className="logo-item"/>
                                <img src={process.env.PUBLIC_URL + '/home/logo_brand/brand3.png'} alt="brand3"
                                     className="logo-item"/>
                                <img src={process.env.PUBLIC_URL + '/home/logo_brand/brand4.png'} alt="brand4"
                                     className="logo-item"/>
                                <img src={process.env.PUBLIC_URL + '/home/logo_brand/brand5.png'} alt="brand5"
                                     className="logo-item"/>
                                <img src={process.env.PUBLIC_URL + '/home/logo_brand/brand6.png'} alt="brand6"
                                     className="logo-item"/>
                                <img src={process.env.PUBLIC_URL + '/home/logo_brand/brand7.png'} alt="brand7"
                                     className="logo-item"/>
                                 {/* dư */}
                                <img src={process.env.PUBLIC_URL + '/home/logo_brand/brand9.png'} alt="brand9"
                                     className="logo-item"/>
                                <img src={process.env.PUBLIC_URL + '/home/logo_brand/brand10.png'} alt="brand10"
                                     className="logo-item"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SlideLogo;