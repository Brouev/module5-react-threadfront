import "./CommentCard.css";

function CommentCard({ comment, currentUser, onDelete }) {
  // Est-ce que l'utilisateur connecté est l'auteur du commentaire ?
  const isAuthor =
    currentUser &&
    currentUser.username === comment.author.username;

  function handleDelete() {
    if (!onDelete) return;
    onDelete(comment.id);
  }

  return (
    <div className="comment-card">
      <div className="comment-header">
        <div className="comment-author">
          <h3>@{comment.author.username}</h3>
        </div>

        {isAuthor && (
          <button
            className="comment-delete-btn"
            type="button"
            onClick={handleDelete}
          >
            ✕
          </button>
        )}
      </div>

      <div className="comment-info">
        <p>{comment.content}</p>
        <p className="comment-date">{comment.createdAt}</p>
      </div>
    </div>
  );
}

export default CommentCard;
