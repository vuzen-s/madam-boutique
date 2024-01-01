import {useLocation, useNavigate} from 'react-router-dom';

import {Button, Descriptions, Form, Input, Steps, message} from 'antd';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

const {Step} = Steps;

const CheckoutForm = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const [currentStep, setCurrentStep] = useState(0);
    const [userData, setUserData] = useState({});
    const [captchaValue, setCaptchaValue] = useState(null);

    const {id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/user/1`);
                setUserData(response.data.user);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData(); // Gọi hàm fetchData khi component được mount hoặc id thay đổi
    }, [id]);

    const updateUser = async (newUserData) => {
        try {
            await axios.put(`http://localhost:8000/api/user/edit/1`, newUserData);
            console.log('User data updated successfully');
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const Step1 = () => {
        const [form] = Form.useForm();

        const onFinish = (values) => {
            const {Name, Phone, Address} = values;
            if (!Name || !Phone || !Address) {
                message.error('Please fill in all required fields.');
                return;
            }

            const updatedUserData = {
                fullname: Name,
                phone: Phone,
                address: Address,
            };

            updateUser(updatedUserData);
            setUserData({
                ...userData,
                ...updatedUserData,
            });

            message.success('User information updated successfully');
        };

        return (
            <Form
                form={form}
                onFinish={onFinish}
                initialValues={{
                    Name: userData.fullname,
                    Phone: userData.phone,
                    Address: userData.address,
                }}
            >
                {/* form mới */}
                <div className=' w-full py-8 grid grid-cols-10 h-full max-h-screem  gap-4'>

                    <div className='w-full flex justify-center items-center col-span-6'>
                        <img src="/payment-svg/paymentaddress.svg" alt="paymentform"
                             className='w-[100%] object-contain'/>
                    </div>

                    <div className='flex w-full flex-col items-center col-span-4 gap-8'>
                        <p className="text-base font-titleFont font-semibold px-2">"Delivery information for you</p>

                        <Form.Item label="Name" name="Name"
                                   rules={[{required: true, message: 'Please enter your name'}]}
                                   className="w-full py-1 border-b-4 px-1 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor">
                            <Input/>
                        </Form.Item>

                        <Form.Item label="Phone" name="Phone"
                                   rules={[{required: true, message: 'Please enter your phone number'}]}
                                   className="w-full py-1 border-b-4 px-1 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor">
                            <Input/>
                        </Form.Item>

                        <Form.Item label="Address" name="Address"
                                   rules={[{required: true, message: 'Please enter your address'}]}
                                   className="w-full py-1 border-b-4 px-1 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor">
                            <Input.TextArea rows={4}/>
                        </Form.Item>

                        {/* Thêm component ReCAPTCHA */}
                        <ReCAPTCHA
                            sitekey="6LcBfkApAAAAAIHaou6Qlk5E0qZfPXhfwLr_iV5J" //  khóa reCAPTCHA
                            onChange={(value) => setCaptchaValue(true)}
                            hl="en"
                        />

                        <div style={{display: 'flex', justifyContent: 'flex-end',}}>
                            <Button
                                className="w-36 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
                                htmlType="submit"> Save </Button>
                            <Button onClick={handleNext}
                                    className="w-36 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200">Next</Button>
                        </div>
                    </div>
                </div>


            </Form>
        );
    };

    const Step2 = () => {
        const {products, totalAmt, shippingCharge} = state.checkoutData || {};
        const totalAmount = totalAmt + shippingCharge;

        return (


            //moi

            <Form

            >
                {/* form mới */}
                <div className=' w-full py-8 grid grid-cols-10 h-full max-h-screem  gap-4'>

                    <div className='w-full flex justify-center items-center col-span-6'>
                        <img src="/payment-svg/paymentform.svg" alt="paymentform" className='w-[100%] object-contain'/>
                    </div>

                    <div className='flex w-full flex-col items-center col-span-4 gap-8'>
                        <h2 className='text-2xl font-bold'>Invoice details </h2>
                        <table className='table-auto w-full'>
                            <thead>
                            <tr className='border bg-gray-300 '>
                                <th className='text-center p-2'>Products</th>
                                <th className='text-center p-2'>Quantity</th>
                                <th className='text-center p-2'>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((item) => (
                                <tr key={item._id}>


                                    <td className='text-center p-2 border-b-2'>{`${item.name}`} </td>
                                    <td className='text-center p-2 border-b-2'>{`${item.quantity}`}</td>
                                    <td className='text-center p-2 border-b-2'>{`${item.price * item.quantity}  USD`}</td>
                                </tr>))}
                            </tbody>

                        </table>

                        <div className='flex items-center  flex justify-center gap-8-sm '>
                            <span className='text-xl pl-2 text-main font-bold flex-col items-center'>Shipping  :</span>
                            <span className='   pl-2 text-xl  text-red-600'>{`${shippingCharge}  USD`}</span>
                        </div>
                        <div className='flex  flex justify-center gap-8-sm'>
                            <span
                                className='flex  flex-col items-center text-xl p-auto text-main font-bold'>Total :</span>
                            <span className=' pl-2 text-xl  text-red-600'>{`${totalAmount}  USD`}</span>

                        </div>
                        <div style={{display: 'flex', justifyContent: 'center',}}>
                            <Button
                                className="w-36 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-400"
                                onClick={handlePrev}> Previous </Button>
                            <Button onClick={handleNext}
                                    className="w-36 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-400">Next</Button>
                        </div>
                    </div>
                </div>


            </Form>


        );

    };


    const Step3 = () => {
        const paypalButtonRef = useRef();
        const {products, totalAmt, shippingCharge} = state.checkoutData || {};
        const totalAmount = totalAmt + shippingCharge;

        useEffect(() => {
            const script = document.createElement('script');
            script.src = 'https://www.paypal.com/sdk/js?client-id=Af17VKFbPaxzjq4BeurracfmK2uRzc4wfwgkFdhkaxvyCmUFNenmt4-JsbbHN3-7Ehmrzoa4QnL3_KWn';
            script.async = true;

            script.onload = () => {
                if (window.paypal) {
                    window.paypal
                        .Buttons({
                            createOrder: (data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                currency_code: 'USD',

                                                value: totalAmount, shippingCharge, products,
                                            },
                                        },
                                    ],
                                });
                            },
                            onApprove: (data, actions) => {
                                return actions.order.capture().then((details) => {
                                    console.log(details);

                                });
                            },

                        })
                        .render(paypalButtonRef.current);
                }
            };

            script.onerror = (error) => {
                console.error('PayPal SDK failed to load', error);
            };

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }, []);

        return (
            <div>

                <div className='w-full flex justify-center items-center col-span-4'>
                    <img src="/payment-svg/payment.svg" alt="paymentform" className='w-[50%] object-contain'/>

                </div>

                <Form className='pl-[20%] w-[80%] items-center '>
                    <div ref={paypalButtonRef}></div>
                </Form>

                <div style={{display: 'flex', justifyContent: 'center', marginTop: '24px'}}>
                    <Button
                        className="w-36 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-400"
                        onClick={handlePrev}> Previous </Button>

                </div>
            </div>
        );
    };

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    const steps = [
        {
            title: 'Customer information',
            content: <Step1/>,
        },
        {
            title: 'Confirm information',
            content: <Step2/>,
        },
        {
            title: 'Payment',
            content: <Step3/>,
        },
    ];

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px'}}>
            <Steps current={currentStep} onChange={(step) => setCurrentStep(step)}>
                {steps.map((item) => (
                    <Step key={item.title} title={item.title}/>
                ))}
            </Steps>
            <div style={{marginTop: '20px', width: '50%'}}>
                {steps[currentStep].content}
            </div>
        </div>
    );
};

export default CheckoutForm;