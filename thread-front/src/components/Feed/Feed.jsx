import { useEffect, useState } from "react";
import { request } from "../../services/httpClient.js";  // Bon chemin
import Post from "../Post/Post.jsx";                      // Bon chemin

export default function Feed({ currentUser }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        setError("");
        setLoading(true);
        const data = await request("/posts", { auth: false });
        setPosts(data || []);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement du feed.");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <div className="feed-page"><p>Chargement...</p></div>;
  if (error) return <div className="feed-page"><p className="feed-error">{error}</p></div>;
  if (!posts || posts.length === 0) return <div className="feed-page"><p>Aucun post pour l'instant.</p></div>;

  return (
    <div className="feed-page">
      <h1 className="page-title">Feed</h1>
      {error && <p className="feed-error">{error}</p>}

      <div className="posts-list">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            currentUser={currentUser}
            onPostDeleted={(postId) => setPosts(prev => prev.filter(p => p.id !== postId))}
          />
        ))}
      </div>
    </div>
  );
}
