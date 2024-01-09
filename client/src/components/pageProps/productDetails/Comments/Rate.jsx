import Rating from '@mui/material/Rating';
import './Comment.scss';

const Rate = ({rating, value, handleDeleteItem, handleEditItem, userAuth}) => {

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
            return 'One minute ago';
        } else if (minutes < 60) {
            return `${minutes} minute ago`;
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
                        src={rating.user.avatar != null ? rating.user.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZVnsLhjbXRN_F--iLPPJ-ED7WP3qqfwhiAkNtgKsONg&s"}
                        alt={rating.user.name}/>
                </div>
                <span className="Comment-author">
                    {rating.user.fullname}
                </span>
                <span className="Comment-time">{formatTimeAgo(rating.created_at)}</span>
            </div>
            <div className="Comment-body">
                <Rating name="half-rating-read" defaultValue={value} precision={0.5} readOnly/>
                <br/>
                {rating.rating_content == null ? '' : rating.rating_content}
            </div>
            {
                (userAuth && userAuth.id === rating.user.id)
                    ? <div className='Comment-actions'>
                        <button onClick={handleEditItem}>Edit</button>
                        <button onClick={handleDeleteItem}>Delete</button>
                    </div>
                    : <span></span>
            }
        </div>
    )
};

export default Rate;