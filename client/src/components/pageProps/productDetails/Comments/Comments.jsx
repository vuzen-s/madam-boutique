import { useEffect, useState } from "react";
import Comment from "./Comment";
import './Comment.scss';

const Comments = ({ selectedUserId, idProduct }) => {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  async function sendComment() {
    const result = await fetch("http://localhost:8000/comments-store", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: input, authorId: selectedUserId }),
    });
    const comment = await result.json();
    setComments((comments) => [...comments, comment]);
  }

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
  }, [idProduct]);

  return (
    <div className="Comments">
      <h3 className="Comments-title">
        {(comments.length === 1) ? `1 comment` : `${comments.length} comments`}
      </h3>

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
          onSubmit={(e) => {
            e.preventDefault();
            sendComment(input);
            setInput("");
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name="body"
            className="Comments-box__input"
          />
          <button
            type="submit"
            disabled={selectedUserId === ""}
            className="Comments-box__btn"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;