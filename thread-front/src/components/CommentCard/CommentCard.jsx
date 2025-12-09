import "./CommentCard.css";

function CommentCard({ comment }) {
  return (
    <div className="comment-card">
      <div className="comment-author">
        <h3>@{comment.author.username}</h3>
      </div>
      <div className="comment-info">
        <p>{comment.content}</p>
        <p className="comment-date">{comment.createdAt}</p>
      </div>
    </div>
  );
}

export default CommentCard;
