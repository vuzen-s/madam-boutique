import React, { useState, useRef, useEffect } from 'react';
import { Form, Input, Button, Steps, Descriptions } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const { Step } = Steps;

const CheckoutForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/user/1`)
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [id]);

  const Step1 = () => (
    <Form
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 18 }}
      layout="horizontal"
      initialValues={{
        Name: userData.fullname,
        Phone: userData.phone,
        Address: userData.address,
      }}
    >
      <Form.Item label="Name" name="Name">
        <Input />
      </Form.Item>
      <Form.Item label="Phone" name="Phone">
        <Input />
      </Form.Item>
      <Form.Item label="Address" name="Address">
        <Input.TextArea rows={4} />
      </Form.Item>
    </Form>
  );

  const Step2 = () => (
    <Descriptions layout="horizontal" column={1} bordered>
      <Descriptions.Item label="Name">
        {userData.Name}
      </Descriptions.Item>
      <Descriptions.Item label="Phone">
        {userData.Phone}
      </Descriptions.Item>
      <Descriptions.Item label="Address">
        {userData.Address}
      </Descriptions.Item>
      <Descriptions.Item label="Product">
       
      </Descriptions.Item>
      <Descriptions.Item label="Quantity">
    
      </Descriptions.Item>
      <Descriptions.Item label="Total">
        
      </Descriptions.Item>
    </Descriptions>
  );

  const Step3 = () => {
    const paypalButtonRef = useRef();

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
                        value: 35,
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
          <Button onClick={handleNext}>
            Next
          </Button>
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
