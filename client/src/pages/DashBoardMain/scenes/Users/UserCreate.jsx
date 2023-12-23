import { Breadcrumb, Input, Select } from "antd";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const UserCreate = () => {
  const navigate = useNavigate();

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
      <form>
        <div className="max-w-full h-[520px] mt-2 mx-auto p-4 flex-wrap flex-col md:flex-row bg-white rounded-md shadow-lg relative">
          <div className="w-full h-full mt-2 mx-auto p-4 flex justify-evenly ">
            <div className="w-50 pr-10">
              <div className="mb-4">
                <label htmlFor="fullName" className="block mb-1 font-medium">
                  Full Name *
                </label>
                <Input
                  id="fullname"
                  name="fullname"
                  className="w-full bg-slate-200"
                  placeholder="Eg. Le Van Truong Anh"
                  style={{ width: "100%", height: "40px" }}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1 font-medium">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  className="w-full  bg-slate-200"
                  placeholder="Eg. truonganh@gmail.com"
                  style={{ width: "100%", height: "40px" }}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-1 font-medium">
                  Password *
                </label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full  bg-slate-200"
                  placeholder="Password"
                  style={{ width: "100%", height: "40px" }}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-1 font-medium"
                >
                  Confirm Password *
                </label>
                <Input
                  type="password_confirmation"
                  id="passwordConfirmation"
                  name="confirmation_password"
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
                <Select
                  id="level"
                  className="w-full"
                  style={{ width: "100%", height: "40px" }}
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </div>
              <div className="mb-4">
                <label htmlFor="level" className="block mb-1 font-medium">
                  Level *
                </label>
                <Select
                  id="level"
                  className="w-full"
                  style={{ width: "100%", height: "40px" }}
                >
                  <Option value="adminMaster">Admin Master</Option>
                  <Option value="adminManager">Admin Manager</Option>
                  <Option value="adminEditor">Admin Editor</Option>
                  <Option value="member">Member</Option>
                </Select>
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 20, right: 20 }}>
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
