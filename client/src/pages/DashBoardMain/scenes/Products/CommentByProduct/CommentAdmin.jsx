// import formatDistance from "date-fns/formatDistance";
// import parseISO from "date-fns/parseISO";

import { Tag } from 'antd';

// function formatDate(dateStr) {
//   const date = parseISO(dateStr);
//   return formatDistance(date, new Date(), { addSuffix: true });
// }

const CommentAdmin = ({ comment, handleDeleteItem, handleEditItem }) => {

    function formatTimeAgo(commentDate) {
        const now = new Date();
        const commentTime = new Date(commentDate);
        const timeDifference = now - commentTime;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) {
            return 'done';
        } else if (minutes === 1) {
            return '1 minute ago';
        } else if (minutes < 60) {
            return `${minutes} minute ago`;
        } else if (hours === 1) {
            return '1 hours ago';
        } else if (hours < 24) {
            return `${hours} hours ago`;
        } else if (days === 1) {
            return '1 Day ago';
        } else if (days < 31) {
            return `${days} Day ago`;
        } else {
            return commentTime.toLocaleString('vi-VN');
        }
    }

    return (
        <div className="Comment">
            <div className="Comment-header">
                <div className="Comment-avatar">
                    <img src={comment.user.avatar != null ? comment.user.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZVnsLhjbXRN_F--iLPPJ-ED7WP3qqfwhiAkNtgKsONg&s"} alt={comment.user.name} />
                </div>
                {/* <span className="Comment-author">
        {isYou ? "You" : comment.user.fullname}
      </span> */}
                <span className="Comment-author">
                    {comment.user.fullname}
                </span>
                <span className="Comment-time">{formatTimeAgo(comment.created_at)}</span>
            </div>

            <div className="Comment-body">
                {comment.status !== 0
                    ? <div>
                        {comment.content}
                        <Tag bordered={false} color="green">
                            Showed
                        </Tag>
                    </div>
                    : <div style={{ fontSize: '15px', color: 'grey', fontStyle: 'italic' }}>
                        {comment.content}
                        <span > Status: Pending approval</span>
                        <Tag bordered={false} color="magenta">
                            Hidden
                        </Tag>
                    </div>
                }
            </div>

            <div className='Comment-actions'>
                {comment.status === 0
                    ? <div>
                        <button onClick={handleEditItem} style={{ background: "green", color: "white", padding: '8px 16px', borderRadius: '4px' }}>Oke</button>
                        <button onClick={handleDeleteItem} style={{ background: "red", color: "white", padding: '8px 16px', borderRadius: '4px' }}>Delete</button>
                    </div>
                    : ''
                }
            </div>
        </div>
    )
};

export default CommentAdmin;