import React, { useEffect, useState } from "react";
// import AvatarProfile from "../../components/Avatar/Avatar";
import Button from "@mui/material/Button";
import { Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import api from "../AuthContext/api";
import Swal from "sweetalert2";
import { tokens } from "../Dashboard2/theme";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { colums } from "../Profile/Colum/Colum";
import { fetch } from "caniuse-lite/data/features";

const { TextArea } = Input;

const Profile = () => {
  const [userAuth, setUserAuth] = useState([]);
  const [errorsUpdate, setErrorsUpdate] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [dataPaymentHistory, setDataPaymentHistory] = useState([]);

  const levelMapping = {
    1: "Admin Master",
    2: "Admin Manager",
    3: "Admin Editor",
    4: "Member",
  };

  // Get data orders payments history
  useEffect(() => {
    api
      .get("/api/orders/" + userAuth.id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setDataPaymentHistory(res.data.orders);
      })
      .catch((e) => {
        if (e.response && e.response.status === 401) {
          console.log(e);
        }
      });
  }, [userAuth.id]);

  useEffect(() => {
    api
      .get(`/api/auth/user-profile`)
      .then((res) => {
        console.log(res.data.user);
        setUserAuth(res.data.user);
      })
      .catch((e) => {
        if (e.response && e.response.status === 401) {
          navigate("/signin");
        }
      });
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const data = {
      fullname: userAuth?.fullname,
      email: userAuth?.email,
      level: userAuth?.level,
      gender: userAuth?.gender,
      password: userAuth?.password,
      phone: userAuth?.phone,
      address: userAuth?.address,
      password_confirmation: userAuth?.password_confirmation,
    };

    api
      .put(`api/auth/update-profile`, data)
      .then((res) => {
        console.log(res.data);

        if (res.status === 200) {
          setUserAuth(res.data.user);
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Update Profile Successfully",
            confirmButtonText: "Ok",
            timer: 7000,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      })

      .catch((e) => {
        if (e.response && e.response.status === 400) {
          setErrorsUpdate(e.response.data.errors);
          console.log(e.response.data.errors);
        }
      });
  };

  useEffect(() => {
    setErrorsUpdate([]);
  }, [
    userAuth?.fullname,
    userAuth?.password,
    userAuth?.phone,
    userAuth?.address,
    userAuth?.password_confirmation,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserAuth((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="max-full h-full flex flex-col px-20 py-4">
        <form onSubmit={handleUpdateProfile}>
          <div>
            <div className="w-full h-full flex flex-col md:flex-row justify-between gap-12 mt-4 mb-4">
              <div className="flex-1 flex flex-col gap-2">
                <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-xl mdl:text-2xl mb-1">
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
                    value={userAuth === undefined ? "" : userAuth?.email}
                    // value={userAuth && userAuth.email ? userAuth.email : ""}
                    onChange={handleChange}
                    disabled
                    className="w-full h-10 placeholder:text-sm placeholder:tracking-wide bg-gray-300 px-3 text-base text-gray-500 font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Eg. Le Van Truong Anh"
                  />
                </div>
                {errorsUpdate && (
                  <span className=" text-sm text-red-500 font-titleFont px-2">
                    {errorsUpdate.email}
                  </span>
                )}

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
                    value={userAuth === undefined ? "" : userAuth?.fullname}
                    // value={userAuth && userAuth.fullname ? userAuth.fullname : ""}
                    onChange={handleChange}
                    className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Eg. Le Van Truong Anh"
                  />
                </div>
                {errorsUpdate && (
                  <span className=" text-sm text-red-500 font-titleFont px-2">
                    {errorsUpdate.fullname}
                  </span>
                )}

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
                    value={
                      userAuth === undefined
                        ? ""
                        : levelMapping[userAuth?.level]
                    }
                    // value={userAuth && userAuth.level ? levelMapping[userAuth.level] : ""}
                    onChange={handleChange}
                    disabled
                    className="w-full h-10 placeholder:text-sm placeholder:tracking-wide bg-gray-300 px-3 text-base text-gray-500 font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                  />
                </div>
                {errorsUpdate && (
                  <span className=" text-sm text-red-500 font-titleFont px-2">
                    {errorsUpdate.level}
                  </span>
                )}

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
                      value={userAuth === undefined ? "" : userAuth?.gender}
                      // value={userAuth && userAuth.gender ? userAuth.gender : ""}
                      onChange={handleChange}
                      disabled
                      className="w-full h-10 placeholder:text-sm placeholder:tracking-wide bg-gray-300 px-3 text-base text-gray-500 font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="Eg. Le Van Truong Anh"
                    />
                    {errorsUpdate && (
                      <span className=" text-sm text-red-500 font-titleFont px-2">
                        {errorsUpdate.gender}
                      </span>
                    )}
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
                      value={userAuth === undefined ? "" : userAuth?.phone}
                      // value={userAuth && userAuth.phone ? userAuth.phone : ""}
                      onChange={handleChange}
                      className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="Phone Number"
                    />
                    {errorsUpdate && (
                      <span className=" text-sm text-red-500 font-titleFont px-2">
                        {errorsUpdate.phone}
                      </span>
                    )}
                  </div>
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
                    name="address"
                    value={userAuth === undefined ? "" : userAuth?.address}
                    // value={userAuth && userAuth.address ? userAuth.address : ""}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Your Address Is Here"
                    maxLength={350}
                    className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  />
                </div>
                {errorsUpdate && (
                  <span className=" text-sm text-red-500 font-titleFont px-2">
                    {errorsUpdate.Address}
                  </span>
                )}
              </div>

              {/*------ ----- Layout cut ----- ------ */}

              <div className="flex-1 flex flex-col gap-2">
                {/* Password  && Confirm Password */}
                <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-xl mdl:text-2xl mb-1">
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
                    value={userAuth === undefined ? "" : userAuth?.password}
                    // value={userAuth && userAuth.password ? userAuth.password : ""}
                    onChange={handleChange}
                    className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
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
                    value={
                      userAuth === undefined
                        ? ""
                        : userAuth?.password_confirmation
                    }
                    // value={userAuth && userAuth.password_confirmation ? userAuth.password_confirmation : ""}
                    onChange={handleChange}
                    className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>
                {errorsUpdate && (
                  <span className=" text-sm text-red-500 font-titleFont px-2">
                    {errorsUpdate.password ? errorsUpdate.password[0] : ""}
                  </span>
                )}
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

      {/* ----- Payment History ----- */}

      <div className="w-full px-20 mb-5">
        <div className="w-full px-0.5">
          <h2 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-xl mdl:text-2xl mb-3">
            Payment History
          </h2>
          <div className="mb-1.5">
            <div className="bg-white rounded-md shadow-lg">
              <Box>
                <Box
                  m="8px 0 0 0"
                  height="53vh"
                  width="100%"
                  sx={{
                    "& .MuiDataGrid-root": {
                      border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "none",
                    },
                    "& .name-column--cell": {
                      color: colors.greenAccent[100],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: colors.grey[800],
                      Height: "10px",
                      borderBottom: "none",
                      borderRadius: "8px 8px 0 0",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                      borderTop: "none",
                      borderRadius: "0 0 8px 8px",
                      backgroundColor: colors.grey[800],
                    },
                    "& .MuiCheckbox-root": {
                      color: `${colors.greenAccent[200]} !important`,
                    },
                  }}
                >
                  <DataGrid
                    rows={dataPaymentHistory} // goi ApI cap nhat trang thai cua bang
                    columns={colums}
                  />
                </Box>
              </Box>
            </div>
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
