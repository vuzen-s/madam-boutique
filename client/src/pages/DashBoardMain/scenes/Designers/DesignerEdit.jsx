import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { csrfTokenReducer } from "../../../../redux/madamBoutiqueSlice";
import Header from "../../components/Header";

const DesignerEdit = () => {
    const [dataDesigner, setDataDesigner] = useState({
        name: '',
        address: '',
    });

    const navigate = useNavigate();

    const dispatch = useDispatch();
    dispatch(csrfTokenReducer());
    const csrfToken = useSelector((state) => state.madamBoutiqueReducer.csrfToken);

    const [errorsField, setErrorsField] = useState({});
    const [message, setMessage] = useState('');

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const showToastMessage = () => {
        toast.success('Update Nhà thiết kế thành công!', {
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

    const { id } = useParams();

    // Get data edit by ID
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/designers-edit/' + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data);
                console.log(id);
                setDataDesigner(data.designer)
            })
            .catch((error) => console.log(error));
    }, [id]);

    const handleFormUpdate = async () => {
        try {
            await fetch('http://127.0.0.1:8000/api/designers-update/' + id, {
                method: "PATCH",
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataDesigner), // Chuyển đổi FormData thành đối tượng JSON
            })
                .then((respon) => respon.json())
                .then((data) => {
                    console.log(dataDesigner);
                    // Nếu có lỗi validate từ Laravel, cập nhật trạng thái errors
                    console.log(data.errors);
                    setErrorsField(data.errors);
                    // message
                    console.log(data.message);
                    setMessage(data.message);
                    // Xử lý dữ liệu thành công nếu cần
                    if (data.errors === undefined) {
                        navigate('/dashboard/designer/')
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

    const handleBack = () => {
        navigate('/dashboard/designer');
    }

    // Hàm xử lý khi giá trị của trường form thay đổi
    const handleChangeInput = (event) => {
        console.log(event.target)
        const { name, value } = event.target;
        setDataDesigner({ ...dataDesigner, [name]: value });
    };

    return (
        <Box m="20px">
            <Header title="EDIT DESIGNER" subtitle="Edit a Designer" />

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
                        <Box>
                            <div class="mb-6">
                                <label for="name" class="form-label">Tên bộ sưu tập:</label>
                                <input type="text" class="form-control" id="name" placeholder="Enter name" name="name" value={dataDesigner.name} onChange={handleChangeInput} />
                                <p style={{ color: "red" }}>
                                    {errorsField && errorsField.name}
                                </p>
                            </div>
                            <div class="mb-6">
                                <label for="address" class="form-label">Địa chỉ:</label>
                                <input type="text" class="form-control" id="address" placeholder="Enter address" name="address" value={dataDesigner.address} onChange={handleChangeInput} />
                                <p style={{ color: "red" }}>
                                    {errorsField && errorsField.address}
                                </p>
                            </div>
                        </Box>
                        <Box mt="10px">
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
    name: ''
};

export default DesignerEdit;