import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../AuthContext/AuthContext";

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  // const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [checked, setChecked] = useState(false);
  const {register} = useAuthContext()

  // const handleName = (e) => {
  //   setClientName(e.target.value);
  //   setErrClientName("");
  // };
  // const handleEmail = (e) => {
  //   setEmail(e.target.value);
  //   setErrEmail("");
  // };

  // const handlePassword = (e) => {
  //   setPassword(e.target.value);
  //   setErrPassword("");
  // };


  // const handleSignUp = (e) => {
  //   e.preventDefault();
  //   if (checked) {
  //     if (!clientName) {
  //       setErrClientName("Enter your name");
  //     }

  //     if (!email) {
  //       setErrEmail("Enter your email");
  //     } else {
  //       if (!EmailValidation(email)) {
  //         setErrEmail("Enter a Valid email");
  //       }
  //     }

  //     if (!password) {
  //       setErrPassword("Create a password");
  //     } else {
  //       if (password.length < 6) {
  //         setErrPassword("Passwords must be at least 6 characters");
  //       }
  //     }
  //     // ============== Getting the value ==============
  //     if (
  //       clientName &&
  //       email &&
  //       EmailValidation(email) &&
  //       password &&
  //       password.length >= 6
  //     ) {
  //       setSuccessMsg(
  //         `Hello dear ${clientName}, Welcome you to OREBI Admin panel. We received your Sign up request. We are processing to validate your access. Till then stay connected and additional assistance will be sent to you by your mail at ${email}`
  //       );
  //       setClientName("");
  //       setEmail("");
  //       setPassword("");
  //     }
  //   }
  // };

  const handelSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      await register({fullname, email, password, password_confirmation, gender});
    } catch (e) {
      console.error("Đăng nhập không thành công:", e);
    }
   }
  
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full lgl:w-[500px] h-full flex items-center justify-center">
          <form onSubmit={handelSubmitRegister} className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Create your account
              </h1>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Full Name
                  </p>
                  <input
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Eg. Le Van Truong Anh"
                  />
                </div>
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Email
                  </p>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="Eg. levantruonganh@gmail.com"
                  />
                </div>
                {/* Phone Number & Gender */}
                <div className="flex flex-grow justify-between gap-.5">
                  {/* <div className="flex-1 mr-1.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      Phone Number
                    </p>
                    <input
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="Phone Number"
                    />
                  </div> */}
                  <div className="flex-1 ml-1.5">
                    <p className="font-titleFont text-base font-semibold text-gray-600">
                      Gender
                    </p>
                    <select name="" id="" value={gender} onChange={(e) => setGender(e.target.value)} className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-2 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none">
                      <option value="Select Gender">Select Gender</option>
                      <option value="Male" >Male</option>
                      <option value="Female" >Female</option>
                    </select>
                  </div>
                </div>
                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                {/* Confirm Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Confirm Password
                  </p>
                  <input
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>
                {/* Checkbox */}
                <div className="flex items-start mdl:items-center gap-2">
                  <input
                    // onChange={() => setChecked(!checked)}
                    className="w-4 h-4 mdl:mt-0 cursor-pointer"
                    type="checkbox"
                  />
                  <p className="text-sm text-primeColor">
                    I agree to the OREBI{" "}
                    <span className="text-blue-500">Terms of Service </span>and{" "}
                    <span className="text-blue-500">Privacy Policy</span>.
                  </p>
                </div>
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

export default SignUp;
