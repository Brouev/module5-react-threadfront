import { useEffect, useState } from "react";
import { request } from "../../services/httpClient.js";
import PostCard from "../PostCard/PostCard.jsx";
import "./Feed.css";

export default function Feed({ currentUser }) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "@Ryu-du57",
      content: "Aujourd'hui je me suis promené sous la pluie. 🌧️",
      createdAt: "2025-12-11T15:25:00"
    },
    {
      id: 2,
      author: "@Ryu-du57",
      content: "Ah bon, nous avons eu du soleil ici ! 🌧️",
      createdAt: "2025-12-11T15:25:00"
    },
    {
      id: 3,
      author: "@Ryu-du57",
      content: "Bah, après la pluie, le beau temps.... 🌧️",
      createdAt: "2025-12-11T15:25:00"
    },
    {
      id: 4,
      author: "@Ryu-du57",
      content: "Tu as raison, va aux escargots d'ici le retour de l'astre divin. 🌧️",
      createdAt: "2025-12-11T15:25:00"
    },
    {
      id: 5,
      author: "@Ryu-du57",
      content: "Oui, les escargots, avec du persil, c'est très bon.",
      createdAt: "2025-12-11T15:25:00"
    }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        setError("");
        setLoading(true);
        const data = await request("/posts", { auth: false });
        setPosts(data || []);
      } catch (err) {
        console.log("API non accessible, affichage des données fictives");
      } finally {
        setLoading(false);
      }
    }

    // Décommente pour tester l'API :
    // fetchPosts();
  }, []);

  if (loading) return <div className="feed-page"><p>Chargement...</p></div>;

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
              onPostDeleted={(postId) => setPosts(prev => prev.filter(p => p.id !== postId))}
            />
          ))}
        </div>
      )}
    </div>
  );
}
