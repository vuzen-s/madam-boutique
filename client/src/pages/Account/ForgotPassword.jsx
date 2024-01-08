import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  // const [captchaValue, setCaptchaValue] = useState(null);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [isValidEmail, setIsValidEmail] = useState("");


  // const handleCaptchaChange = (value) => {
  //   setCaptchaValue(value);
  // };

  const isFormValid = () => {
    return email.trim() !== "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setIsValidEmail("");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/forgot-password",
        { email }
      );
      if (response.data.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Submit Successfully",
          text: "Please check your email to receive the password reset link!",
          confirmButtonText: "Ok",
          timer: 7000,
        });
      }
    } catch (e) {
      if (e.response.data.status === 422) {
        setErrors(e.response.data.errors);
      }

      if (e.response.data.status === 403) {
        setIsValidEmail(e.response.data.errors);
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full lgl:w-[450px] h-screen flex items-center justify-center"
      >
        <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
          <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-2">
            Forgot Password?
          </h1>
          <p className="underline underline-offset-4 decoration-[0.5px] font-medium text-md mdl:text-lg mb-2.5">
            Please enter your email to receive the password reset link!
          </p>

          <div className="flex flex-col gap-2">
            {/* Email */}
            <div className="flex flex-col gap-.5">
              <p className="font-titleFont text-base font-semibold text-gray-600">
                Email
              </p>
              <input
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-2 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                placeholder="Eg. truonganh@gmail.com"
              />
            </div>
            {errors && typeof errors.email === "string" && (
              <span className="text-sm text-red-500 font-titleFont px-2">
                {errors.email}
              </span>
            )}

            {isValidEmail && (
              <span className="text-sm text-red-500 font-titleFont px-2">
                {isValidEmail}
              </span>
            )}

            {/*Captcha*/}
            {/* <ReCAPTCHA
              sitekey="6LcBfkApAAAAAIHaou6Qlk5E0qZfPXhfwLr_iV5J"
              onChange={handleCaptchaChange}
              hl="en"
              className="w-full"
            /> */}

            <button
              type="submit"
              className={`${
                isFormValid()
                  ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                  : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
              } w-full mt-1.5 text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
            >
              Submit
            </button>

            <p className="text-sm text-center font-titleFont font-medium">
              Return to the {" "}
              <Link to="/signin">
                <span className="font-semibold hover:text-blue-600 duration-300">
                  Sign in
                </span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
