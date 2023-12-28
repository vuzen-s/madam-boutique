import { useState, useEffect } from "react";
import { Breadcrumb, Input, Select } from "antd";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
// import AvatarProfile from "../../../../components/Avatar/Avatar";
import axios from "axios";
import { Image } from "antd";
import "./AvtUserCreate.css";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const UserCreate = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    fullname: "",
    email: "",
    phone: "",
    Address: "",
    gender: "",
    level: "",
    password: "",
    password_confirmation: "",
  });

  const handleBackToList = () => {
    navigate("../users");
  };

  const handleInputValue = (e) => {
    const name = e.target?.name;
    const value = e.target?.value;
    setUsers((values) => ({ ...values, [name]: value }));
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    const data = {
      fullname: users.fullname,
      email: users.email,
      level: users.level,
      gender: users.gender,
      password: users.password,
      phone: users.phone,
      Address: users.Address,
      password_confirmation: users.password_confirmation,
    };

    axios
      .post(`http://localhost:8000/api/users/create`, data)
      .then((res) => {
        console.log(res.data.error);
        alert(res.data.message);
      })

      .catch((e) => {
        if (e.response && e.response.status === 400) {
          setErrors(e.response.data.error);
          console.log(e.response.data.error);
        }
        // if (e.response.status === 404) {
        //   // set page
        // }
        // if (e.response.status === 500) {
        //   // set page
        // }
      });
  };

  useEffect(() => {
    setErrors({});
  }, [
    users.fullname,
    users.email,
    users.password,
    users.password_confirmation,
    users.gender,
    users.level,
    users.phone,
    users.Address,
  ]);

  const [imageSrc, setImageSrc] = useState(
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  );

  const handleImageUpload = (fileList) => {
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageSrc(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-md p-2 flex justify-between items-center shadow-md">
        <Breadcrumb
          style={{ margin: "5px 0", fontSize: "20px", fontWeight: "500" }}
        >
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>User Create</Breadcrumb.Item>
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
        <div className="max-w-full h-full mt-2 mx-auto p-4 bg-white rounded-md shadow-lg relative md:mb-5">
          {/* Upload Avavtar */}
          <div>
            <div className="flex flex-col justify-center gap-3">
              <div className="border-3 border-slate-300 p-1 rounded-full flex mdl:flex-col justify-center mx-auto">
                <Image
                  width={160}
                  style={{ borderRadius: "100%", objectFit: "cover" }}
                  src={imageSrc}
                />
              </div>
              <div className="flex mdl:flex-col justify-center mx-auto">
                <ImgCrop rotationSlider>
                  <Upload
                    onChange={(info) => {
                      if (info.fileList.length > 0) {
                        handleImageUpload([info.file.originFileObj]);
                      }
                    }}
                    showUploadList={false}
                  >
                    <div className="border-2 border-slate-300 rounded-md inline-block mb-3 ">
                      <Button
                        sx={{
                          backgroundColor: "#D1D5DB",
                          color: "#4B5563",
                          boxShadow: "0 4px 6px rgba(0, 0, 0.1, 0.2)",
                          fontWeight: "bold",
                          fontSize: "16px",
                          height: "37px",
                        }}
                        icon={
                          <UploadOutlined style={{ marginBottom: "8px" }} />
                        }
                      >
                        Upload Avatar
                      </Button>
                    </div>
                  </Upload>
                </ImgCrop>
              </div>
            </div>
          </div>

          {/* Cut handle */}

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
                  value={users.fullname}
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
                  value={users.email}
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
                  value={users.password}
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
                  value={users.password_confirmation}
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

            <div className="flex-1 flex flex-col gap-3">
              {/* Gender && Level */}

              <div className="flex flex-raw justify-between">
                <div className="flex-1 mr-1.5">
                  <div className="flex flex-col gap-.8 ">
                    <label
                      htmlFor="gender"
                      className="font-titleFont text-base font-semibold text-gray-600"
                    >
                      Gender
                    </label>
                    <select
                      id="level"
                      name="gender"
                      value={users.gender}
                      onChange={handleInputValue}
                      className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {errors && (
                      <span className=" text-sm text-red-500 font-titleFont px-2">
                        {errors.gender}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-.8 ml-1.5">
                  <div className="flex flex-col gap-.8">
                    <label
                      htmlFor="phone"
                      className="font-titleFont text-base font-semibold text-gray-600"
                    >
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={users.phone}
                      onChange={handleInputValue}
                      className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="Phone Number"
                    />
                    {errors && (
                      <span className=" text-sm text-red-500 font-titleFont px-2">
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
                  value={users.level}
                  onChange={handleInputValue}
                  className="w-full h-10 placeholder:text-sm placeholder:tracking-wide px-3 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                >
                  <option value="1">Admin Master</option>
                  <option value="2">Admin Manager</option>
                  <option value="3">Admin Editor</option>
                  <option value="4">Member</option>
                </select>
              </div>
              {errors && (
                <span className=" text-sm text-red-500 font-titleFont px-2">
                  {errors.level}
                </span>
              )}
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
                  value={users.Address}
                  onChange={handleInputValue}
                  rows={3}
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