import React, { useEffect, useState } from "react";
// import AvatarProfile from "../../components/Avatar/Avatar";
import Button from "@mui/material/Button";
import { Input } from "antd";
import TableHistoryPayment from "./Table/TablePayment";
import { Link } from "react-router-dom";
import useAuthContext from "../AuthContext/AuthContext";

const { TextArea } = Input;

const Profile = () => {
  const { userAuth, errorsUpdate, updateProfile } = useAuthContext();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    level: "",
    phone: "",
    gender: "",
    Address: "",
    password: "",
    password_confirmation: "",
  });

  const levelMapping = {
    1: "Admin Master",
    2: "Admin Manager",
    3: "Admin Editor",
    4: "Member",
  };

  useEffect(() => {
    if (userAuth) {
      setFormData({
        fullname: userAuth.fullname,
        email: userAuth.email,
        level: userAuth.level,
        phone: userAuth.phone,
        gender: userAuth.gender,
        Address: userAuth.address,
        password: userAuth.password,
        password_confirmation: userAuth.password_confirmation,
      });
    }
  }, [userAuth]);

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  return (
    <div>
      <div className="max-full h-full flex flex-col px-20 py-4">
        <form onSubmit={handleSubmit}>
          <div>
            {/* <div>
            <AvatarProfile />
          </div> */}

            <div className="w-full h-full flex flex-col md:flex-row justify-between gap-12 mt-4 mb-4">
              <div className="flex-1 flex-col gap-3">
                <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-xl mdl:text-2xl mb-2.5">
                  Your information
                </h1>

                {/* email */}

                <div className="flex flex-col gap-.8">
                  <label
                    htmlFor="email"
                    className="font-titleFont text-base font-semibold text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                    className="w-full h-10 mb-2.5 placeholder:text-sm placeholder:tracking-wide bg-gray-300 px-3 text-base text-gray-500 font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Eg. Le Van Truong Anh"
                  />
                </div>

                {/* full name */}

                <div className="flex flex-col gap-.8">
                  <label
                    htmlFor="fullname"
                    className="font-titleFont text-base font-semibold text-gray-600"
                  >
                    Full Name
                  </label>
                  <input
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full h-10 mb-2.5 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Eg. Le Van Truong Anh"
                  />
                </div>

                {/* {errorsUpdate && (
                  <span className=" text-sm text-red-500 font-titleFont px-2">
                    {errorsUpdate.fullname}
                  </span>
                )} */}

                {/* level */}

                <div className="flex flex-col gap-.8">
                  <label
                    htmlFor="email"
                    className="font-titleFont text-base font-semibold text-gray-600"
                  >
                    Status
                  </label>
                  <input
                    name="level"
                    value={levelMapping[formData.level]}
                    onChange={handleChange}
                    disabled
                    className="w-full h-10 mb-2.5 placeholder:text-sm placeholder:tracking-wide bg-gray-300 px-3 text-base text-gray-500 font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                  />
                </div>

                {/* Gender && Phone Number */}

                <div className="flex flex-grow justify-between gap-.8">
                  <div className="flex-1 mr-1.5">
                    <label
                      htmlFor="gender"
                      className="font-titleFont text-base font-semibold text-gray-600"
                    >
                      Gender
                    </label>
                    <input
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      disabled
                      className="w-full h-10 mb-2.5 placeholder:text-sm placeholder:tracking-wide bg-gray-300 px-3 text-base text-gray-500 font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="Eg. Le Van Truong Anh"
                    />
                  </div>
                  {/* ------  -------  ------ */}
                  <div className="flex-1 ml-1.5">
                    <label
                      htmlFor="phone"
                      className="font-titleFont text-base font-semibold text-gray-600"
                    >
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="Phone Number"
                    />
                  </div>
                  {/* {errorsUpdate && (
                    <span className=" text-sm text-red-500 font-titleFont px-2">
                      {errorsUpdate.phone}
                    </span>
                  )} */}
                </div>
                {/* Address */}

                <div className="flex flex-col gap-.8">
                  <label
                    htmlFor="address"
                    className="font-titleFont text-base font-semibold text-gray-600"
                  >
                    Address
                  </label>
                  <TextArea
                    name="Address"
                    value={formData.Address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Your Address Is Here"
                    maxLength={350}
                    className="w-full h-10 mb-2.5 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  />
                </div>
                {/* {errorsUpdate && (
                  <span className=" text-sm text-red-500 font-titleFont px-2">
                    {errorsUpdate.Address}
                  </span>
                )} */}
              </div>

              {/*------ ----- Layout cut ----- ------ */}

              <div className="flex-1 flex-col">
                {/* Password  && Confirm Password */}
                <div>
                  <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-xl mdl:text-2xl mb-2.5">
                    Change Password
                  </h1>
                  {/* Password */}

                  <div className="flex flex-col gap-.8">
                    <label
                      htmlFor="Password"
                      className="font-titleFont text-base font-semibold text-gray-600"
                    >
                      New Password
                    </label>
                    <input
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full h-10 mb-2.5 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="password"
                      placeholder="Password"
                    />
                  </div>

                  {errorsUpdate && (
                    <span className=" text-sm text-red-500 font-titleFont px-2">
                      {errorsUpdate.password}
                    </span>
                  )}

                  {/* Confirm Password */}
                  <div className="flex flex-col gap-.8">
                    <label
                      htmlFor="Confirm Password"
                      className="font-titleFont text-base font-semibold text-gray-600"
                    >
                      Confirm Password
                    </label>
                    <input
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      className="w-full h-10 mb-4 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </div>
                  {/* {errorsUpdate && (
                    <span className=" text-sm text-red-500 font-titleFont px-2">
                      {errorsUpdate.password ? errorsUpdate.password[0] : ""}
                    </span>
                  )} */}
                </div>
                {/* ----- ----- */}
              </div>
            </div>

            {/* Handle Event */}
            <div className="flex justify-end mb-4">
              <Button
                type="submit"
                sx={{
                  bgcolor: "#4B5563",
                  color: "white",
                  "&:hover": { bgcolor: "#4B5595" },
                  width: "200px",
                  height: "42px",
                }}
              >
                Update
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* ----- ----- */}

      <div className="w-full px-20 mb-5">
        <div className="w-full px-0.5">
          <h2 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-xl mdl:text-2xl mb-3">
            Payment History
          </h2>
          <div className="mb-1.5">
            <TableHistoryPayment />
          </div>
        </div>
        <div className="flex justify-end my-5">
          <Link to="/">
            <Button
              sx={{
                bgcolor: "#3cb371",
                color: "white",
                "&:hover": { bgcolor: "#2b8b57" },
                width: "200px",
                height: "43px",
              }}
              // startIcon={<EditIcon />}
            >
              Back To Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
