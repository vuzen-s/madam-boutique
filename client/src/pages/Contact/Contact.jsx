import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AddressMap } from "../../components/Map/map";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ReCAPTCHA from "react-google-recaptcha"; // Thêm import cho reCAPTCHA
import './contact.css';

const Contact = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);

  const [clientName, setclientName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");

  // ========== Error Messages Start here ============
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMessages, setErrMessages] = useState("");
  // ========== Error Messages End here ==============
  const [successMsg, setSuccessMsg] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleName = (e) => {
    setclientName(e.target.value);
    setErrClientName("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handleMessages = (e) => {
    setMessages(e.target.value);
    setErrMessages("");
  };

  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

  const handlePost = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Enter your Name");
    }
    if (!email) {
      setErrEmail("Enter your Email");
    } else {
      if (!EmailValidation(email)) {
        setErrEmail("Enter a Valid Email");
      }
    }
    if (!messages) {
      setErrMessages("Enter your Messages");
    }
    if (!captchaValue) {
      // Hiển thị lỗi nếu reCAPTCHA chưa được xác minh
      setErrMessages("Please verify that you are not a robot.");
      return;
    }
    if (clientName && email && EmailValidation(email) && messages) {
      setSuccessMsg(
        `Thank you dear ${clientName}, Your messages has been received successfully. Further details will be sent to you by your email at ${email}.`
      );
      // Call API
      fetch('http://127.0.0.1:8000/api/sendmail-contact', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Liên hệ" prevLocation={prevLocation} />
      {successMsg ? (
        <p className="pb-20 w-96 font-medium text-green-500">{successMsg}</p>
      ) : (
        <div className="contact-layout">
          <form className="pb-20">
            <h1 className="font-titleFont font-semibold text-3xl">
              Điền thông tin vào form
            </h1>
            <div className="w-[500px] h-auto py-6 flex flex-col gap-6">
              <div>
                <p className="text-base font-titleFont font-semibold px-2">Tên</p>
                <input
                  onChange={handleName}
                  value={clientName}
                  className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                  type="text"
                  placeholder="Nhập họ và tên của bạn"
                />
                {errClientName && (
                  <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                    <span className="text-sm italic font-bold">!</span>
                    {errClientName}
                  </p>
                )}
              </div>
              <div>
                <p className="text-base font-titleFont font-semibold px-2">
                  Email
                </p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                  type="email"
                  placeholder="Nhập email của bạn"
                />
                {errEmail && (
                  <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                    <span className="text-sm italic font-bold">!</span>
                    {errEmail}
                  </p>
                )}
              </div>
              <div>
                <p className="text-base font-titleFont font-semibold px-2">
                  Tin nhắn
                </p>
                <textarea
                  onChange={handleMessages}
                  value={messages}
                  cols="30"
                  rows="3"
                  className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor resize-none"
                  type="text"
                  placeholder="Nhập nội dung tin nhắn"
                ></textarea>
                {errMessages && (
                  <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                    <span className="text-sm italic font-bold">!</span>
                    {errMessages}
                  </p>
                )}
              </div>

              {/* Thêm component ReCAPTCHA */}
              <ReCAPTCHA
                sitekey="6LcBfkApAAAAAIHaou6Qlk5E0qZfPXhfwLr_iV5J" //  khóa reCAPTCHA
                onChange={(value) => setCaptchaValue(value)}
                hl="en"
              />

              <button
                onClick={handlePost}
                className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
              >
                Gửi
              </button>
            </div>
          </form>

          <div>
            <h2>Bản đồ của shop</h2>
            <AddressMap />
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
