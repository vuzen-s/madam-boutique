import { useState } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const ForgotPassword = () => {
    const [captchaValue, setCaptchaValue] = useState(null);
    const [email, setEmail] = useState("");

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const isFormValid = () => {
        return email.trim() !== "";
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
      <form
        className="w-full lgl:w-[450px] h-screen flex items-center justify-center"
      >
        <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
          <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-2.5">
            Forgot Password?
          </h1>
          <h2 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-sm mdl:text-base mb-2.5">
            <Link to="/signin">
              <span className="hover:text-blue-600 duration-300">
                Back To Login
              </span>
            </Link>
          </h2>
          <p className="underline underline-offset-4 decoration-[0.5px]  font-semibold text-md mdl:text-lg mb-2.5">
            Please enter your email to receive the password reset link !
          </p>
          
          
          <div className="flex flex-col gap-2">
            {/* Email */}
            <div className="flex flex-col gap-.5">
              <p className="font-titleFont text-base font-semibold text-gray-600">
                Email
              </p>
              <input
                className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-2 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                type="email"
                placeholder="Ex. truonganh@gmail.com"
              />
            </div>

            {/*Captcha*/}
            <ReCAPTCHA
              sitekey="6LcBfkApAAAAAIHaou6Qlk5E0qZfPXhfwLr_iV5J"
              onChange={handleCaptchaChange}
              hl="en"
              className="w-full"
            />

            <button
              type="submit"
              className={`${
                isFormValid()
                  ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                  : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
              } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
    )
}

export default ForgotPassword