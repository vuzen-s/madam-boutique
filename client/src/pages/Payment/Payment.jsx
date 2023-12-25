import { useNavigate, useLocation } from 'react-router-dom';

import { Descriptions, Button, Form, Input, Steps, message } from 'antd';
import React, { useEffect, useState ,useRef} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const { Step } = Steps;

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({});
  const { id } = useParams();

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
      const { Name, Phone, Address } = values;
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
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={onFinish}
        initialValues={{
          Name: userData.fullname,
          Phone: userData.phone,
          Address: userData.address,
        }}
      >
        <Form.Item label="Name" name="Name" rules={[{ required: true, message: 'Please enter your name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Phone" name="Phone" rules={[{ required: true, message: 'Please enter your phone number' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="Address" rules={[{ required: true, message: 'Please enter your address' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
          <Button style={{ marginRight: '6px' }} htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    );
  };

  const Step2 = () => {
    const { products, totalAmt, shippingCharge } = state.checkoutData || {};
    const totalAmount = totalAmt + shippingCharge;
  
    return (
      <Descriptions layout="horizontal" column={1} bordered>
        {/* Thông tin khách hàng */}
        <Descriptions.Item label="Name">{userData.fullname}</Descriptions.Item>
        <Descriptions.Item label="Phone">{userData.phone}</Descriptions.Item>
        <Descriptions.Item label="Address">{userData.address}</Descriptions.Item>
    
        {/* Chi tiết sản phẩm và số lượng */}
        <Descriptions.Item label="Product">
          {products.map((item) => (
            <div key={item._id}>
              <p>{`${item.name}(x ${item.quantity}) -- $${item.price}`}</p>
              {/* <p>{`Quantity: ${item.quantity}`}</p> */}
            </div>
          ))}
        </Descriptions.Item>
    
        {/* Tổng giá trị */}
        <Descriptions.Item label="Shipping Charge">${shippingCharge}</Descriptions.Item>
        <Descriptions.Item label="Total">${totalAmount}</Descriptions.Item>
      </Descriptions>
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
                        
                        value: totalAmount ,shippingCharge,
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
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 18 }} layout="horizontal">
        <Button style={{ width: '100%', height: '50px', marginBottom: '20px', padding: '0px', background: 'yellow' }}>
          Cash on Delivery - COD
        </Button>
        <div ref={paypalButtonRef}></div>
      </Form>
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Steps current={currentStep} onChange={(step) => setCurrentStep(step)}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div style={{ marginTop: '20px', width: '50%' }}>
        {steps[currentStep].content}
      </div>
      <div style={{ marginTop: '24px' }}>
        {currentStep < steps.length - 1 && (
          <Button onClick={handleNext}>Next</Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button style={{ margin: '0 8px' }} onClick={handlePrev}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;