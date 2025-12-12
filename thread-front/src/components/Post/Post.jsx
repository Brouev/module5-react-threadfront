import { useState } from "react";
import { request } from "../../services/httpClient";
import PostDetailCard from "../PostDetailCard/PostDetailCard.jsx";  // Bon chemin
import AddComment from "../AddComment/AddComment.jsx";              // Bon chemin
import CommentCard from "../CommentCard/CommentCard.jsx";           // -Bon chemin


export default function Post({ post, currentUser, onPostDeleted }) {
  if (!post) return <div></div>;

  const [comments, setComments] = useState(post.comments || []);
  const commentsCount = comments.length;

  const isOwner =
    currentUser && post.author && currentUser.id === post.author.id;

  async function handleDeletePost() {
    try {
      await request(`/posts/${post.id}`, {
        method: "DELETE",
        auth: true,
      });
      if (onPostDeleted) onPostDeleted(post.id);
    } catch (err) {
      console.error(err);
    }
  }

  function handleCommentAdded(newComment) {
    if (!newComment) return;
    setComments((prev) => [...prev, newComment]);
  }

  function handleCommentDeleted(commentId) {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  }

  return (
    <div className="post-page">
      

      <PostDetailCard post={post} />

      {isOwner && (
        <button className="post-delete-btn" onClick={handleDeletePost}>
          Supprimer le post
        </button>
      )}

      <div className="post-comments-header">
        <span>{commentsCount}</span>
        <span className="comment-icon">💬</span>
      </div>

      {currentUser && (
        <AddComment
          postId={post.id}
          currentUser={currentUser}
          onCommentAdded={handleCommentAdded}
        />
      )}

      <div className="post-comments-list">
        {comments.length === 0 ? (
          <p>Aucun commentaire pour l’instant.</p>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              currentUser={currentUser}
              onDelete={handleCommentDeleted}
            />
          ))
        )}
      </div>
    </div>
  );
}