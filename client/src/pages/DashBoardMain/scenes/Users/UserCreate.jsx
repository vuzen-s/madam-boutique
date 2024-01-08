import { useState, useEffect } from "react";
import { Breadcrumb, Input, Select } from "antd";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Image } from "antd";
import "./AvtUser.css";
import ImgCrop from "antd-img-crop";
import img from "../../../../../src/assets/images/undefineAvt.png";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import useAuthContext from "../../../AuthContext/AuthContext";

const { TextArea } = Input;

const UserCreate = () => {
  const [errors, setErrors] = useState({});
  const [hasImageChanged, setHasImageChanged] = useState(false);
  const navigate = useNavigate();
  const { usersAuthFetch } = useAuthContext();
  const userLevel = usersAuthFetch.level; // Lấy level của người dùng đăng nhập hiện tại

  const [users, setUsers] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    level: "",
    password: "",
    status: "",
    password_confirmation: "",
    avatar: "",
  });

  const handleBackToList = () => {
    navigate("../user");
  };

  const handleInputValue = (e) => {
    const name = e.target?.name;
    const value = e.target?.value;
    setUsers((values) => ({ ...values, [name]: value }));
  };


  const handleCreateUser = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("fullname", users?.fullname);
    formData.append("email", users?.email);
    formData.append("level", users?.level);
    formData.append("gender", users?.gender);
    formData.append("password", users?.password);
    formData.append("phone", users?.phone);
    formData.append("status", users?.status);
    formData.append("address", users?.address);
    formData.append("password_confirmation", users?.password_confirmation);

    axios
      .post(`http://localhost:8000/api/users/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data.error);
        if (res.status === 200) {
          setUsers(res.data.user);
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Create User Successfully",
            // confirmButtonText: "Ok",
            timer: 5000,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("../user");
            }
          });
        }
      })
      .catch((e) => {
        if (e.response && e.response.status === 400) {
          setErrors(e.response.data.error);
          console.log(e.response.data.error);
        }
      });
  };
  

  useEffect(() => {
    setErrors({});
  }, [
    users?.fullname,
    users?.email,
    users?.password,
    users?.password_confirmation,
    users?.gender,
    users?.level,
    users?.phone,
    users?.address,
    users?.status,
  ]);

  return (
    <div>
      <div className="bg-white rounded-md py-2 px-2.5 mb-3 flex justify-between items-center shadow-md">
        <Breadcrumb
          style={{ margin: "5px 0", fontSize: "20px", fontWeight: "500" }}
        >
          <Breadcrumb.Item className="text-2xl">Create User</Breadcrumb.Item>
        </Breadcrumb>
        <Button
          variant="contained"
          color="success"
          onClick={handleBackToList}
          style={{ width: "100px", height: "40px" }}
        >
          Back
        </Button>
      </div>
      <form onSubmit={handleCreateUser}>
        <div className="max-w-full h-full mx-auto p-4 bg-white rounded-md shadow-lg relative md:mb-5">
          {/* Upload Avavtar */}

          
          {/* ----- Cut ----- */}

          <div className="w-full h-full flex flex-col md:flex-row justify-between px-5 gap-10 mt-4 mb-4">
            <div className="flex-1 flex flex-col gap-2">
              {/* full name */}

              <div className="flex flex-col gap-.8">
                <label
                  htmlFor="fullName"
                  className="font-titleFont text-base font-semibold text-gray-600"
                >
                  Full Name
                </label>
                <Input
                  id="fullname"
                  name="fullname"
                  value={users === undefined ? "" : users?.fullname}
                  onChange={handleInputValue}
                  className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  placeholder="Eg. Le Van Truong Anh"
                  style={{ width: "100%", height: "40px" }}
                />
              </div>
              {errors && (
                <span className=" text-sm text-red-500 font-titleFont px-2">
                  {errors.fullname}
                </span>
              )}

              {/* email */}

              <div className="flex flex-col gap-.8">
                <label
                  htmlFor="email"
                  className="font-titleFont text-base font-semibold text-gray-600"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  value={users === undefined ? "" : users?.email}
                  onChange={handleInputValue}
                  className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  placeholder="Eg. truonganh@gmail.com"
                  style={{ width: "100%", height: "40px" }}
                />
              </div>
              {errors && (
                <span className="text-sm text-red-500 font-titleFont px-2">
                  {errors.email}
                </span>
              )}

              {/* Password */}
              <div className="flex flex-col gap-.8">
                <label
                  htmlFor="password"
                  className="font-titleFont text-base font-semibold text-gray-600"
                >
                  Password
                </label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={users === undefined ? "" : users?.password}
                  onChange={handleInputValue}
                  className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  placeholder="Password"
                  style={{ width: "100%", height: "40px" }}
                />
              </div>
              {errors && (
                <span className=" text-sm text-red-500 font-titleFont px-2">
                  {errors.password}
                </span>
              )}

              {/* Password Confirmation */}
              <div className="flex flex-col gap-.8">
                <label
                  htmlFor="passwordConfirmation"
                  className="font-titleFont text-base font-semibold text-gray-600"
                >
                  Confirm Password
                </label>
                <Input
                  type="password"
                  id="passwordConfirmation"
                  name="password_confirmation"
                  value={
                    users === undefined ? "" : users?.password_confirmation
                  }
                  onChange={handleInputValue}
                  className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  placeholder="Confirm Password"
                  style={{ width: "100%", height: "40px" }}
                />
              </div>
              {errors && (
                <span className=" text-sm text-red-500 font-titleFont px-2">
                  {errors.password ? errors.password[0] : ""}
                </span>
              )}
            </div>

            {/* ---------- Layout cut ---------- */}

            <div className="flex-1 flex flex-col gap-2">
              {/* <div className="flex flex-col gap-.8">
                <label
                  htmlFor="status"
                  className="font-titleFont text-base font-semibold text-gray-600"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={users === undefined ? "" : users?.status}
                  onChange={handleInputValue}
                  className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                >
                  <option value="Choose Status">Choose Status</option>
                  <option value="Show">Show</option>
                  {/* <option value="Hidden">Hidden</option> */}
                {/* </select>
                {errors && (
                  <span className="mt-2 text-sm text-red-500 font-titleFont px-2">
                    {errors.status}
                  </span>
                )}
              </div> */}

              {/* Gender && Level */}

              <div className="flex">
                <div className="flex-1 mr-1.5 ">
                  <div className="flex flex-col gap-.8 ">
                    <label
                      htmlFor="gender"
                      className="font-titleFont text-base font-semibold text-gray-600"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={users === undefined ? "" : users?.gender}
                      onChange={handleInputValue}
                      className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    >
                      <option value="Choose Gender">Choose Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {errors && (
                      <span className="mt-2 text-sm text-red-500 font-titleFont px-2">
                        {errors.gender}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-1 ml-1.5">
                  <div className="flex flex-col gap-.8">
                    <label
                      htmlFor="phone"
                      className="font-titleFont text-base font-semibold text-gray-600"
                    >
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={users === undefined ? "" : users?.phone}
                      onChange={handleInputValue}
                      className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="Phone Number"
                    />
                    {errors && (
                      <span className="mt-2 text-sm text-red-500 font-titleFont px-2">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Level */}
              <div className="flex flex-col gap-.8">
                <label
                  htmlFor="level"
                  className="font-titleFont text-base font-semibold text-gray-600"
                >
                  Level
                </label>
                <select
                  id="level"
                  name="level"
                  value={users === undefined ? "" : users?.level}
                  onChange={handleInputValue}
                  className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                >
                  {userLevel === 1 && (
                    <>
                      <option value="1">Admin Master</option> // Khi nào thay
                      đổi database và tạo xong Admin Master thì cho ẩn
                      <option value="2">Admin Manager</option>
                      <option value="3">Admin Editor</option>
                      <option value="4">Member</option>
                    </>
                  )}
                  {userLevel === 2 && (
                    <>
                      <option value="3">Admin Editor</option>
                      <option value="4">Member</option>
                    </>
                  )}
                </select>

                {errors && (
                  <span className="mt-2 text-sm text-red-500 font-titleFont px-2">
                    {errors.level}
                  </span>
                )}
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
                  value={users === undefined ? "" : users?.address}
                  onChange={handleInputValue}
                  rows={2}
                  placeholder="Your Address Is Here"
                  maxLength={350}
                  className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                />
              </div>
              {errors && (
                <span className=" text-sm text-red-500 font-titleFont px-2">
                  {errors.Address}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="contained"
              color="success"
              style={{ width: "150px", height: "45px" }}
            >
              Create
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserCreate;
