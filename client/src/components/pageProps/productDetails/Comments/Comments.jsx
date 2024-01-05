import {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import Comment from "./Comment";
import './Comment.scss';
import Rates from "./Rates";
import useAuthContext from "../../../../pages/AuthContext/AuthContext";
import axios from "axios";
import api from "../../../../pages/AuthContext/api";
import {useNavigate} from "react-router-dom";

const Comments = ({selectedUserId, idProduct}) => {

    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const [errorsField, setErrorsField] = useState({});
    const [refreshListCommend, setRefreshListCommend] = useState(new Date().getTime());
    const [openModal, setOpenModal] = useState(false);
    const [commentByID, setCommentByID] = useState({});

    const [userAuth, setUserAuth] = useState(null);

    const navigate = useNavigate();

    // get user comment
    useEffect( () => {
         api.get(`/api/auth/user-profile`)
            .then((res) => {
                if (res.data.status === 200) {
                    console.log(res.data.user);
                    setUserAuth(res.data.user);
                }
            })
            .catch((e) => {
                if (e.response && e.response.status === 401) {
                    console.log(e);
                }
            });
    }, []);

    const sendComment = async () => {
        try {
            await fetch('http://127.0.0.1:8000/api/comments-store', {
                // mode: 'no-cors',
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({content: content, user_id: userAuth.id, product_id: idProduct}), // Chuyển đổi FormData thành đối tượng JSON
            })
                .then((respon) => respon.json())
                .then((data) => {
                    console.log(data)
                    setRefreshListCommend(new Date().getTime());
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
    };

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/comments-show/' + idProduct, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data);
                setComments(data.comments);
            })
            .catch((error) => console.log(error));
    }, [idProduct, refreshListCommend]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendComment();
        setContent("");
    }

    const handleDeleteItem = (idComment) => {
        Swal.fire({
            title: "Bạn chắc chắn muốn xóa bình luận này?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Xóa",
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                await fetch('http://127.0.0.1:8000/api/comments-destroy/' + idComment, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then((respon) => respon.json())
                    .then((data) => {
                        console.log(data);
                        console.log(idComment);
                        // handle event
                        Swal.fire("Đã xóa!", "", "success");
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.log(error)
                        // Swal.fire("Không thể xóa value này vì nó đang là khóa ngoại!", "", "error");
                    });
            }
        });
    }

    const handleEditItem = async (idComment) => {
        // Get data comment by ID
        await fetch('http://127.0.0.1:8000/api/comments-edit/' + idComment, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data.comments);
                setCommentByID(data.comments);
            })
            .catch((error) => console.log(error));
        ///
        setOpenModal(true);
    }

    const handleClose = () => {
        setOpenModal(false);
    }

    const handleCommentUpdate = async (idComment) => {
        try {
            await fetch('http://127.0.0.1:8000/api/comments-update/' + idComment, {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentByID), // Chuyển đổi FormData thành đối tượng JSON
            })
                .then((respon) => respon.json())
                .then((data) => {
                    console.log(commentByID);
                    setRefreshListCommend(new Date().getTime());
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
        setOpenModal(false);
    };

    return (
        <div>
            <div className="Comments">
                <h3 className="Comments-title">
                    {(comments.length === 1 && comments.length !== undefined) ? `1 comment` : `${comments.length} comments`}
                </h3>
                <p style={{
                    margin: '16px',
                    marginTop: '0px',
                    fontStyle: 'italic',
                    color: '#000'
                }}>{comments.length === 0 ? 'Hãy là người đầu tiên bình luận!' : ''}</p>

                <div className="Comments-list">
                    {comments.map((comment) => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            isYou={selectedUserId === comment.user.id}
                            handleEditItem={() => handleEditItem(comment.id)}
                            handleDeleteItem={() => handleDeleteItem(comment.id)}
                            userAuth={userAuth}
                        />
                    ))}
                </div>
                <div className="Comments-box">
                    <form
                        className=""
                        onSubmit={handleSubmit}
                    >
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                name="content"
                className="Comments-box__input"
                placeholder="Nhập nội dung"
            />
                        <p style={{color: "red", fontSize: '15px'}}>
                            {errorsField && errorsField.content}
                        </p>
                        <button type="submit" class="btn btn-dark">Đăng</button>
                    </form>
                </div>
                {/* Modal Edit */}
                <div
                    className="modal show"
                    style={{display: 'block', position: 'initial'}}
                >
                    <Modal show={openModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Chỉnh sửa bình luận</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
              <textarea
                  value={commentByID.content}
                  onChange={(e) => setCommentByID((prev) => ({...prev, 'content': e.target.value}))}
                  name="content"
                  className="Comments-box__input"
                  placeholder="Nhập nội dung"
              />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => handleClose()}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => handleCommentUpdate(commentByID.id)}
                                    style={{background: "red", borderColor: "red"}}>
                                Lưu thay đổi
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Comments;