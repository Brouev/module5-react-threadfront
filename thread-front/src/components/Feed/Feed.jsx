import { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard.jsx";
import "./Feed.css";

export default function Feed({ currentUser }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        setError("");
        setLoading(true);

        const response = await fetch("http://localhost:3000/posts", {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Données des posts récupérées :", data);
          // adapte au vrai format retourné par le back
          setPosts(data.AllPostsAndComments || []);
        } else {
          setError("Erreur lors du chargement des posts");
        }
      } catch (err) {
        console.log("API non accessible");
        setError("API non accessible");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="feed-page">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="feed-page">
      <h1 className="page-title">Feed</h1>
      {error && <p className="feed-error">{error}</p>}

      {posts.length === 0 ? (
        <p>Aucun post pour l'instant.</p>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={currentUser}
              onPostDeleted={(postId) =>
                setPosts((prev) => prev.filter((p) => p.id !== postId))
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
