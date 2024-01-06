import { colums } from "../Colum/Colum"
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../Dashboard2/theme";
// import { DataPayment } from "../Colum/Colum";

const TableHistoryPayment = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
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
            {/*<DataGrid*/}
            {/*  rows={DataPayment} // goi ApI cap nhat trang thai cua bang*/}
            {/*  columns={colums}*/}
            {/*/>*/}
          </Box>
        </Box>
      </div>
    )
}

export default TableHistoryPayment;
