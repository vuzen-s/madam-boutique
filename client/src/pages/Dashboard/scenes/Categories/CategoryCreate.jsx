import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { csrfTokenReducer } from "../../../../redux/madamBoutiqueSlice";
import Header from "../../components/Header";

const CollectionCreate = () => {
  const [dataCategory, setDataCategory] = useState({
    name: '',
    status: 0,
    parent_id: '',
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();
  dispatch(csrfTokenReducer());
  const csrfToken = useSelector((state) => state.madamBoutiqueReducer.csrfToken);

  const [errorsField, setErrorsField] = useState({});
  const [message, setMessage] = useState('');

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const showToastMessage = () => {
    toast.success('Thêm Danh mục thành công!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const handleFormSubmit = async () => {

    try {
      await fetch('http://127.0.0.1:8000/api/categories-store', {
        method: "POST",
        headers: {
          'X-CSRF-TOKEN': csrfToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataCategory), // Chuyển đổi FormData thành đối tượng JSON
      })
        .then((respon) => respon.json())
        .then((data) => {
          console.log(dataCategory);
          // Nếu có lỗi validate từ Laravel, cập nhật trạng thái errors
          console.log(data.errors);
          setErrorsField(data.errors);
          // message
          console.log(data.message);
          setMessage(data.message);
          // Xử lý dữ liệu thành công nếu cần
          if (data.errors === undefined) {
            navigate('/dashboard/category/')
            showToastMessage();
          }
        })
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Nếu có lỗi validate từ Laravel, cập nhật trạng thái errors
        console.log(error);
      } else {
        // Xử lý lỗi khác nếu có
        console.error('Error:', error);
      }
    }
  };

  // Hàm xử lý khi giá trị của trường form thay đổi
  const handleChangeInput = (event) => {
    console.log(event.target)
    const { name, value } = event.target;
    setDataCategory({ ...dataCategory, [name]: value });
  };

  return (
    <Box m="20px">
      <Header title="CREATE CATEGORY" subtitle="Create a New Category" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        onChange={handleChangeInput}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <div class="mb-4">
                <label for="name" class="form-label">Tên danh mục:</label>
                <input type="text" class="form-control" id="name" placeholder="Enter name" name="name" onChange={handleChangeInput} />
                <p style={{ color: "red" }}>
                  {errorsField && errorsField.name}
                </p>
              </div>
              <div className="mb-4">
                <label for="status" class="form-label">Trạng thái danh mục:</label>
                <select className="form-select" name="status" value={dataCategory.status} onChange={handleChangeInput} >
                  <option value={0}> Hiển thị </option>
                  <option value={1}> Ẩn </option>
                </select>
                <p style={{ color: "red" }}>
                  {errorsField && errorsField.status}
                </p>
              </div>
              <div class="mb-4">
                <label for="parent_id" class="form-label">Danh mục cha:</label>
                <input type="text" class="form-control" id="parent_id" placeholder="Enter parent_id" name="parent_id" onChange={handleChangeInput} />
                <p style={{ color: "red" }}>
                  {errorsField && errorsField.parent_id}
                </p>
              </div>
            </Box>
            <Box mt="10px">
              <button type="submit" class="btn btn-primary" style={{ background: "#0a58ca" }}>Thêm danh mục mới</button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const initialValues = {
  name: '',
  status: 0,
  parent_id: '',
};

export default CollectionCreate;
