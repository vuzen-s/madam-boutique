import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import useAuthContext from "../AuthContext/AuthContext1";
import axios from "axios";
// import Axios from "../AuthContext/Axios";
import Swal from "sweetalert2";

const SignUp1 = () => {
  
  const [errorsRegister, setErrorsRegister] = useState([]);
  const [checked, setChecked] = useState(false);
  const [showErrAgreeTerms, setShowErrAgreeTerms] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
//   const { csrf } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    setErrorsRegister([]);
  }, [fullname, email, password, password_confirmation, gender]);

  const handelSubmitRegister = async (e) => {
    // await csrf();
    e.preventDefault();

    if (!checked) {
      setShowErrAgreeTerms(true);
      return;
    }

    console.log(errorsRegister);

    const data = {
        fullname: fullname,
        email: email,
        gender: gender,
        password: password,
        phone: phone,
        password_confirmation: password_confirmation,
      };

   await axios.post(`http://localhost:8000/api/auth/register`, data).then((res) => {
    if (res.status === 200) {
        navigate("/signin");
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Create Account Successfully",
          showConfirmButton: false,
          timer: 2000,
        })
      }

   })

   .catch((e) => {
      if (e.response.data.status === 422) {
        setErrorsRegister(e.response.data.errors);
        console.log(e.response.data.errors);
      }
    })
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full lgl:w-[500px] h-full flex items-center justify-center">
          <form onSubmit={handelSubmitRegister} className="w-full lgl:w-[500px] h-full flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-2">
                Create your account
              </h1>
              <h2 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-sm mdl:text-base mb-3">
                <Link to="/">
                <span className="hover:text-blue-600 duration-300">
                  Back To Home
                </span>
                </Link>
              </h2>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-.6">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Full Name *
                  </p>
                  <input
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Eg. Le Van Truong Anh"
                  />
                </div>
                { errorsRegister && (
                  <span className=" text-sm text-red-500 font-titleFont px-1">
                    { errorsRegister.fullname}
                </span>
                )}
                {/* Email */}
                <div className="flex flex-col gap-.6">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Email *
                  </p>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="Eg. levantruonganh@gmail.com"
                  />
                </div>
                {errorsRegister && (
                  <span className=" text-sm text-red-500 font-titleFont px-1">
                    { errorsRegister.email}
                  </span>
                )}
                {/* Phone Number & Gender */}
                <div className="flex flex-grow justify-between gap-.6"> 
                  <div className="flex-1 mr-1.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      Gender *
                    </p>
                    <select name="gender" id="" value={gender} onChange={(e) => setGender(e.target.value)} className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-2.5 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none">
                      <option value="Select Gender">Choose Gender</option>
                      <option value="Male" >Male</option>
                      <option value="Female" >Female</option>
                    </select>
                    {errorsRegister && (
                      <span className=" text-sm text-red-500 font-titleFont px-1">
                        { errorsRegister.gender}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 ml-1.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      Phone Number
                    </p>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
                {/* Password */}
                <div className="flex flex-col gap-.6">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password *
                  </p>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                {errorsRegister && (
                  <span className=" text-sm text-red-500 font-titleFont px-1">
                    {errorsRegister.password}
                  </span>
                )}
                {/* Confirm Password */}
                <div className="flex flex-col gap-.6">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Confirm Password *
                  </p>
                  <input
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>
                {errorsRegister && (
                  <span className=" text-sm text-red-500 font-titleFont px-1">
                    {errorsRegister.password ? errorsRegister.password[0] : ''}
                  </span>
                )}
                {/* Checkbox */}
                <div className="flex items-start mdl:items-center gap-2">
                  <input
                    onChange={() => {
                      setChecked(!checked);
                      setShowErrAgreeTerms(false);
                    }}
                    className="w-4 h-4 mdl:mt-0 cursor-pointer mb-2.5 mt-2"
                    type="checkbox"
                  />
                  <p className="text-sm text-primeColor mb-2.5 mt-2">
                    I agree to the OREBI{" "}
                    <span className="text-blue-500">Terms of Service </span>and{" "}
                    <span className="text-blue-500">Privacy Policy</span>.
                  </p>
                </div>

                {showErrAgreeTerms && (
                    <p className=" w-full text-md text-red-500 font-titleFont font-semibold px-1 mb-3">
                      <span className="font-bold text-md italic mr-1">!!! </span>
                        You need to agree to our terms before registering an account
                    </p>
                  )}
                <button
                  type="submit"
                  className={`${
                    checked
                      ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                      : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
                  } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                >
                  Create Account
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                  Don't have an Account?{" "}
                  <Link to="/signin">
                    <span className="hover:text-blue-600 duration-300">
                      Sign in
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
      </div>
    </div>
  );
};

export default SignUp1;
