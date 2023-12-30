import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { csrfTokenReducer } from "../../../../redux/madamBoutiqueSlice";
import Header from "../../components/Header";

const ProductEdit = () => {
  const [dataProductEdit, setDataProductEdit] = useState({
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
  const [publicPath, setPublicPath] = useState("");

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [optionDesigners, setOptionDesigners] = useState([]);
  const [optionBrands, setOptionBrands] = useState([]);
  const [optionCollections, setOptionCollections] = useState([]);
  const [optionCategories, setOptionCategories] = useState([]);

  const [errorsField, setErrorsField] = useState({});
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const showToastMessage = () => {
    toast.success('Update sản phẩm thành công!', {
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

  const { id } = useParams();

  // Get data edit by ID
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products-edit/' + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((respon) => respon.json())
      .then((data) => {
        console.log(data);
        console.log(id);
        setDataProductEdit(data.product)
        setOptionDesigners(data.designers);
        setOptionBrands(data.brands);
        setOptionCollections(data.collections);
        setOptionCategories(data.categories);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleFormUpdate = async () => {
    try {
      await fetch('http://127.0.0.1:8000/api/products-update/' + id, {
        method: "PATCH",
        headers: {
          'X-CSRF-TOKEN': csrfToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataProductEdit), // Chuyển đổi FormData thành đối tượng JSON
      })
        .then((respon) => respon.json())
        .then((data) => {
          console.log(dataProductEdit);
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

  // Hàm xử lý khi giá trị của trường form thay đổi
  const handleChangeInput = (event) => {
    console.log(event.target)
    const { name, value } = event.target;
    setDataProductEdit({ ...dataProductEdit, [name]: value });
    // let avatar = event.target.files;
    // if (avatar) {
    //   dataProductEdit.avatar = avatar[0];
    //   setDataProductEdit(dataProductEdit);
    // }
  };

  // back
  const handleBack = () => {
    navigate('/dashboard/product');
  }

  /// Get path to public in serve
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products-publicPath', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
        .then((respon) => respon.json())
        .then((data) => {
          console.log(data);
          setPublicPath(data.publicPath);
        })
        .catch((error) => console.log(error));
  }, []);

  return (
    <Box m="20px">
      <Header title="EDIT PRODUCT" subtitle="Edit a Product" />

      <Formik
        onSubmit={handleFormUpdate}
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
                <input type="text" class="form-control" id="name" placeholder="Enter name" name="name" value={dataProductEdit.name} onChange={handleChangeInput} />
                <p style={{ color: "red" }}>
                  {errorsField && errorsField.name}
                </p>
              </div>

              <div class="mb-3">
                <label for="desc" class="form-label">Dòng mô tả:</label>
                <input type="text" class="form-control" id="desc" placeholder="Enter desc" name="desc" value={dataProductEdit.desc} onChange={handleChangeInput} />
                <p style={{ color: "red" }}>
                  {errorsField && errorsField.desc}
                </p>
              </div>

              <div class="mb-3">
                <label for="price" class="form-label">Giá:</label>
                <input type="text" class="form-control" id="price" placeholder="Enter price" name="price" value={dataProductEdit.price} onChange={handleChangeInput} />
                <p style={{ color: "red" }}>
                  {errorsField && errorsField.price}
                </p>
              </div>

              <div class="mb-3">
                <label class="form-label">Ảnh hiện tại:</label>
                <img src={dataProductEdit.avatar === "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg" ? "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg" : publicPath + "/" + dataProductEdit.avatar} alt={dataProductEdit.name} width="50px" />
              </div>

              <div class="mb-3">
                <label for="avatar" class="form-label">Ảnh mới:</label>
                <input multiple class="form-control" type="file" id="avatar" name="avatar" onChange={handleChangeInput} />
                <p style={{ color: "red" }}>
                  {errorsField && errorsField.avatar}
                </p>
              </div>

              <div className="mb-3">
                <label for="status" class="form-label">Trạng thái sản phẩm:</label>
                <select className="form-select" name="status" value={dataProductEdit.status} onChange={handleChangeInput} >
                  <option value={0}> Hiển thị </option>
                  <option value={1}> Ẩn </option>
                </select>
                <p style={{ color: "red" }}>
                  {errorsField && errorsField.status}
                </p>
              </div>

              <div className="mb-3">
                <label for="feature" class="form-label">Feature sản phẩm:</label>
                <select className="form-select" name="feature" value={dataProductEdit.feature} onChange={handleChangeInput} >
                  <option value={0}> Nổi bật </option>
                  <option value={1}> Không nổi bật </option>
                </select>
                <p style={{ color: "red" }}>
                  {errorsField && errorsField.feature}
                </p>
              </div>

              <div className="mb-3">
                <label for="designer_id" class="form-label">Designer:</label>
                <select name="designer_id" className="form-select" value={dataProductEdit.designer_id} onChange={handleChangeInput} >
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
                <select name="brand_id" className="form-select" value={dataProductEdit.brand_id} onChange={handleChangeInput} >
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
                <select name="collection_id" className="form-select" value={dataProductEdit.collection_id} onChange={handleChangeInput} >
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
                <select name="category_id" className="form-select" value={dataProductEdit.category_id} onChange={handleChangeInput} >
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
              <button type="submit" class="btn btn-primary" style={{ background: "#0a58ca" }}>Lưu thay đổi</button>
              <button type="submit" class="btn btn-danger" style={{ background: "#dc3545", marginLeft: "12px" }} onClick={() => handleBack()}>Quay lại</button>
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

export default ProductEdit;
