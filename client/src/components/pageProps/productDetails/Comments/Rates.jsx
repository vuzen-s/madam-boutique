import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import Rate from './Rate';
import './Rates.scss';
import RatingProgess from './RatingProgess';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const Rates = ({ idProduct }) => {
    const [ratings, setRatings] = useState([]);
    const [contentRating, setContentRating] = useState("");
    const [openModalStore, setOpenModalStore] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [ratingByID, setRatingByID] = useState({});

    const [refreshListRating, setRefreshListRating] = useState(new Date().getTime());
    const [errorsField, setErrorsField] = useState({});

    const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);

    // call ratings all by idProduct
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/ratings-show/' + idProduct, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data);
                setRatings(data.ratings);
            })
            .catch((error) => console.log(error));
    }, [idProduct, refreshListRating]);

    // send conten rating (if)
    const sendContentRating = async () => {
        try {
            await fetch('http://127.0.0.1:8000/api/ratings-store', {
                // mode: 'no-cors',
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating: value, rating_content: contentRating, user_id: 1, product_id: idProduct }), // Chuyển đổi FormData thành đối tượng JSON
            })
                .then((respon) => respon.json())
                .then((data) => {
                    console.log(data)
                    setRefreshListRating(new Date().getTime());
                    // error
                    setErrorsField(data.errors);
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
        setOpenModalStore(false);
    }

    const handleClose = () => {
        setOpenModalStore(false);
        setOpenModalEdit(false);
    }

    const sendSubmittRating = async () => {
        if (value == null) {
            showErrorRatings();
        } else {
            await sendContentRating();
        }
    }

    const showErrorRatings = () => {
        Swal.fire("Chọn ít nhất 1 đánh giá sao.", "", "error");
        setOpenModalStore(false);
    }

    const handleEditItem = async (idComment) => {
        // Get data comment by ID
        await fetch('http://127.0.0.1:8000/api/ratings-edit/' + idComment, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data.ratings);
                setRatingByID(data.ratings);
            })
            .catch((error) => console.log(error));
        ///
        setOpenModalEdit(true);
    }

    // delete rating
    const handleDeleteItem = (idRating) => {
        Swal.fire({
            title: "Bạn chắc chắn muốn xóa đánh giá này?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Xóa",
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                await fetch('http://127.0.0.1:8000/api/ratings-destroy/' + idRating, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then((respon) => respon.json())
                    .then((data) => {
                        console.log(data);
                        console.log(idRating);
                        // handle event
                        setRefreshListRating(new Date().getTime());
                        Swal.fire("Đã xóa!", "", "success");
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }
        });
    }

    // updated
    const handleRatingUpdate = async (idRating) => {
        try {
            await fetch('http://127.0.0.1:8000/api/ratings-update/' + idRating, {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ratingByID), // Chuyển đổi FormData thành đối tượng JSON
            })
                .then((respon) => respon.json())
                .then((data) => {
                    console.log(ratingByID);
                    setRefreshListRating(new Date().getTime());
                    // Nếu có lỗi validate từ Laravel, cập nhật trạng thái errors
                    console.log(data.errors);
                    setErrorsField(data.errors);
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
        setOpenModalEdit(false);
    }

    return (
        <div>
            <h3 className="Comments-title">
                {ratings.length <= 1 ? `${ratings.length} rating` : `${ratings.length} ratings`}
            </h3>
            <p style={{ margin: '16px', marginTop: '0px', fontStyle: 'italic' }}>{ratings.length === 0 ? 'Hãy là người đầu tiên đánh giá!' : ''}</p>
            <hr />
            <div className='ratings'>
                <div className='action-rating'>
                    <h4>Đánh giá theo mức độ hài lòng</h4>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                        <Rating
                            name="hover-feedback"
                            value={value}
                            precision={0.5}
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        <span>{value !== null && (
                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}</span>
                    </div>
                    <button type="submit" class="btn btn-danger" style={{ background: '#dc3545', color: "#fff" }} onClick={() => setOpenModalStore(true)}>Gửi đánh giá</button>
                </div>
                <div className='progress-rating'>
                    <RatingProgess ratings={ratings} idProduct={idProduct}/>
                </div>
            </div>
            <hr />
            <div className="ratings-list">
                {ratings.slice().reverse().map((rating) => (
                    <Rate
                        key={rating.id}
                        rating={rating}
                        value={rating.rating}
                        handleEditItem={() => handleEditItem(rating.id)}
                        handleDeleteItem={() => handleDeleteItem(rating.id)}
                    />
                ))}
            </div>
            <hr />
            {/* Modal Edit*/}
            <Modal show={openModalEdit} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa bài đánh giá của bạn ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea
                        value={ratingByID.rating_content}
                        onChange={(e) => setRatingByID((prev) => ({ ...prev, 'rating_content': e.target.value }))}
                        name="rating_content"
                        className="Comments-box__input"
                        placeholder="Nhập nội dung"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Thoát
                    </Button>
                    <Button variant="primary" onClick={() => handleRatingUpdate(ratingByID.id)} style={{ background: "red", borderColor: "red" }}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Modal Store*/}
            <Modal show={openModalStore} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cảm ơn đã để lại đánh giá. Bạn có muốn gửi gì đó cho chúng tôi không ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea
                        onChange={(e) => setContentRating(e.target.value)}
                        name="content"
                        className="Comments-box__input"
                        placeholder="Nhập nội dung (không bắt buộc)"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Thoát
                    </Button>
                    <Button variant="primary" onClick={() => sendSubmittRating()} style={{ background: "red", borderColor: "red" }}>
                        Gửi đánh giá
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Rates;