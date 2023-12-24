import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../AuthContext/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, errorsLogin, emailNotExist, resetFilterError} = useAuthContext();
  const [checked, setChecked] = useState(false);

  const isFormValid = () => {
    return email.trim() !== "" && password.trim() !== "";
  };

  useEffect(() => {
    resetFilterError();
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

    try {
      await login({ email, password });
    } catch (e) {
      console.log("Login fail:", e);
    }
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
                placeholder="john@workemail.com"
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
                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
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
              <Link className="text-blue-600">For got password?</Link>
            </div>

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

export default SignIn;
