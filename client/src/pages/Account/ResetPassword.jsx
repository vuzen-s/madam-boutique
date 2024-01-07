import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const [captchaValue, setCaptchaValue] = useState(null);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [searchParams] = useSearchParams();
  const { token } = useParams();

  useEffect(() => {
    setEmail(searchParams.get("email"));
    console.log(email);
  }, []);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const isFormValid = () => {
    return password.trim() !== "" && password_confirmation.trim !== "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      await axios
        .post(`http://localhost:8000/api/reset-password`, {
          email,
          token,
          password,
          password_confirmation,
        })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Reset Password Successfully",
              confirmButtonText: "Ok",
              timer: 7000,
            });
          }
        });
    } catch (e) {
      if (e.response.data.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
        <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
          <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-2">
            Forgot Password?
          </h1>
          <p className="underline underline-offset-4 decoration-[0.5px] font-semibold text-md mdl:text-lg mb-2.5">
            Please enter your email to receive the password reset link!
          </p>

          <div className="flex flex-col gap-2">

            {/* Password */}
            <div className="flex flex-col gap-.6">
              <label className="font-titleFont text-base font-semibold text-gray-600">
                Password
              </label>
              <input
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                type="password"
                placeholder="Password"
              />
            </div>
            {errors && (
              <span className=" text-sm text-red-500 font-titleFont px-1">
                {errors.password}
              </span>
            )}

            {/* Confirm Password */}
            <div className="flex flex-col gap-.6">
              <label className="font-titleFont text-base font-semibold text-gray-600">
                Confirm Password
              </label>
              <input
                name="password_confirmation"
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                type="password"
                placeholder="Confirm Password"
              />
            </div>
            {errors && (
              <span className=" text-sm text-red-500 font-titleFont px-1">
                {errors.password ? errors.password[0] : ""}
              </span>
            )}

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
              } w-full mt-1.5 text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
            >
              Reset
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

export default ResetPassword;
