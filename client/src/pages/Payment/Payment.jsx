import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Form, Input, Steps, message} from 'antd';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';

import useAuthContext from '../AuthContext/AuthContext';
import {toast, ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {resetCart} from '../../redux/madamBoutiqueSlice';
import Swal from 'sweetalert2'
import {Box} from "@mui/material";

const {Step} = Steps;

const Payment = () => {
    const [nameCustomer, setNameCustomer] = useState("");
    const [phoneCustomer, setPhoneCustomer] = useState("");
    const [addressCustomer, setAddressCustomer] = useState("");
    const [method, setMethod] = useState(1);

    const [product_ids, setProduct_ids] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [prices, setPrices] = useState([]);

    const navigate = useNavigate();
    const {state} = useLocation();
    const {authenticatedUser, setAuthenticatedUser} = useAuthContext();
    const [currentStep, setCurrentStep] = useState(0);
    const [step1Form] = Form.useForm(); // Sử dụng form cho bước

    const dispatch = useDispatch();
    const products = useSelector((state) => state.madamBoutiqueReducer.products);

    useEffect(() => {
        // fetchData(); // Gọi hàm để lấy dữ liệu người dùng khi component được tạo ra
    }, []); // Gọi chỉ một lần khi component được tạo ra

    // const fetchData = async () => {
    //     try {
    //         // Gọi API để lấy dữ liệu người dùng
    //         const response = await axios.get(`http://localhost:8000/api/users/${authenticatedUser.id}`);
    //         const userData = response.data;
    //
    //         // Cập nhật state và form với dữ liệu mới
    //         setAuthenticatedUser(userData);
    //         step1Form.setFieldsValue({
    //             name_customer: userData.fullname || '',
    //             phone_customer: userData.phone || '',
    //             address_customer: userData.address || '',
    //         });
    //         //
    //         setNameCustomer(userData.fullname);
    //         setPhoneCustomer(userData.phone);
    //         setAddressCustomer(userData.address);
    //     } catch (error) {
    //         console.error('Error fetching user data:', error);
    //     }
    // };

    const updateUser = async (newUserData) => {
        try {
            // Gọi API để cập nhật dữ liệu người dùng
            await axios.put(`http://localhost:8000/api/user/edit/${authenticatedUser.id}`, newUserData);
            console.log('User data updated successfully');
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const showToastMessage = () => {
        toast.success('Your order has been saved successfully!', {
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

    const [total, setTotal] = useState(0);

    // Call API send mail
    const sendMailOrderNew = () => {
        fetch('http://127.0.0.1:8000/api/sendmail-order', {
            method: "GET", headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => console.log(error));
    }

    // Call API send mail client
    const sendMailOrderNewClient = () => {
        fetch('http://127.0.0.1:8000/api/sendmail-order-client', {
            method: "GET", headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => console.log(error));
    }

    const handlePushInfoPayment0 = async () => {
        const formData = new FormData();
        formData.append('total', total);
        formData.append('cart_date', new Date().toString());
        formData.append('cart_status', 0);
        // item cart detail
        formData.append('user_id', authenticatedUser.id);
        formData.append('name_customer', nameCustomer != null ? nameCustomer : authenticatedUser?.fullname);
        formData.append('phone_customer', phoneCustomer != null ? phoneCustomer : authenticatedUser?.phone);
        formData.append('address_customer', addressCustomer != null ? addressCustomer : authenticatedUser?.address);
        quantities.forEach((quantity, index) => {
            formData.append(`quantities[${index}]`, quantity);
        });
        prices.forEach((price, index) => {
            formData.append(`prices[${index}]`, price);
        });
        product_ids.forEach((product_id, index) => {
            formData.append(`product_ids[${index}]`, product_id);
        });
        // payment
        formData.append('method', method);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/orders-store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(formData);
            if (response.data.errors) {
                console.log(response.data.errors);
            } else {
                Swal.fire({
                    title: "CONFIRMED INFORMATION",
                    text: "Are you sure the payment information provided is correct ?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes I am sure!"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Your order has been saved successfully!",
                            text: "CHECK your order information in your EMAIL NOW.",
                            icon: "success"
                        });
                        // navigate('/cart');
                        // send mail
                        sendMailOrderNew();
                        // send mail client
                        sendMailOrderNewClient();
                        //
                        dispatch(resetCart());
                    }
                });
            }
            //
            // await fetch('http://127.0.0.1:8000/api/orders-store', {
            //     method: "POST",
            //     headers: {
            //         'Content-Type': 'application/json',
            //         // }, body: JSON.stringify({
            //         //     total: total,
            //         //     cart_date: new Date().toString(),
            //         //     cart_status: 1,
            //         //     user_id: authenticatedUser.id,
            //         //     name_customer: nameCustomer,
            //         //     phone_customer: phoneCustomer,
            //         //     address_customer: addressCustomer,
            //         // }), // Chuyển đổi FormData thành đối tượng JSON
            //     }, body: formData,
            // })
            //     .then((respon) => respon.json())
            //     .then((data) => {
            //         // Nếu có lỗi validate từ Laravel, cập nhật trạng thái errors
            //         console.log(data.errors);
            //         // message
            //         console.log(data.message);
            //         // Xử lý dữ liệu thành công nếu cần
            //         if (data.errors === undefined) {
            //             Swal.fire({
            //                 title: "Đơn hàng của bạn đã được lưu thành công!",
            //                 text: "KIỂM TRA NGAY thông tin đơn hàng trong EMAIL của bạn.",
            //                 icon: "success"
            //             });
            //             // navigate('/cart');
            //             // send mail
            //             sendMailOrderNew();
            //             // send mail client
            //             sendMailOrderNewClient();
            //             //
            //             dispatch(resetCart());
            //         }
            //     })
        } catch (error) {
            if (error.response && error.response.status === 422) {
                // Nếu có lỗi validate từ Laravel, cập nhật trạng thái errors
                console.log(error);
            } else {
                // Xử lý lỗi khác nếu có
                console.error('Error:', error);
            }
        }
    }


    const handlePushInfoPayment1 = async () => {
        const formData = new FormData();
        formData.append('total', total);
        formData.append('cart_date', new Date().toString());
        formData.append('cart_status', 1);
        // item cart detail
        formData.append('user_id', authenticatedUser.id);
        formData.append('name_customer', nameCustomer != null ? nameCustomer : authenticatedUser?.fullname);
        formData.append('phone_customer', phoneCustomer != null ? phoneCustomer : authenticatedUser?.phone);
        formData.append('address_customer', addressCustomer != null ? addressCustomer : authenticatedUser?.address);
        quantities.forEach((quantity, index) => {
            formData.append(`quantities[${index}]`, quantity);
        });
        prices.forEach((price, index) => {
            formData.append(`prices[${index}]`, price);
        });
        product_ids.forEach((product_id, index) => {
            formData.append(`product_ids[${index}]`, product_id);
        });
        // payment
        formData.append('method', method);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/orders-store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(formData);
            if (response.data.errors) {
                console.log(response.data.errors);
            } else {
                Swal.fire({
                    title: "Your order has been saved successfully!",
                    text: "CHECK your order information in your EMAIL NOW.",
                    icon: "success"
                });
                // navigate('/cart');
                // send mail
                sendMailOrderNew();
                // send mail client
                sendMailOrderNewClient();
                //
                dispatch(resetCart());
            }
            //
            // await fetch('http://127.0.0.1:8000/api/orders-store', {
            //     method: "POST",
            //     headers: {
            //         'Content-Type': 'application/json',
            //         // }, body: JSON.stringify({
            //         //     total: total,
            //         //     cart_date: new Date().toString(),
            //         //     cart_status: 1,
            //         //     user_id: authenticatedUser.id,
            //         //     name_customer: nameCustomer,
            //         //     phone_customer: phoneCustomer,
            //         //     address_customer: addressCustomer,
            //         // }), // Chuyển đổi FormData thành đối tượng JSON
            //     }, body: formData,
            // })
            //     .then((respon) => respon.json())
            //     .then((data) => {
            //         // Nếu có lỗi validate từ Laravel, cập nhật trạng thái errors
            //         console.log(data.errors);
            //         // message
            //         console.log(data.message);
            //         // Xử lý dữ liệu thành công nếu cần
            //         if (data.errors === undefined) {
            //             Swal.fire({
            //                 title: "Đơn hàng của bạn đã được lưu thành công!",
            //                 text: "KIỂM TRA NGAY thông tin đơn hàng trong EMAIL của bạn.",
            //                 icon: "success"
            //             });
            //             // navigate('/cart');
            //             // send mail
            //             sendMailOrderNew();
            //             // send mail client
            //             sendMailOrderNewClient();
            //             //
            //             dispatch(resetCart());
            //         }
            //     })
        } catch (error) {
            if (error.response && error.response.status === 422) {
                // Nếu có lỗi validate từ Laravel, cập nhật trạng thái errors
                console.log(error);
            } else {
                // Xử lý lỗi khác nếu có
                console.error('Error:', error);
            }
        }
    }


    // Push order
    // const handleFormSubmitPayment = async () => {
    //
    //     Swal.fire({
    //         title: "XÁC NHÂN THÔNG TIN",
    //         text: "Bạn chắc chắn thông tin cung cấp thanh toán là chính xác ?",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Vâng, tôi chắc chắn!"
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             Swal.fire({
    //                 title: "Đơn hàng của bạn đã được lưu thành công!",
    //                 text: "KIỂM TRA NGAY thông tin đơn hàng trong EMAIL của bạn.",
    //                 icon: "success"
    //             });
    //             // await handlePushInfoPayment();
    //         }
    //     });
    // };

    const Step1 = () => {
        // const [form] = Form.useForm();

        const handleChangeInput = (e) => {
            switch (e.target.name) {
                case "name_customer":
                    setNameCustomer(e.target.value);
                    break;
                case "phone_customer":
                    setPhoneCustomer(e.target.value);
                    break;
                case "address_customer":
                    setAddressCustomer(e.target.value);
                    break;
                default:
                    break;
            }
        }

        return (
            <div className="w-full py-8 grid grid-cols-10 h-full max-h-screem gap-4">
                <div className="w-full flex justify-center items-center col-span-6">
                    <img src={process.env.PUBLIC_URL + "/payment-svg/paymentaddress.svg"} alt="paymentform"
                         className="w-[100%] object-contain"/>
                </div>
                <div className="flex w-full flex-col items-center col-span-4 gap-8">
                    <form>
                        <Box>
                            <div className="mb-4">
                                <label htmlFor="name_customer" className="form-label">Name:</label>
                                <input type="text" className="form-control name_customer" id="name_customer"
                                       placeholder="Enter name"
                                       name="name_customer"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone_customer" className="form-label">Phone:</label>
                                <input type="text" className="form-control phone_customer" id="phone_customer"
                                       placeholder="Enter phone"
                                       name="phone_customer"
                                />
                            </div>
                            <div className="mb-8">
                                <label htmlFor="address_customer" className="form-label">Address:</label>
                                <input type="text" className="form-control address_customer" id="address_customer"
                                       placeholder="Enter address"
                                       name="address_customer"
                                />
                            </div>

                        </Box>
                        <Box mt="10px">
                            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                {/*<Button*/}
                                {/*    className="w-36 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"*/}
                                {/*    htmlType="submit"*/}
                                {/*>*/}
                                {/*    Save*/}
                                {/*</Button>*/}
                                <Button
                                    onClick={handleNextStep1}
                                    className="w-36 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
                                >
                                    Next
                                </Button>
                            </div>
                        </Box>
                    </form>
                </div>
            </div>
        );

        // const handleFieldsChange = (changedFields, allFields) => {
        //     // Lặp qua các trường đã thay đổi
        //     changedFields.forEach((changedField) => {
        //         const {name, value} = changedField;
        //         console.log(changedField);
        //         // Cập nhật giá trị mới cho trường trong form
        //         // form.setFieldsValue({[name]: value});
        //         //
        //         switch (changedField.name[0]) {
        //             case 'name_customer':
        //                 setNameCustomer(changedField['value']);
        //                 console.log(changedField['value']);
        //                 break;
        //             case 'phone_customer':
        //                 setPhoneCustomer(changedField['value']);
        //                 console.log(changedField['value']);
        //                 break;
        //             case 'address_customer':
        //                 setAddressCustomer(changedField['value']);
        //                 console.log(changedField['value']);
        //                 break;
        //             default:
        //                 break;
        //         }
        //     });
        // };

        // const onFinish = async (values) => {
        //     const {Name, Phone, Address} = values;
        //
        //     if (!Name || !Phone || !Address) {
        //         message.error('Please fill in all required fields.');
        //         return;
        //     }
        //
        //     const updatedUserData = {
        //         fullname: Name, phone: Phone, address: Address,
        //     };
        //
        //     //     // Cập nhật dữ liệu người dùng khi thông tin được thay đổi
        //     // await updateUser(updatedUserData);
        //     // Cập nhật state và form với dữ liệu mới
        //     setAuthenticatedUser((prevUser) => ({
        //         ...prevUser, ...updatedUserData,
        //     }));
        //     // step1Form.setFieldsValue({
        //     //     ...step1Form.getFieldsValue(), ...updatedUserData,
        //     // });
        //
        //     message.success('User information updated successfully');
        // };

        // return (
        //     <Form
        //         form={step1Form}
        //         onFieldsChange={handleFieldsChange}
        //         onFinish={onFinish}
        //         initialValues={{
        //             name_customer: authenticatedUser?.fullname || '',
        //             phone_customer: authenticatedUser?.phone || '',
        //             address_customer: authenticatedUser?.address || '',
        //         }}
        //     >
        //         <div className="w-full py-8 grid grid-cols-10 h-full max-h-screem gap-4">
        //             <div className="w-full flex justify-center items-center col-span-6">
        //                 <img src="/payment-svg/paymentaddress.svg" alt="paymentform"
        //                      className="w-[100%] object-contain"/>
        //             </div>
        //             <div className="flex w-full flex-col items-center col-span-4 gap-8">
        //                 <p className="text-base font-titleFont font-semibold px-2">Delivery information for you</p>
        //
        //                 <Form.Item label="Name" name="name_customer"
        //                            rules={[{required: true, message: 'Please enter your name'}]}>
        //                     <Input/>
        //                 </Form.Item>
        //
        //                 <Form.Item label="Phone" name="phone_customer"
        //                            rules={[{required: true, message: 'Please enter your phone number'}]}>
        //                     <Input/>
        //                 </Form.Item>
        //
        //                 <Form.Item label="Address" name="address_customer"
        //                            rules={[{required: true, message: 'Please enter your address'}]}>
        //                     <Input.TextArea rows={4}/>
        //                 </Form.Item>
        //
        //                 <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        //                     <Button
        //                         className="w-36 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
        //                         htmlType="submit"
        //                     >
        //                         Save
        //                     </Button>
        //                     <Button
        //                         onClick={handleNext}
        //                         className="w-36 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
        //                     >
        //                         Next
        //                     </Button>
        //                 </div>
        //             </div>
        //         </div>
        //     </Form>
        // );
    };

    const Step2 = () => {
        const {products, totalAmt, shippingCharge} = state.checkoutData || {};
        const totalAmount = totalAmt + shippingCharge;

        setTotal(totalAmount);

        return (<div className=' w-full py-8 grid grid-cols-12 h-full max-h-screem gap-4'>
            <div className='w-full flex justify-center items-center col-span-12'>
                <img src={process.env.PUBLIC_URL + "/payment-svg/paymentform.svg"} alt="paymentform"
                     className='w-[20%] object-contain'/>
            </div>

            <div className='flex w-full flex-col items-center col-span-12 gap-8'>
                <h2 className='text-2xl font-bold'>Invoice details</h2>
                <table className='table-auto w-full'>
                    <thead>
                    <tr className='border bg-gray-300 '>
                        <th className='text-center p-2'>Products ID</th>
                        <th className='text-center p-2'>Products</th>
                        <th className='text-center p-2'>Quantity</th>
                        <th className='text-center p-2'>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((item, i) => (<tr key={item._id}>
                        <td className='text-center p-2 border-b-2'>
                            {/*//*/}
                            <div>
                                <input className="text-center p-2 border-b-2" name="total" value={total}
                                       disabled={true} type="hidden"/>
                                <input className="text-center p-2 border-b-2" name="cart_date"
                                       value={new Date().toString()}
                                       disabled={true} type="hidden"/>
                                <input className="text-center p-2 border-b-2" name="cart_status" value={1}
                                       disabled={true} type="hidden"/>
                                <input className="text-center p-2 border-b-2" name="user_id"
                                       value={authenticatedUser.id}
                                       disabled={true} type="hidden"/>
                            </div>
                            {/*//*/}
                            {/*<input className="text-center p-2 border-b-2" value={item._id}*/}
                            {/*       disabled={true}/>*/}
                            <input className="text-center p-2 border-b-2 product_ids" name="product_ids[]"
                                   value={item._id}
                                   disabled={true}/>
                        </td>
                        <td className='text-center p-2 border-b-2'>
                            <input type="text" className='text-center p-2 border-b-2' value={item.name}
                                   disabled={true}/>
                        </td>
                        <td className='text-center p-2 border-b-2'>
                            {/*<input className='text-center p-2 border-b-2' value={item.quantity}*/}
                            {/*       disabled={true}/>*/}
                            <input className='text-center p-2 border-b-2 quantities' name="quantities[]"
                                   value={item.quantity}
                                   disabled={true}/>
                        </td>
                        <td className='text-center p-2 border-b-2'>
                            {/*<input className='text-center p-2 border-b-2' value={item.price * item.quantity}*/}
                            {/*       disabled={true}/>*/}
                            <input className='text-center p-2 border-b-2 prices' name={`prices[${i}]`}
                                   value={item.price} disabled={true}/>
                        </td>
                    </tr>))}
                    </tbody>
                </table>

                <div className='flex items-center  flex justify-center gap-8-sm '>
                    <span className='text-xl pl-2 text-main font-bold flex-col items-center'>Shipping :</span>
                    <span className='   pl-2 text-xl  text-red-600'>{`${shippingCharge}  USD`}</span>
                </div>

                <div className='flex  flex justify-center gap-8-sm'>
                    <span className='flex  flex-col items-center text-xl p-auto text-main font-bold'>Total :</span>
                    <span className=' pl-2 text-xl  text-red-600'>{`${totalAmount}  USD`}</span>
                </div>

                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button
                        className="w-36 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-400"
                        onClick={handlePrev}
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={handleNextAndPushList}
                        className="w-36 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-400"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>);
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
                                    purchase_units: [{
                                        amount: {
                                            currency_code: 'USD', value: totalAmount, shippingCharge, products,
                                        },
                                    },],
                                });
                            }, onApprove: (data, actions) => {
                                return actions.order.capture().then((details) => {
                                    console.log(details);
                                    if (details) {
                                        handlePushInfoPayment1();
                                    }
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
                    <img src={process.env.PUBLIC_URL + "/payment-svg/payment.svg"} alt="paymentform"
                         className='w-[50%] object-contain'/>
                </div>

                <Button
                    style={{textAlign: 'center'}}
                    className="items-center w-100 mb-10 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-400"
                    onClick={handlePushInfoPayment0}
                >
                    Payment on delivery
                </Button>

                <Form className='pl-[20%] w-[80%] items-center'>
                    <div ref={paypalButtonRef}></div>
                </Form>


                <div style={{display: 'flex', justifyContent: 'center', marginTop: '24px'}}>
                    <Button
                        className="w-36 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-400"
                        onClick={handlePrev}
                    >
                        Previous
                    </Button>
                    {/*<Button*/}
                    {/*    className="w-36 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-400"*/}
                    {/*    onClick={handleFormSubmitPayment}*/}
                    {/*>*/}
                    {/*    Complete*/}
                    {/*</Button>*/}
                </div>
            </div>);
    };

    const handleNextAndPushList = () => {
        const listValPrice = document.querySelectorAll('.text-center.p-2.border-b-2.prices');
        const listValQuantity = document.querySelectorAll('.text-center.p-2.border-b-2.quantities');
        const listValProduct_id = document.querySelectorAll('.text-center.p-2.border-b-2.product_ids');

        if (listValPrice) {
            Array.from(listValPrice).forEach(valPrice => {
                console.log(valPrice.value);
                prices.push(valPrice.value);
            })
            setPrices(prices);
        }

        if (listValQuantity) {
            Array.from(listValQuantity).forEach(valQuantity => {
                console.log(valQuantity.value);
                quantities.push(valQuantity.value);
            })
            setQuantities(quantities);
        }

        if (listValProduct_id) {
            Array.from(listValProduct_id).forEach(valProduct_id => {
                console.log(valProduct_id.value);
                product_ids.push(valProduct_id.value);
            })
            setProduct_ids(product_ids);
        }

        if (nameCustomer === "" || phoneCustomer === "" || addressCustomer === "") {
            message.error('Please fill in all required fields.');
            setCurrentStep(currentStep - 1);
        } else {
            // next
            setCurrentStep(currentStep + 1);
            message.success('User information updated successfully');
        }
    }

    const handleNextStep1 = () => {
        const name_field = document.querySelector('.form-control.name_customer');
        const phone_file = document.querySelector('.form-control.phone_customer');
        const address_field = document.querySelector('.form-control.address_customer');

        console.log(name_field.value);
        console.log(phone_file.value);
        console.log(address_field.value);

        setNameCustomer(name_field.value);
        setPhoneCustomer(phone_file.value);
        setAddressCustomer(address_field.value);

        setCurrentStep(currentStep + 1);
    }

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    const steps = [{
        title: 'Customer information', content: <Step1/>,
    }, {
        title: 'Confirm information', content: <Step2/>,
    }, {
        title: 'Payment', content: <Step3/>,
    },];

    return (<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px'}}>
        <Steps current={currentStep} onChange={(step) => setCurrentStep(step)}>
            {steps.map((item) => (<Step key={item.title} title={item.title}/>))}
        </Steps>
        <div style={{marginTop: '20px', width: '50%'}}>
            {steps[currentStep].content}
        </div>
        <ToastContainer/>
    </div>);
};

export default Payment;
