import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import CommentAdmin from "./CommentAdmin";

const Details = () => {
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const [refreshListCommend, setRefreshListCommend] = useState(new Date().getTime());

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

    const handleAcceptItem = () => {
        //
    }

    const handleDeleteItem = () => {
        //
    }

    return (
        <div>
            <h3 className="Comments-title">
                {(comments.length === 1 && comments.length !== undefined) ? `1 comment` : `${comments.length} comments`}
            </h3>
            <div className="Comments-list">
                {comments.map((comment) => (
                    <CommentAdmin
                        key={comment.id}
                        comment={comment}
                        handleEditItem={() => handleAcceptItem(comment.id)}
                        handleDeleteItem={() => handleDeleteItem(comment.id)}
                    />
                ))}
            </div>        </div>
    );
}

export default Details;