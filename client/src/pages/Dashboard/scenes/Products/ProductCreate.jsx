import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { csrfTokenReducer } from "../../../../redux/madamBoutiqueSlice";
import Header from "../../components/Header";

const ProductCreate = () => {
  const [dataProduct, setDataProduct] = useState({
    name: '',
    desc: '',
    price: '',
    avatar: '',
    status: 0,
    feature: 0,
    collection_id: 0,
    brand_id: 0,
    designer_id: 0,
    category_id: 0,
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [optionDesigners, setOptionDesigners] = useState([]);
  const [optionBrands, setOptionBrands] = useState([]);
  const [optionCollections, setOptionCollections] = useState([]);
  const [optionCategories, setOptionCategories] = useState([]);

  const [errorsField, setErrorsField] = useState({});
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const showToastMessage = () => {
    toast.success('Thêm sản phẩm thành công!', {
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

  const dispatch = useDispatch();
  dispatch(csrfTokenReducer());
  const csrfToken = useSelector((state) => state.madamBoutiqueReducer.csrfToken);

  const handleFormSubmit = async () => {

    try {
      await fetch('http://127.0.0.1:8000/api/products-store', {
        method: "POST",
        headers: {
          'X-CSRF-TOKEN': csrfToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataProduct), // Chuyển đổi FormData thành đối tượng JSON
      })
        .then((respon) => respon.json())
        .then((data) => {
          console.log(dataProduct);
          // Nếu có lỗi validate từ Laravel, cập nhật trạng thái errors
          console.log(data.errors);
          setErrorsField(data.errors);
          // message
          console.log(data.message);
          setMessage(data.message);
          // Xử lý dữ liệu thành công nếu cần
          if (data.errors === undefined) {
            navigate('/dashboard/product/')
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

  // Get data designers, brands, collections, categories
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products-create', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((respon) => respon.json())
      .then((data) => {
        // console.log(data);
        setOptionDesigners(data.designers);
        setOptionBrands(data.brands);
        setOptionCollections(data.collections);
        setOptionCategories(data.categories);
      })
      .catch((error) => console.log(error));
  }, []);

  // Hàm xử lý khi giá trị của trường form thay đổi
  const handleChangeInput = (event) => {
    console.log(event.target)
    const { name, value } = event.target;
    setDataProduct({ ...dataProduct, [name]: value });
    // let avatar = event.target.files;
    // if (avatar) {
    //   dataProduct.avatar = avatar[0];
    //   setDataProduct(dataProduct);
    // }
  };

  return (
    <Box m="20px">
      <Header title="CREATE PRODUCT" subtitle="Create a New Product" />

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

              <div class="mb-3">
                <label for="name" class="form-label">Tên sản phẩm:</label>
                <input type="text" class="form-control" id="name" placeholder="Enter name" name="name" onChange={handleChangeInput} />
                <p style={{ color: "red" }}>
                  {errorsField && errorsField.name}
                </p>
              </div>

              <div class="mb-3">
                <label for="desc" class="form-label">Dòng mô tả:</label>
                <input type="text" class="form-control" id="desc" placeholder="Enter desc" name="desc" onChange={handleChangeInput} />
                <p style={{ color: "red" }}>
                  {errorsField && errorsField.desc}
                </p>
              </div>

              <div class="mb-3">
                <label for="price" class="form-label">Giá:</label>
                <input type="text" class="form-control" id="price" placeholder="Enter price" name="price" onChange={handleChangeInput} />
                <p style={{ color: "red" }}>
                  {errorsField && errorsField.price}
                </p>
              </div>

              <div class="mb-3">
                <label for="avatar" class="form-label">Ảnh đại diện sản phẩm:</label>
                <input multiple class="form-control" type="file" id="avatar" name="avatar" onChange={handleChangeInput} />
                <p style={{ color: "red" }}>
                  {errorsField && errorsField.avatar}
                </p>
              </div>

              <div className="mb-3">
                <label for="status" class="form-label">Trạng thái sản phẩm:</label>
                <select className="form-select" name="status" onChange={handleChangeInput} >
                  <option value={0}> Hiển thị </option>
                  <option value={1}> Ẩn </option>
                </select>
                <p style={{ color: "red" }}>
                  {errorsField && errorsField.status}
                </p>
              </div>

              <div className="mb-3">
                <label for="feature" class="form-label">Feature sản phẩm:</label>
                <select className="form-select" name="feature" onChange={handleChangeInput} >
                  <option value={0}> Nổi bật </option>
                  <option value={1}> Không nổi bật </option>
                </select>
                <p style={{ color: "red" }}>
                  {errorsField && errorsField.feature}
                </p>
              </div>

              <div className="mb-3">
                <label for="designer_id" class="form-label">Designer:</label>
                <select name="designer_id" className="form-select" onChange={handleChangeInput} >
                  {
                    optionDesigners.map((item, index) => (
                      <option key={index} value={index}>
                        {item.name}
                      </option>
                    ))
                  }
                </select>
                <p style={{ color: "red" }}>
                  {errorsField && errorsField.designer_id}
                </p>
              </div>

              <div className="mb-3">
                <label for="brand_id" class="form-label">Brand:</label>
                <select name="brand_id" className="form-select" onChange={handleChangeInput} >
                  {
                    optionBrands.map((item, index) => (
                      <option key={index} value={index}>
                        {item.name}
                      </option>
                    ))
                  }
                </select>
                <p style={{ color: "red" }}>
                  {errorsField && errorsField.brand_id}
                </p>
              </div>

              <div className="mb-3">
                <label for="collection_id" class="form-label">Collection:</label>
                <select name="collection_id" className="form-select" onChange={handleChangeInput} >
                  {
                    optionCollections.map((item, index) => (
                      <option key={index} value={index}>
                        {item.name}
                      </option>
                    ))
                  }
                </select>
                <p style={{ color: "red" }}>
                  {errorsField && errorsField.collection_id}
                </p>
              </div>

              <div className="mb-3">
                <label for="category_id" class="form-label">Category:</label>
                <select name="category_id" className="form-select" onChange={handleChangeInput} >
                  {
                    optionCategories.map((item, index) => (
                      <option key={index} value={index}>
                        {item.name}
                      </option>
                    ))
                  }
                </select>
                <p style={{ color: "red" }}>
                  {errorsField && errorsField.category_id}
                </p>
              </div>
            </Box>
            <Box mt="40px">
              <button type="submit" class="btn btn-primary" style={{ background: "#0a58ca" }}>Thêm sản phẩm mới</button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const initialValues = {
  name: '',
  desc: '',
  price: '',
  avatar: '',
  status: 0,
  feature: 0,
  collection_id: 0,
  brand_id: 0,
  designer_id: 0,
  category_id: 0,
};

export default ProductCreate;
