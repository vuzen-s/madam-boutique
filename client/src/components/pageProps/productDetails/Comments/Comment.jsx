// import formatDistance from "date-fns/formatDistance";
// import parseISO from "date-fns/parseISO";

import {Tag} from 'antd';
import './Comment.scss';

// function formatDate(dateStr) {
//   const date = parseISO(dateStr);
//   return formatDistance(date, new Date(), { addSuffix: true });
// }

const Comment = ({comment, handleDeleteItem, handleEditItem, userAuth}) => {

    function formatTimeAgo(commentDate) {
        const now = new Date();
        const commentTime = new Date(commentDate);
        const timeDifference = now - commentTime;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) {
            return 'Done';
        } else if (minutes === 1) {
            return 'One minute ago';
        } else if (minutes < 60) {
            return `${minutes} minute`;
        } else if (hours === 1) {
            return '1 Hour';
        } else if (hours < 24) {
            return `${hours} Hour ago`;
        } else if (days === 1) {
            return '1 day';
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
                    <img
                        src={comment.user.avatar != null ? comment.user.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZVnsLhjbXRN_F--iLPPJ-ED7WP3qqfwhiAkNtgKsONg&s"}
                        alt={comment.user.name}/>
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
                    ? comment.content
                    : <div style={{fontSize: '15px', color: 'grey', fontStyle: 'italic'}}>
                        {comment.content}
                        <span> - Status: Pending approval</span>
                        <Tag bordered={false} color="magenta">
                            Hidden
                        </Tag>
                    </div>
                }
            </div>

            <div className='Comment-actions'>
                {
                    (userAuth && comment.status !== 0 && userAuth.id === comment.user.id)
                    ? <div>
                        <button onClick={handleEditItem}>Edit</button>
                        <button onClick={handleDeleteItem}>Delete</button>
                    </div>
                    : ''
                }
            </div>
        </div>
    )
};

export default Comment;