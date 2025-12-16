import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentCard from "../CommentCard/CommentCard.jsx";
import { AddComment } from "../AddComment/AddComment.jsx";
import PostDetailCard from "../PostDetailCard/PostDetailCard.jsx";

export default function Post({ currentUser }) {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        setError("");

        const response = await fetch("http://localhost:3000/posts", {
          method: "GET",
        });

        if (!response.ok) {
          setError("Erreur lors du chargement du post.");
          return;
        }

        const data = await response.json();
        const allPosts = data.AllPostsAndComments || [];

        const found = allPosts.find(
          (p) => p.id === Number(postId)
        );

        if (!found) {
          setError("Post introuvable.");
          return;
        }

        setPost(found);
        setComments(found.comments || []);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement du post.");
      }
    }

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div className="post-page"></div>;
  }

  const isOwner =
    currentUser && currentUser.username === post.author;

  async function handleDeletePost() {
    try {
      const res = await fetch(`http://localhost:3000/posts/${post.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        setError("Erreur lors de la suppression du post.");
        return;
      }

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la suppression du post.");
    }
  }

  async function handleAddComment(content) {
    try {
      setError("");

      const res = await fetch(
        `http://localhost:3000/posts/${post.id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ content }),
        }
      );

      if (!res.ok) {
        setError("Erreur lors de l'ajout du commentaire.");
        return;
      }

      const raw = await res.json();

      const formatted = {
        id: raw.id,
        content: raw.content,
        createdAt: raw.createdAt,
        author: currentUser?.username || "Moi",
      };

      setComments((prev) => [...prev, formatted]);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'ajout du commentaire.");
    }
  }

  async function handleCommentDeleted(commentId) {
    try {
      const res = await fetch(
        `http://localhost:3000/comments/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        setError("Erreur lors de la suppression du commentaire.");
        return;
      }

      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la suppression du commentaire.");
    }
  }

  const commentsCount = comments.length;

  return (
    <div className="post-page">
      

      <PostDetailCard post={post} />

      {isOwner && (
        <button className="post-delete-btn" onClick={handleDeletePost}>
          Supprimer le post
        </button>
      )}

      {error && <p className="post-error">{error}</p>}

      <div className="post-comments-header">
        <span>{commentsCount}</span>
      </div>

      {currentUser && <AddComment onSubmit={handleAddComment} />}

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