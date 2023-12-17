import { Breadcrumb } from "antd";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "axios";
import { useEffect, useState } from "react";
import { colums } from './colums/columsUserList'
import Button from "@mui/material/Button";


const UserList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users`).then((res) => {
      console.log(res.data.users);
      setUsers(res.data.users);
    });
  }, []);

  return (
    <div>
      <div className="bg-white rounded-md p-2 flex items-center shadow-md">
        <Breadcrumb
          style={{ margin: "2px 0", fontSize: "20px", fontWeight: "500" }}
        >
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>User list</Breadcrumb.Item>
        </Breadcrumb>
       
          {/* <Button type="primary">Create User</Button> */}
        
      </div>
      <div className="bg-white rounded-md shadow-lg">
        <Box>
          <Box
            m="8px 0 0 0"
            height="75vh"
            width="100%"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
                borderRadius: "8px 8px 0 0",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                borderRadius: "0 0 8px 8px",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            <DataGrid rows={users} columns={colums} />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default UserList;
