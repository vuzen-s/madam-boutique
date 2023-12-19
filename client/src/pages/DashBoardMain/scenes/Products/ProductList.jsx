import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import Header from "../../components/Header";
import { tokens } from "../../theme";

const ProductList = () => {
  const [productsList, setProductsList] = useState([]);

  // Get data products
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((respon) => respon.json())
      .then((data) => {
        console.log(data.products);
        setProductsList(data.products);
      })
      .catch((error) => console.log(error));
  }, []);

  const navigate = useNavigate();

  const handleEditItem = (idProduct) => {
    // navigate
    navigate('/dashboard/product/edit/' + idProduct);
  }

  const handleDeleteItem = (idProduct) => {
    Swal.fire({
      title: "Bạn chắc chắn muốn xóa sản phẩm này?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Xóa",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await fetch('http://127.0.0.1:8000/api/products-destroy/' + idProduct, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then((respon) => respon.json())
          .then((data) => {
            console.log(data);
            console.log(idProduct);
          })
          .catch((error) => console.log(error));
        // handle event
        Swal.fire("Đã xóa!", "", "success");
        window.location.reload();
      }
    });
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", headerAlign: "center", flex: 0.2, align: "center", },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "desc",
      headerName: "Dòng mô tả",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },
    {
      field: "avatar",
      headerName: "Ảnh sản phẩm",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <img src={params.value} alt="" width="40px" />
      ),
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Giá",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div style={{ background: params.value === 0 ? 'green' : 'red', color: 'white', padding: '0px 4px', borderRadius: '4px', fontWeight: '600' }}>
          {params.value === 0 ? 'Hiển thị' : 'Ẩn'}
        </div>
      ),
      flex: 0.3,
    },
    {
      field: "feature",
      headerName: "Feature",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div style={{ background: params.value === 0 ? 'orange' : 'grey', color: 'white', padding: '0px 4px', borderRadius: '4px', fontWeight: '600' }}>
          {params.value === 0 ? 'Nổi bật' : 'Không nổi bật'}
        </div>
      ),
      flex: 0.4,
    },
    {
      field: "designer",
      headerName: "Designer",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <p>{params.value.name}</p>
      ),
      flex: 0.5,
    },
    {
      field: "brand",
      headerName: "Brand",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <p>{params.value.name}</p>
      ),
      flex: 0.5,
    },
    {
      field: "collection",
      headerName: "Collection",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <p>{params.value.name}</p>
      ),
      flex: 0.5,
    },
    {
      field: "category",
      headerName: "Category",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <p>{params.value.name}</p>
      ),
      flex: 0.5,
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
        title="LIST PRODUCTS"
        subtitle="List of Products for Future Reference"
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
          rows={productsList}
          columns={columns}
        />
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default ProductList;
