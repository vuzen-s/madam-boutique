import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import useAuthContext from "../AuthContext/AuthContext";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";

const SignIn1 = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorsLogin, setErrorsLogin] = useState([]);
    const [emailNotExist, setEmailNotExist] = useState("");
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();
    const [captchaValue, setCaptchaValue] = useState(null);

    const isFormValid = () => {
        return email.trim() !== "" && password.trim() !== "";
    };

    useEffect(() => {
        setErrorsLogin([]);
        setEmailNotExist("");
    }, [email, password]);

    useEffect(() => {
        const rememberedEmail = localStorage.getItem("rememberedEmail");

        if (rememberedEmail) {
            setEmail(rememberedEmail);
            setChecked(true);
        }
    }, []);

    const hanldleSubmitLogin = async (e) => {
        e.preventDefault();

        if (!captchaValue) {
            setErrorsLogin(["Please verify that you are not a robot."]);
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8000/api/auth/login",
                { email, password }
            );
            const { access_token } = response.data;

            // Store the tokens in sessionStorage or secure cookie for later use
            sessionStorage.setItem("token", access_token);

            console.log(response.data);

            navigate("/");
        } catch (e) {
            if (e.response.data.status === 401) {
                sessionStorage.removeItem("token");
                navigate("/signin");
            }

            if (e.response.data.status === 422) {
                setErrorsLogin(e.response.data.errors);
            }

            if (e.response.data.status === 401) {
                setEmailNotExist(e.response.data.errors);
            }

            if (e.response.data.status === 403) {
                Swal.fire({
                    icon: "warning",
                    title: "Your account is currently hidden on the system!",
                    text: "Please contact us via email for help. Our Email: madamboutique@gmail.com",
                    confirmButtonText: "Cancle",
                });
            }
        }
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <form
                onSubmit={hanldleSubmitLogin}
                className="w-full lgl:w-[450px] h-screen flex items-center justify-center"
            >
                <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
                    <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-2.5">
                        Sign in
                    </h1>
                    <h2 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-sm mdl:text-base mb-2.5">
                        <Link to="/">
              <span className="hover:text-blue-600 duration-300">
                Back To Home
              </span>
                        </Link>
                    </h2>
                    <div className="flex flex-col gap-2">
                        {/* Email */}
                        <div className="flex flex-col gap-.5">
                            <p className="font-titleFont text-base font-semibold text-gray-600">
                                Email
                            </p>
                            <input
                                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Eg. truonganh@gmail.com"
                            />
                        </div>

                        {errorsLogin && (
                            <span className=" text-sm text-red-500 font-titleFont px-1">
                {errorsLogin.email}
              </span>
                        )}

                        {emailNotExist && (
                            <span className=" text-sm text-red-500 font-titleFont px-1">
                {emailNotExist}
              </span>
                        )}

                        {/* Password */}
                        <div className="flex flex-col gap-.5">
                            <p className="font-titleFont text-base font-semibold text-gray-600">
                                Password
                            </p>
                            <input
                                className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </div>
                        {errorsLogin && (
                            <span className=" text-sm text-red-500 font-titleFont px-1">
                {errorsLogin.password}
              </span>
                        )}
                        <div className="flex justify-between items-center">
                            <div>
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => {
                                        setChecked(!checked);
                                        if (!checked) {
                                            localStorage.setItem("rememberedEmail", email);
                                        } else {
                                            localStorage.removeItem("rememberedEmail");
                                        }
                                    }}
                                    className="text-center"
                                />
                                <span className="text-black text-center"> Remember me</span>
                            </div>
                            <Link to="/forgot-password" className="text-blue-600">For got password?</Link>
                        </div>

                        {/*Captcha*/}
                        <ReCAPTCHA
                            sitekey="6LcBfkApAAAAAIHaou6Qlk5E0qZfPXhfwLr_iV5J"
                            onChange={handleCaptchaChange}
                            hl="en"
                        />

                        <button
                            type="submit"
                            className={`${
                                isFormValid()
                                    ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                                    : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
                            } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                        >
                            Sign In
                        </button>
                        <p className="text-sm text-center font-titleFont font-medium">
                            Don't have an Account?{" "}
                            <Link to="/signup">
                <span className="hover:text-blue-600 duration-300">
                  Sign up
                </span>
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignIn1;