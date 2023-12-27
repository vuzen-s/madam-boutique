import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import CommentAdmin from "./CommentAdmin";

const Details = () => {
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const [refreshListCommend, setRefreshListCommend] = useState(new Date().getTime());
    const [errorsField, setErrorsField] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/comments-show/' + id, {
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
    }, [id, refreshListCommend]);

    const handleAcceptItem = async (idComment, content) => {
        try {
            await fetch('http://127.0.0.1:8000/api/comments-update/' + idComment, {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: content, status: 1 }), // Chuyển đổi FormData thành đối tượng JSON
            })
                .then((respon) => respon.json())
                .then((data) => {
                    console.log(data);
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
    }

    const handleDeleteItem = (idComment) => {
        Swal.fire({
            title: "Bạn chắc chắn muốn xóa vĩnh viễn bình luận này?",
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
                        setRefreshListCommend(new Date().getTime());
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }
        });
    }

    const handleAcceptAll = () => {
        Swal.fire({
            title: "Bạn chắc chắn muốn hiển thị tất cả bình luận?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Hiển thị",
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                fetch('http://127.0.0.1:8000/api/ratings-update-hidden/' + id, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then((respon) => respon.json())
                    .then((data) => {
                        console.log(data);
                        setRefreshListCommend(new Date().getTime());
                    })
                    .catch((error) => console.log(error));
            }
        });
    }

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/dashboard/product/comment');
    }

    return (
        <div>
            <div className="details-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 className="Comments-title">
                    {(comments.length === 1 && comments.length !== undefined) ? `1 comment` : `${comments.length} comments`}
                </h3>
                <div style={{ display: 'flex', columnGap: '12px' }}>
                    <button type="button" class="btn btn-success" style={{ background: '#2eb85c', color: '#fff', border: 'none' }} onClick={() => handleAcceptAll()}>
                        Duyệt tất cả
                    </button>
                    <button onClick={() => handleBack()} style={{ background: "#b21414", color: "white", padding: '6px 16px', borderRadius: '8px' }}>Quay lại</button>
                </div>
            </div>
            <div className="Comments-list">
                {comments.map((comment) => (
                    <CommentAdmin
                        key={comment.id}
                        comment={comment}
                        handleEditItem={() => handleAcceptItem(comment.id, comment.content)}
                        handleDeleteItem={() => handleDeleteItem(comment.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Details;