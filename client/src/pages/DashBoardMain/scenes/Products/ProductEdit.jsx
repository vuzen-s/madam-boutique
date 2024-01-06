import {Box} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from 'axios';
import $ from 'jquery';
import React, {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from 'react-toastify';
import 'select2';
import 'select2/dist/css/select2.min.css';
import {csrfTokenReducer} from "../../../../redux/madamBoutiqueSlice";
import './ProductCreate.scss';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../components/Header";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ProductEdit = () => {
    const [publicPath, setPublicPath] = useState("");

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

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [optionDesigners, setOptionDesigners] = useState([]);
    const [optionBrands, setOptionBrands] = useState([]);
    const [optionCollections, setOptionCollections] = useState([]);
    const [optionCategories, setOptionCategories] = useState([]);

    const [errorsField, setErrorsField] = useState({});
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const select2Ref = useRef();

    const showToastMessage = () => {
        toast.success('Cập nhật sản phẩm thành công!', {
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

    // back
    const handleBack = () => {
        navigate('/dashboard/product');
    }

    /// Get path to public in server
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

    const dispatch = useDispatch();
    dispatch(csrfTokenReducer());
    const csrfToken = useSelector((state) => state.madamBoutiqueReducer.csrfToken);

    const {id} = useParams();

    const handleFormUpdate = async (e) => {
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
        //
        try {
            const response = await axios.patch('http://127.0.0.1:8000/api/products-update/' + id, formData, {
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

    // Get data edit by ID
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products-edit/' + id, {
            method: "GET",
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data);
                console.log(id);
                //
                setName(data.product.name);
                setDesc(data.product.desc);
                setPrice(data.product.price);
                setColor(data.product.color);
                setAvatar(data.product.avatar);
                setStatus(data.product.status);
                setFeature(data.product.feature);
                setCollection_id(data.product.collection_id);
                setBrand_id(data.product.brand_id);
                setDesigner_id(data.product.designer_id);
                setCategory_id(data.product.category_id);
                //
                setOptionDesigners(data.designers);
                setOptionBrands(data.brands);
                setOptionCollections(data.collections);
                setOptionCategories(data.categories);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }, [id]);

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
            default:
                break;
        }
    };

    // select2
    useEffect(() => {
        const $select = $('.form-select.select2ByID');
        $select.select2();

        // Đăng ký sự kiện change để theo dõi giá trị được chọn
        $select.on('change', (event) => {
            const selectedValue = event.target.value;
            console.log('Selected value:', selectedValue);
            ///
            switch (event.target.name) {
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
        });
        return () => {
            // Hủy đăng ký sự kiện khi component bị hủy
            $select.off('change');
            // Hủy Select2 khi component bị hủy
            $select.select2('destroy');
        };
    }, []);

    return (
        <Box m="20px">
            <Header title="UPDATE PRODUCT" subtitle="Update a Product"/>
            <form onSubmit={handleFormUpdate}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},
                    }}
                >
                    <div className="mb-3">
                        <label for="name" className="form-label">Tên sản phẩm:</label>
                        <input type="text" class="form-control" id="name" placeholder="Enter name" name="name"
                               onChange={handleChangeInput} value={name}/>
                        <p style={{color: "red"}}>
                            {errorsField && errorsField.name}
                        </p>
                    </div>

                    <div className="mb-3">
                        <label for="desc" className="form-label">Dòng mô tả:</label>
                        {/*<input type="text" class="form-control" id="desc" placeholder="Enter desc" name="desc"*/}
                        {/*       onChange={handleChangeInput} value={desc}/>*/}
                        <CKEditor
                            editor={ClassicEditor}
                            data={desc}
                            onChange={(event, editor) => {
                                setDesc(editor.getData());
                            }}
                        />
                        <p style={{color: "red"}}>
                            {errorsField && errorsField.desc}
                        </p>
                    </div>

                    <div className="mb-3">
                        <label for="price" className="form-label">Giá:</label>
                        <input type="text" class="form-control" id="price" placeholder="Enter price" name="price"
                               onChange={handleChangeInput} value={price}/>
                        <p style={{color: "red"}}>
                            {errorsField && errorsField.price}
                        </p>
                    </div>

                    <div className="mb-3">
                        <label for="color" className="form-label">Màu sản phẩm (không bắt buộc):</label>
                        <input class="form-control" type="text" id="color" placeholder="Enter color" name="color"
                               onChange={handleChangeInput} value={color}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Ảnh hiện tại:</label>
                        <img
                            src={avatar === "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg" ? "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg" : publicPath + "/" + avatar}
                            alt={name} width="200px" height="200px"/>
                    </div>

                    <div className="mb-3">
                        <label for="avatar" className="form-label">Ảnh đại diện mới: (Nếu cần)</label>
                        <input class="form-control" type="file" id="avatar" name="avatar"
                               onChange={handleChangeInput}/>
                        <p style={{color: "red"}}>
                            {errorsField && errorsField.avatar}
                        </p>
                    </div>

                    <div className="mb-3">
                        <label for="status" className="form-label">Trạng thái sản phẩm:</label>
                        <select className="form-select" name="status" onChange={handleChangeInput} value={status}>
                            <option value={0}> Hiển thị</option>
                            <option value={1}> Ẩn</option>
                        </select>
                        <p style={{color: "red"}}>
                            {errorsField && errorsField.status}
                        </p>
                    </div>

                    <div className="mb-3">
                        <label for="feature" className="form-label">Feature sản phẩm:</label>
                        <select className="form-select" name="feature" onChange={handleChangeInput} value={feature}>
                            <option value={0}> Nổi bật</option>
                            <option value={1}> Không nổi bật</option>
                        </select>
                        <p style={{color: "red"}}>
                            {errorsField && errorsField.feature}
                        </p>
                    </div>

                    <div className="mb-3">
                        <label for="designer_id" className="form-label">Designer:</label>
                        <select name="designer_id" className="form-select select2ByID" onChange={handleChangeInput}
                                ref={select2Ref} value={designer_id}>
                            {optionDesigners.map((item, index) => (<option key={index} value={item.id}>
                                {item.name}
                            </option>))}
                        </select>
                        <p style={{color: "red"}}>
                            {errorsField && errorsField.designer_id}
                        </p>
                    </div>

                    <div className="mb-3">
                        <label for="brand_id" className="form-label">Brand:</label>
                        <select name="brand_id" className="form-select select2ByID" onChange={handleChangeInput}
                                ref={select2Ref} value={brand_id}>
                            {optionBrands.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <p style={{color: "red"}}>
                            {errorsField && errorsField.brand_id}
                        </p>
                    </div>

                    <div className="mb-3">
                        <label for="collection_id" className="form-label">Collection:</label>
                        <select name="collection_id" className="form-select select2ByID" onChange={handleChangeInput}
                                ref={select2Ref} value={collection_id}>
                            {optionCollections.map((item, index) => (<option key={index} value={item.id}>
                                {item.name}
                            </option>))}
                        </select>
                        <p style={{color: "red"}}>
                            {errorsField && errorsField.collection_id}
                        </p>
                    </div>

                    <div className="mb-3">
                        <label for="category_id" className="form-label">Category:</label>
                        <select name="category_id" className="form-select select2ByID" onChange={handleChangeInput}
                                ref={select2Ref} value={category_id}>
                            {optionCategories.map((item, index) => (<option key={index} value={item.id}>
                                {item.name}
                            </option>))}
                        </select>
                        <p style={{color: "red"}}>
                            {errorsField && errorsField.category_id}
                        </p>
                    </div>
                    <div className="mb-3">
                        <label for="images[]" className="form-label">Hình ảnh sản phẩm:</label>
                    </div>
                </Box>
                <Box mt="40px">
                    <button type="submit" className="btn btn-primary" style={{background: "#0a58ca"}}>Cập nhật sản phẩm
                    </button>
                    <button type="button" className="btn btn-danger" style={{background: "#dc3545", marginLeft: "12px"}}
                            onClick={() => handleBack()}>Quay lại
                    </button>
                </Box>
            </form>
        </Box>
    );
};

export default ProductEdit;
