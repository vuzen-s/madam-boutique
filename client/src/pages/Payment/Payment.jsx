import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Form, Input, Steps, message} from 'antd';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';

import useAuthContext from '../AuthContext/AuthContext';
import {toast, ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {resetCart} from '../../redux/madamBoutiqueSlice';
import Swal from 'sweetalert2'

const {Step} = Steps;

const Payment = () => {
    const [nameCustomer, setNameCustomer] = useState("");
    const [phoneCustomer, setPhoneCustomer] = useState("");
    const [addressCustomer, setAddressCustomer] = useState("");

    const navigate = useNavigate();
    const {state} = useLocation();
    const {authenticatedUser, setAuthenticatedUser} = useAuthContext();
    const [currentStep, setCurrentStep] = useState(0);
    const [step1Form] = Form.useForm(); // Sử dụng form cho bước

    const dispatch = useDispatch();
    const products = useSelector((state) => state.madamBoutiqueReducer.products);

    useEffect(() => {
        fetchData(); // Gọi hàm để lấy dữ liệu người dùng khi component được tạo ra
    }, []); // Gọi chỉ một lần khi component được tạo ra

    const fetchData = async () => {
        try {
            // Gọi API để lấy dữ liệu người dùng
            const response = await axios.get(`http://localhost:8000/api/users/${authenticatedUser.id}`);
            const userData = response.data;

            // Cập nhật state và form với dữ liệu mới
            setAuthenticatedUser(userData);
            step1Form.setFieldsValue({
                name_customer: userData.fullname || '',
                phone_customer: userData.phone || '',
                address_customer: userData.address || '',
            });
            //
            setNameCustomer(userData.fullname);
            setPhoneCustomer(userData.phone);
            setAddressCustomer(userData.address);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

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
        toast.success('Đơn hàng của bạn đã được lưu thành công!', {
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

    const handlePushInfoPayment = async () => {
        try {
            await fetch('http://127.0.0.1:8000/api/orders-store', {
                method: "POST", headers: {
                    'Accept': 'application/json', 'Content-Type': 'application/json',
                }, body: JSON.stringify({
                    total: total,
                    cart_date: new Date().toString(),
                    cart_status: 1,
                    user_id: authenticatedUser.id,
                    name_customer: nameCustomer,
                    phone_customer: phoneCustomer,
                    address_customer: addressCustomer,
                }), // Chuyển đổi FormData thành đối tượng JSON
            })
                .then((respon) => respon.json())
                .then((data) => {
                    // Nếu có lỗi validate từ Laravel, cập nhật trạng thái errors
                    console.log(data.errors);
                    // message
                    console.log(data.message);
                    // Xử lý dữ liệu thành công nếu cần
                    if (data.errors === undefined) {
                        dispatch(resetCart());
                        // send mail
                        sendMailOrderNew();
                    }
                })
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
    const handleFormSubmitPayment = async () => {

        Swal.fire({
            title: "XÁC NHÂN THÔNG TIN",
            text: "Bạn chắc chắn thông tin cung cấp thanh toán là chính xác ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Vâng, tôi chắc chắn!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Đơn hàng của bạn đã được lưu thành công!",
                    text: "KIỂM TRA NGAY thông tin đơn hàng trong EMAIL của bạn.",
                    icon: "success"
                });
                await handlePushInfoPayment();
            }
        });
    };

    const Step1 = () => {
        const [form] = Form.useForm();

        // return (
        //     <div className="w-full py-8 grid grid-cols-10 h-full max-h-screem gap-4">
        //         <div className="w-full flex justify-center items-center col-span-6">
        //             <img src="/payment-svg/paymentaddress.svg" alt="paymentform"
        //                  className="w-[100%] object-contain"/>
        //         </div>
        //         <div className="flex w-full flex-col items-center col-span-4 gap-8">
        //             <Formik
        //                 onSubmit={handleFormSubmit}
        //                 initialValues={{
        //                     name_customer: authenticatedUser?.fullname || '',
        //                     phone_customer: authenticatedUser?.phone || '',
        //                     address_customer: authenticatedUser?.address || '',
        //                 }}
        //                 onChange={handleChangeInput}
        //             >
        //                 {({
        //                       handleSubmit,
        //                   }) => (
        //                     <form onSubmit={handleSubmit}>
        //                         <Box>
        //                             <div className="mb-4">
        //                                 <label htmlFor="name_customer" className="form-label">Name:</label>
        //                                 <input type="text" className="form-control" id="name_customer"
        //                                        placeholder="Enter name"
        //                                        name="name_customer" onChange={handleChangeInput}
        //                                        value={authenticatedUser?.fullname}
        //                                 />
        //                             </div>
        //                             <div className="mb-4">
        //                                 <label htmlFor="phone_customer" className="form-label">Name:</label>
        //                                 <input type="text" className="form-control" id="phone_customer"
        //                                        placeholder="Enter phone"
        //                                        name="phone_customer" onChange={handleChangeInput}
        //                                        value={authenticatedUser?.phone}
        //                                 />
        //                             </div>
        //                             <div className="mb-8">
        //                                 <label htmlFor="address_customer" className="form-label">Name:</label>
        //                                 <input type="text" className="form-control" id="address_customer"
        //                                        placeholder="Enter address"
        //                                        name="address_customer" onChange={handleChangeInput}
        //                                        value={authenticatedUser?.address}
        //                                 />
        //                             </div>
        //
        //                         </Box>
        //                         <Box mt="10px">
        //                             <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        //                                 <Button
        //                                     className="w-36 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
        //                                     htmlType="submit"
        //                                 >
        //                                     Save
        //                                 </Button>
        //                                 <Button
        //                                     onClick={handleNext}
        //                                     className="w-36 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
        //                                 >
        //                                     Next
        //                                 </Button>
        //                             </div>
        //                         </Box>
        //                     </form>
        //                 )}
        //             </Formik>
        //         </div>
        //     </div>
        // );

        const handleFieldsChange = (changedFields, allFields) => {
            // Lặp qua các trường đã thay đổi
            changedFields.forEach((changedField) => {
                const {name, value} = changedField;
                console.log(changedField);
                // Cập nhật giá trị mới cho trường trong form
                // form.setFieldsValue({[name]: value});
                //
                switch (changedField.name[0]) {
                    case 'name_customer':
                        setNameCustomer(changedField['value']);
                        console.log(changedField['value']);
                        break;
                    case 'phone_customer':
                        setPhoneCustomer(changedField['value']);
                        console.log(changedField['value']);
                        break;
                    case 'address_customer':
                        setAddressCustomer(changedField['value']);
                        console.log(changedField['value']);
                        break;
                    default:
                        break;
                }
            });
        };

        const onFinish = async (values) => {
            const {Name, Phone, Address} = values;

            if (!Name || !Phone || !Address) {
                message.error('Please fill in all required fields.');
                return;
            }

            const updatedUserData = {
                fullname: Name, phone: Phone, address: Address,
            };

            //     // Cập nhật dữ liệu người dùng khi thông tin được thay đổi
            await updateUser(updatedUserData);
            // Cập nhật state và form với dữ liệu mới
            setAuthenticatedUser((prevUser) => ({
                ...prevUser, ...updatedUserData,
            }));
            step1Form.setFieldsValue({
                ...step1Form.getFieldsValue(), ...updatedUserData,
            });

            message.success('User information updated successfully');
        };

        return (
            <Form
                form={step1Form}
                onFieldsChange={handleFieldsChange}
                onFinish={onFinish}
                initialValues={{
                    name_customer: authenticatedUser?.fullname || '',
                    phone_customer: authenticatedUser?.phone || '',
                    address_customer: authenticatedUser?.address || '',
                }}
            >
                <div className="w-full py-8 grid grid-cols-10 h-full max-h-screem gap-4">
                    <div className="w-full flex justify-center items-center col-span-6">
                        <img src="/payment-svg/paymentaddress.svg" alt="paymentform"
                             className="w-[100%] object-contain"/>
                    </div>
                    <div className="flex w-full flex-col items-center col-span-4 gap-8">
                        <p className="text-base font-titleFont font-semibold px-2">Delivery information for you</p>

                        <Form.Item label="Name" name="name_customer"
                                   rules={[{required: true, message: 'Please enter your name'}]}>
                            <Input/>
                        </Form.Item>

                        <Form.Item label="Phone" name="phone_customer"
                                   rules={[{required: true, message: 'Please enter your phone number'}]}>
                            <Input/>
                        </Form.Item>

                        <Form.Item label="Address" name="address_customer"
                                   rules={[{required: true, message: 'Please enter your address'}]}>
                            <Input.TextArea rows={4}/>
                        </Form.Item>

                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button
                                className="w-36 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
                                htmlType="submit"
                            >
                                Save
                            </Button>
                            <Button
                                onClick={handleNext}
                                className="w-36 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>
        );
    };

    const Step2 = () => {
        const {products, totalAmt, shippingCharge} = state.checkoutData || {};
        const totalAmount = totalAmt + shippingCharge;

        setTotal(totalAmount);

        return (<div className=' w-full py-8 grid grid-cols-12 h-full max-h-screem gap-4'>
            <div className='w-full flex justify-center items-center col-span-12'>
                <img src="/payment-svg/paymentform.svg" alt="paymentform" className='w-[20%] object-contain'/>
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
                    {products.map((item) => (<tr key={item._id}>
                        <td className='text-center p-2 border-b-2'>
                            <input className="text-center p-2 border-b-2" name="$product_ids[]" value={item._id}
                                   disabled={true}/>
                        </td>
                        <td className='text-center p-2 border-b-2'>
                            <input className='text-center p-2 border-b-2' value={item.name} disabled={true}/>
                        </td>
                        <td className='text-center p-2 border-b-2'>
                            <input className='text-center p-2 border-b-2' name="quantity" value={item.quantity}
                                   disabled={true}/>
                        </td>
                        <td className='text-center p-2 border-b-2'>
                            <input className='text-center p-2 border-b-2' value={item.price * item.quantity}
                                   disabled={true}/>
                            <input className='text-center p-2 border-b-2' name="price" value={item.price}
                                   disabled={true} type="hidden"/>
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
                        onClick={handleNext}
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

        return (<div>
            <div className='w-full flex justify-center items-center col-span-4'>
                <img src="/payment-svg/payment.svg" alt="paymentform" className='w-[50%] object-contain'/>
            </div>

            <Form className='pl-[20%] w-[80%] items-center '>
                <div ref={paypalButtonRef}></div>
            </Form>

            <div style={{display: 'flex', justifyContent: 'center', marginTop: '24px'}}>
                <Button
                    className="w-36 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-400"
                    onClick={handlePrev}
                >
                    Previous
                </Button>
                <Button
                    className="w-36 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-400"
                    onClick={handleFormSubmitPayment}
                >
                    Complete
                </Button>
            </div>
        </div>);
    };

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
