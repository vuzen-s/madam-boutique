import {Box} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from 'axios';
import $ from 'jquery';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
import 'select2';
import 'select2/dist/css/select2.min.css';
import {csrfTokenReducer} from "../../../../redux/madamBoutiqueSlice";
import Header from "../../components/Header";
import './ProductCreate.scss';

const ProductCreate = () => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [color, setColor] = useState('');
    const [avatar, setAvatar] = useState('');
    const [status, setStatus] = useState(0);
    const [feature, setFeature] = useState(0);
    const [collection_id, setCollection_id] = useState(0);
    const [brand_id, setBrand_id] = useState(0);
    const [designer_id, setDesigner_id] = useState(0);
    const [category_id, setCategory_id] = useState(0);

    // const [dataProduct, setDataProduct] = useState({
    //   name: '',
    //   desc: '',
    //   price: '',
    //   color: '',
    //   avatar: '',
    //   status: 0,
    //   feature: 0,
    //   collection_id: 0,
    //   brand_id: 0,
    //   designer_id: 0,
    //   category_id: 0,
    // });

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

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('desc', desc);
        formData.append('price', price);
        formData.append('color', color);
        formData.append('avatar', avatar);
        formData.append('status', status);
        formData.append('feature', feature);
        formData.append('collection_id', collection_id);
        formData.append('brand_id', brand_id);
        formData.append('designer_id', designer_id);
        formData.append('category_id', category_id);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/products-store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(formData);
            console.log(response);
            console.log(response.data.errors);
            console.log(response.data.message);
            setMessage(response.data.message);
            // setMessage(response.data.message);
            if (response.data.errors) {
                setErrorsField(response.data.errors);
                console.log(errorsField);
            } else {
                navigate('/dashboard/product/');
                showToastMessage();
            }
        } catch (error) {
            // Xử lý lỗi khác nếu có
            console.error('Error:', error);
            setErrorsField(error.response.data.errors);
        }
    };

    // Get data designers, brands, collections, categories
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products-create', {
            method: "GET", headers: {
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
        switch (event.target.name) {
            case "name":
                setName(event.target.value);
                break;
            case "desc":
                setDesc(event.target.value);
                break;
            case "price":
                setPrice(event.target.value);
                break;
            case "color":
                setColor(event.target.value);
                break;
            case "avatar":
                setAvatar(event.target.files[0]);
                break;
            case "status":
                setStatus(event.target.value);
                break;
            case "feature":
                setFeature(event.target.value);
                break;
            case "collection_id":
                setCollection_id(event.target.value);
                break;
            case "brand_id":
                setBrand_id(event.target.value);
                break;
            case "designer_id":
                setDesigner_id(event.target.value);
                break;
            case "category_id":
                setCategory_id(event.target.value);
                break;
            default:
                break;
        }
    };

    // select2
    useEffect(() => {
        $(function () {
            $('.form-select.select2ByID').select2();
        });
    }, []);

    return (<Box m="20px">
        <Header title="CREATE PRODUCT" subtitle="Create a New Product"/>


        <form onSubmit={handleFormSubmit}>
            <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                    "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},
                }}
            >

                <div class="mb-3">
                    <label for="name" class="form-label">Tên sản phẩm:</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter name" name="name"
                           onChange={handleChangeInput}/>
                    <p style={{color: "red"}}>
                        {errorsField && errorsField.name}
                    </p>
                </div>

                <div class="mb-3">
                    <label for="desc" class="form-label">Dòng mô tả:</label>
                    <input type="text" class="form-control" id="desc" placeholder="Enter desc" name="desc"
                           onChange={handleChangeInput}/>
                    <p style={{color: "red"}}>
                        {errorsField && errorsField.desc}
                    </p>
                </div>

                <div class="mb-3">
                    <label for="price" class="form-label">Giá:</label>
                    <input type="text" class="form-control" id="price" placeholder="Enter price" name="price"
                           onChange={handleChangeInput}/>
                    <p style={{color: "red"}}>
                        {errorsField && errorsField.price}
                    </p>
                </div>

                <div class="mb-3">
                    <label for="color" class="form-label">Màu sản phẩm (không bắt buộc):</label>
                    <input class="form-control" type="text" id="color" placeholder="Enter color" name="color"
                           onChange={handleChangeInput}/>
                </div>

                <div class="mb-3">
                    <label for="avatar" class="form-label">Ảnh đại diện sản phẩm:</label>
                    <input class="form-control" type="file" id="avatar" name="avatar"
                           onChange={handleChangeInput}/>
                    <p style={{color: "red"}}>
                        {errorsField && errorsField.avatar}
                    </p>
                </div>

                <div className="mb-3">
                    <label for="status" class="form-label">Trạng thái sản phẩm:</label>
                    <select className="form-select" name="status" onChange={handleChangeInput}>
                        <option value={0}> Hiển thị</option>
                        <option value={1}> Ẩn</option>
                    </select>
                    <p style={{color: "red"}}>
                        {errorsField && errorsField.status}
                    </p>
                </div>

                <div className="mb-3">
                    <label for="feature" class="form-label">Feature sản phẩm:</label>
                    <select className="form-select" name="feature" onChange={handleChangeInput}>
                        <option value={0}> Nổi bật</option>
                        <option value={1}> Không nổi bật</option>
                    </select>
                    <p style={{color: "red"}}>
                        {errorsField && errorsField.feature}
                    </p>
                </div>

                <div className="mb-3">
                    <label for="designer_id" class="form-label">Designer:</label>
                    <select name="designer_id" className="form-select select2ByID" onChange={handleChangeInput}>
                        {optionDesigners.map((item, index) => (<option key={index} value={item.id}>
                            {item.name}
                        </option>))}
                    </select>
                    <p style={{color: "red"}}>
                        {errorsField && errorsField.designer_id}
                    </p>
                </div>

                <div className="mb-3">
                    <label for="brand_id" class="form-label">Brand:</label>
                    <select name="brand_id" className="form-select select2ByID" onChange={handleChangeInput}>
                        {optionBrands.map((item, index) => (<option key={index} value={item.id}>
                            {item.name}
                        </option>))}
                    </select>
                    <p style={{color: "red"}}>
                        {errorsField && errorsField.brand_id}
                    </p>
                </div>

                <div className="mb-3">
                    <label for="collection_id" class="form-label">Collection:</label>
                    <select name="collection_id" className="form-select select2ByID" onChange={handleChangeInput}>
                        {optionCollections.map((item, index) => (<option key={index} value={item.id}>
                            {item.name}
                        </option>))}
                    </select>
                    <p style={{color: "red"}}>
                        {errorsField && errorsField.collection_id}
                    </p>
                </div>

                <div className="mb-3">
                    <label for="category_id" class="form-label">Category:</label>
                    <select name="category_id" className="form-select select2ByID" onChange={handleChangeInput}>
                        {optionCategories.map((item, index) => (<option key={index} value={item.id}>
                            {item.name}
                        </option>))}
                    </select>
                    <p style={{color: "red"}}>
                        {errorsField && errorsField.category_id}
                    </p>
                </div>
                <div className="mb-3">
                    <label for="images[]" class="form-label">Chọn nhiều hình ảnh:</label>
                </div>
            </Box>
            <Box mt="40px">
                <button type="submit" class="btn btn-primary" style={{background: "#0a58ca"}}>Thêm sản phẩm mới
                </button>
            </Box>
        </form>
    </Box>);
};

// const initialValues = {
//   name: '',
//   desc: '',
//   price: '',
//   color: '',
//   avatar: '',
//   status: 0,
//   feature: 0,
//   collection_id: 0,
//   brand_id: 0,
//   designer_id: 0,
//   category_id: 0,
// };

export default ProductCreate;
