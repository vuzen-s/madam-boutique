import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Steps, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

import useAuthContext from '../AuthContext/AuthContext';
import Swal from "sweetalert2";
import api from "../AuthContext/api";
const { Step } = Steps;
const { TextArea } = Input;
const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [userAuth, setUserAuth] = useState([]);
  const [errorsUpdate, setErrorsUpdate] = useState([]);

  const levelMapping = {
    1: "Admin Master",
    2: "Admin Manager",
    3: "Admin Editor",
    4: "Member",
  };

  const { authenticatedUser, setAuthenticatedUser } = useAuthContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [step1FormValues, setStep1FormValues] = useState({
    Name: authenticatedUser?.fullname || '',
    Phone: authenticatedUser?.phone || '',
    Address: authenticatedUser?.address || '',
  });

  useEffect(() => {
    api
    .get(`/api/auth/user-profile`)
    .then((res) => {
      console.log(res.data.user);
      setUserAuth(res.data.user);
    })
    .catch((e) => {
      if (e.response && e.response.status === 401) {
        navigate("/signin");
      }
    });
}, []);

const handleUpdateProfile = (e) => {
  e.preventDefault();

  const data = {
    fullname: userAuth.fullname,
    email: userAuth.email,
    level: userAuth.level,
    gender: userAuth.gender,
    password: userAuth.password,
    phone: userAuth.phone,
    address: userAuth.address,
    password_confirmation: userAuth.password_confirmation,
  };

  api
    .put(`api/auth/update-profile`, data)
    .then((res) => {
      console.log(res.data);

      if (res.status === 200) {
        setUserAuth(res.data.user);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Update Profile Successfully",
          confirmButtonText: "Ok",
          timer: 7000,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }
    })

    .catch((e) => {
      if (e.response && e.response.status === 400) {
        setErrorsUpdate(e.response.data.errors);
        console.log(e.response.data.errors);
      }
    });
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setUserAuth((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

  // const updateUser = async (newUserData) => {
  //   try {
  //     // Gọi API để cập nhật dữ liệu người dùng
  //     await axios.put(`http://localhost:8000/api/user/edit/${authenticatedUser.id}`, newUserData);
  //     console.log('User data updated successfully');
  //   } catch (error) {
  //     console.error('Error updating user data:', error);
  //   }
  // };

  const Step1 = () => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
      const { Name, Phone, Address } = values;

      // if (!Name || !Phone || !Address) {
      //   message.error('Please fill in all required fields.');
      //   return;
      // }

      const updatedUserData = {
        fullname: Name,
        phone: Phone,
        address: Address,
      };

      // // Cập nhật dữ liệu người dùng khi thông tin được thay đổi
      // await updateUser(updatedUserData);
      // // Cập nhật state và form với dữ liệu mới
      // setAuthenticatedUser((prevUser) => ({
      //   ...prevUser,
      //   ...updatedUserData,
      // }));
      // setStep1FormValues({
      //   ...step1FormValues,
      //   ...updatedUserData,
      // });

      message.success(' Save successfully');
    };

    return (
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={step1FormValues}
      >
        <div className="w-full py-8 grid grid-cols-10 h-full max-h-screem gap-4">
          <div className="w-full flex justify-center items-center col-span-6">
            <img src="/payment-svg/paymentaddress.svg" alt="paymentform" className="w-[100%] object-contain" />
          </div>
          <div className="flex w-full flex-col items-center col-span-4 gap-8">
            <p className="text-base font-titleFont font-semibold px-2">Delivery information for you</p>

            {/* <Form.Item label="Name"  name="fullname"
                    value={userAuth === undefined ? "" : userAuth.fullname}>
                      
              <Input />
            </Form.Item> */}

                 <div className="flex flex-col gap-.8">
                  <label
                    htmlFor="fullname"
                    className="font-titleFont text-base font-semibold text-gray-600"
                  >
                    Full Name
                  </label>
                  <input
                    name="fullname"
                    value={userAuth === undefined ? "" : userAuth.fullname}
                    // value={userAuth && userAuth.fullname ? userAuth.fullname : ""}
                    onChange={handleChange}
                    className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Eg. fullname"
                    required 
                  />
                </div>

            {/* <Form.Item label="Phone"  name="phone"
                      value={userAuth === undefined ? "" : userAuth.phone}>
              <Input />
            </Form.Item> */}

                    <div className="flex flex-col gap-.8">
                    <label
                      htmlFor="phone"
                      className="font-titleFont text-base font-semibold text-gray-600"
                    >
                      Phone
                    </label>
                    <input
                      name="phone"
                      //value={userAuth === undefined ? "" : userAuth.phone}
                       value={userAuth && userAuth.phone ? userAuth.phone : ""}
                      onChange={handleChange}
                      className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="Phone Number"
                      required 
                    />
                    {errorsUpdate && (
                      <span className=" text-sm text-red-500 font-titleFont px-2">
                        {errorsUpdate.phone}
                      </span>
                    )}
                  </div>


            {/* <Form.Item label="Address" name="address"
                    value={userAuth === undefined ? "" : userAuth.address}>
              <Input.TextArea rows={4} />
            </Form.Item> */}

                  <div className="flex flex-col gap-.8">
                  <label
                    htmlFor="address"
                    className="font-titleFont text-base font-semibold text-gray-600"
                  >
                    Address
                  </label>
                  <TextArea
                    name="address"
                    //value={userAuth === undefined ? "" : userAuth.address}
                     value={userAuth && userAuth.address ? userAuth.address : ""}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Your Address Is Here"
                    required 
                    maxLength={350}
                    className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  />
                </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                className="w-36 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
                htmlType="success"
                onSubmit={handleUpdateProfile}
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
    const { products, totalAmt, shippingCharge } = state.checkoutData || {};
    const totalAmount = totalAmt + shippingCharge;

    return (
      <div className=' w-full py-8 grid grid-cols-10 h-full max-h-screem gap-4'>
        <div className='w-full flex justify-center items-center col-span-6'>
          <img src="/payment-svg/paymentform.svg" alt="paymentform" className='w-[100%] object-contain' />
        </div>

        <div className='flex w-full flex-col items-center col-span-4 gap-8'>
          <h2 className='text-2xl font-bold'>Invoice details</h2>
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
                </tr>
              ))}
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

          <div style={{ display: 'flex', justifyContent: 'center' }}>
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
      </div>
    );
  };

  const Step3 = () => {
    const paypalButtonRef = useRef();
    const { products, totalAmt, shippingCharge } = state.checkoutData || {};
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
                        value: totalAmount,
                        shippingCharge,
                        products,
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
            <img src="/payment-svg/payment.svg" alt="paymentform" className='w-[50%] object-contain' />
          </div>

          <Form className='pl-[20%] w-[80%] items-center '>
            <div ref={paypalButtonRef}></div>
          </Form>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
            <Button
              className="w-36 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-400"
              onClick={handlePrev}
            >
              Previous
            </Button>
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
        content: <Step1 />,
      },
      {
        title: 'Confirm information',
        content: <Step2 />,
      },
      {
        title: 'Payment',
        content: <Step3 />,
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px' }}>
        <Steps current={currentStep} onChange={(step) => setCurrentStep(step)}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div style={{ marginTop: '20px', width: '50%' }}>
          {steps[currentStep].content}
        </div>
      </div>
    );
  };

export default Payment;
