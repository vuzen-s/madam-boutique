import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import Header from "../../components/Header";
import { tokens } from "../../theme";

const CollectionList = () => {
  const [collectionsList, setCollectionsList] = useState([]);

  // Get data products
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/collections', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((respon) => respon.json())
      .then((data) => {
        console.log(data.collections);
        setCollectionsList(data.collections);
      })
      .catch((error) => console.log(error));
  }, []);

  const navigate = useNavigate();

  const handleEditItem = (idCollection) => {
    // navigate
    navigate('/dashboard/collection/edit/' + idCollection);
  }

  const handleDeleteItem = (idCollection) => {
    Swal.fire({
      title: "Bạn chắc chắn muốn xóa bộ sưu tập này?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Xóa",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await fetch('http://127.0.0.1:8000/api/collections-destroy/' + idCollection, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then((respon) => respon.json())
          .then((data) => {
            console.log(data);
            console.log(idCollection);
            // handle event
            Swal.fire("Đã xóa!", "", "success");
            window.location.reload();
          })
          .catch((error) => {
            console.log(error)
            Swal.fire("Không thể xóa value này vì nó đang là khóa ngoại!", "", "error");
          });
      }
    });
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", headerAlign: "center", flex: 0.2, align: "center", },
    {
      field: "name",
      headerName: "Tên Bộ sưu tập",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div style={{ display: 'flex', columnGap: '4px' }}>
          <button type="button" class="btn btn-warning" style={{ background: '#ffc107' }} onClick={() => handleEditItem(params.row.id)}>
            Sửa
          </button>
          <button type="button" class="btn btn-danger" style={{ background: '#dc3545' }} onClick={() => handleDeleteItem(params.row.id)}>
            Xóa
          </button>
        </div>
      ),
      flex: 0.5,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="LIST COLLECTIONS"
        subtitle="List of Collection for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
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
            backgroundColor: colors.redAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.redAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={collectionsList}
          columns={columns}
        />
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default CollectionList;
