import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { csrfTokenReducer } from "../../../../redux/madamBoutiqueSlice";
import Header from "../../components/Header";
import 'react-toastify/dist/ReactToastify.css';

const CollectionCreate = () => {
  const [dataCollection, setDataCollection] = useState({
    name: '',
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();
  dispatch(csrfTokenReducer());
  const csrfToken = useSelector((state) => state.madamBoutiqueReducer.csrfToken);

  const [errorsField, setErrorsField] = useState({});
  const [message, setMessage] = useState('');

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const showToastMessage = () => {
    toast.success('Successfully added', {
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
      await fetch('http://127.0.0.1:8000/api/collections-store', {
        method: "POST",
        headers: {
          'X-CSRF-TOKEN': csrfToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataCollection), // Chuyển đổi FormData thành đối tượng JSON
      })
        .then((respon) => respon.json())
        .then((data) => {
          console.log(dataCollection);
          // Nếu có lỗi validate từ Laravel, cập nhật trạng thái errors
          console.log(data.errors);
          setErrorsField(data.errors);
          // message
          console.log(data.message);
          setMessage(data.message);
          // Xử lý dữ liệu thành công nếu cần
          if (data.errors === undefined) {
            navigate('/dashboard/collection/')
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
    setDataCollection({ ...dataCollection, [name]: value });
  };

  return (
    <Box m="20px">
      <Header title="CREATE COLLECTION" subtitle="Create a New Collection" />

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
            <Box>
              <div class="mb-8">
                <label for="name" class="form-label">Name Collection</label>
                <input type="text" class="form-control" id="name" placeholder="Enter name" name="name" onChange={handleChangeInput} />
                <p style={{ color: "red" }}>
                  {errorsField && errorsField.name}
                </p>
              </div>

            </Box>
            <Box mt="10px">
              <button type="submit" class="btn btn-primary" style={{ background: "#0a58ca" }}>Add Collection</button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const initialValues = {
  name: ''
};

export default CollectionCreate;
