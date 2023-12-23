import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import Comment from "./Comment";
import './Comment.scss';

const Comments = ({ selectedUserId, idProduct }) => {

  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [errorsField, setErrorsField] = useState({});
  const [message, setMessage] = useState('');
  const [refreshListCommend, setRefreshListCommend] = useState(new Date().getTime());

  const sendComment = async () => {
    try {
      await fetch('http://127.0.0.1:8000/api/comments-store', {
        // mode: 'no-cors',
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: content, user_id: 1, product_id: idProduct }), // Chuyển đổi FormData thành đối tượng JSON
      })
        .then((respon) => respon.json())
        .then((data) => {
          console.log(data)
          setRefreshListCommend(new Date().getTime());
          // error
          setErrorsField(data.errors);
          // message
          console.log(data.message);
          setMessage(data.message);
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

  const handleDeleteItem = (idDesigner) => {
    Swal.fire({
      title: "Bạn chắc chắn muốn xóa Nhà thiết kế này?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Xóa",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await fetch('http://127.0.0.1:8000/api/designers-destroy/' + idDesigner, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then((respon) => respon.json())
          .then((data) => {
            console.log(data);
            console.log(idDesigner);
            // handle event
            Swal.fire("Đã xóa!", "", "success");
            window.location.reload();
          })
          .catch((error) => {
            console.log(error)
            Swal.fire("Không thể xóa value này vì nó đang là khóa ngoại!", "", "error");
          });
      }
    });
  }

  return (
    <div className="Comments">
      <h3 className="Comments-title">
        {(comments.length === 1) ? `1 comment` : `${comments.length} comments`}
      </h3>
      <p style={{ margin: '16px', marginTop: '0px', fontStyle: 'italic', color: '#fff' }}>{comments.length === 0 ? 'Hãy là người đầu tiên bình luận!' : ''}</p>

      <div className="Comments-list">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            isYou={selectedUserId === comment.user.id}
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
          <p style={{ color: "red", fontSize: '15px' }}>
            {errorsField && errorsField.content}
          </p>
          <button type="submit" class="btn btn-dark">Đăng</button>
        </form>
      </div>
    </div>
  );
};

export default Comments;