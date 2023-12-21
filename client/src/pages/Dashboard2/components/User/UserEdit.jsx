import { Breadcrumb, Input } from "antd";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


const UserEdit = () => {
  const [users, setUsers] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/edit/${id}`).then((res) => {
      console.log(res.data.user);
      setUsers(res.data.user);
    });
  }, [id]);

  const handleInputValue = (e) => {
    const name = e.target?.name;
    const value = e.target?.value;
    setUsers((values) => ({ ...values, [name]: value }));
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();

    const data = {
      fullname: users.fullname,
      email: users.email,
      level: users.level,
      gender: users.gender,
      password: users.password,
      password_confirmation: users.password_confirmation,
    };

    axios
      .put(`http://localhost:8000/api/users/edit/${id}`, data)
      .then((res) => {
        console.log(res.data.error);
        alert(res.data.message);
      });

    // .catch((err) => {
    //   if (err.response) {
    //     if (err.response.status === 400) {
    //       //setError
    //       // loading
    //     }
    //     if (err.response.status === 404) {
    //       // set page
    //     }
    //     if (err.response.status === 500) {
    //       // set page
    //     }
    //   }
    // });
  };

  const handleBackToList = () => {
    navigate("../users");
  };

  return (
    <div>
      <div className="bg-white rounded-md p-2 flex justify-between items-center shadow-md">
        <Breadcrumb
          style={{ margin: "5px 0", fontSize: "20px", fontWeight: "500" }}
        >
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>User edit</Breadcrumb.Item>
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
      <form onSubmit={handleUpdateUser}>
        <div className="max-w-full h-[520px] mt-2 mx-auto p-4 flex-wrap flex-col md:flex-row bg-white rounded-md shadow-lg relative">
          <div className="w-full h-full mt-2 mx-auto p-4 flex justify-evenly ">
            <div className="w-50 pr-10">
              <div className="mb-4">
                <label htmlFor="fullName" className="block mb-1 font-medium">
                  Full Name
                </label>
                <Input
                  id="fullname"
                  name="fullname"
                  value={users.fullname}
                  onChange={handleInputValue}
                  className="w-full bg-slate-200"
                  placeholder="Eg. Le Van Truong Anh"
                  style={{ width: "100%", height: "40px" }}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1 font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  value={users.email}
                  onChange={handleInputValue}
                  className="w-full  bg-slate-200"
                  placeholder="Eg. truonganh@gmail.com"
                  style={{ width: "100%", height: "40px" }}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-1 font-medium">
                  Password
                </label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={users.password}
                  onChange={handleInputValue}
                  className="w-full  bg-slate-200"
                  placeholder="Password"
                  style={{ width: "100%", height: "40px" }}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="passwordConfirmation"
                  className="block mb-1 font-medium"
                >
                  Confirm Password
                </label>
                <Input
                  type="password"
                  id="passwordConfirmation"
                  name="password_confirmation"
                  value={users.password_confirmation}
                  onChange={handleInputValue}
                  className="w-full  bg-slate-200"
                  placeholder="Confirm Password"
                  style={{ width: "100%", height: "40px" }}
                />
              </div>
            </div>
            {/* -------------------------------- */}
            <div className="w-60 pr-5">
              <div className="mb-4">
                <label htmlFor="gender" className="block mb-1 font-medium">
                  Gender
                </label>
                <select
                  id="level"
                  name="gender"
                  value={users.gender}
                  onChange={handleInputValue}
                  className="w-full h-10 bg-slate-200 rounded-md pl-3"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="level" className="block mb-1 font-medium">
                  Level
                </label>
                <select
                  id="level"
                  name="level"
                  value={users.level}
                  onChange={handleInputValue}
                  className="w-full h-10 bg-slate-200 rounded-md pl-3 "
                >
                  <option value="1">Admin Master</option>
                  <option value="2">Admin Manager</option>
                  <option value="3">Admin Editor</option>
                  <option value="4">Member</option>
                </select>
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 20, right: 20 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ width: "150px", height: "45px" }}
            >
              Updated
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
