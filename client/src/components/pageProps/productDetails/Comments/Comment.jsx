// import formatDistance from "date-fns/formatDistance";
// import parseISO from "date-fns/parseISO";
import './Comment.scss';

// function formatDate(dateStr) {
//   const date = parseISO(dateStr);
//   return formatDistance(date, new Date(), { addSuffix: true });
// }

const Comment = ({ comment, isYou }) => (
  <div className="Comment">
    <div className="Comment-header">
      <div className="Comment-avatar">
        <img src={comment.user.avatar} alt={comment.user.name} />
      </div>
      <span className="Comment-author">
        {isYou ? "You" : comment.user.fullname}
      </span>
      <span className="Comment-time">{comment.created_at}</span>
    </div>

    <div className="Comment-body">{comment.content}</div>
  </div>
);

export default Comment;