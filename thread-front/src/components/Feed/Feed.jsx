import { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard.jsx";
import "./Feed.css";
import { useNavigate } from "react-router-dom";

export default function Feed({ currentUser }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      try {
        setError("");
        setLoading(true);

        const response = await fetch("http://localhost:3000/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Données des posts récupérées :", data);
          setPosts(data.AllPostsAndComments || []);
        } else {
          setError("Erreur lors du chargement des posts");
        }
      } catch (err) {
        console.log("API non accessible", err);
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

      <div className='addPost'>
        <div>
          <button
            className='addPost' onClick={() => navigate('/add-post')}>
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 0C10.2944 0 0 10.2944 0 23C0 35.7056 10.2944 46 23 46C35.7056 46 46 35.7056 46 23C46 10.2944 35.7056 0 23 0ZM36.3548 25.5968C36.3548 26.2089 35.854 26.7097 35.2419 26.7097H26.7097V35.2419C26.7097 35.854 26.2089 36.3548 25.5968 36.3548H20.4032C19.7911 36.3548 19.2903 35.854 19.2903 35.2419V26.7097H10.7581C10.146 26.7097 9.64516 26.2089 9.64516 25.5968V20.4032C9.64516 19.7911 10.146 19.2903 10.7581 19.2903H19.2903V10.7581C19.2903 10.146 19.7911 9.64516 20.4032 9.64516H25.5968C26.2089 9.64516 26.7097 10.146 26.7097 10.7581V19.2903H35.2419C35.854 19.2903 36.3548 19.7911 36.3548 20.4032V25.5968Z" fill="#E3E3E3" />
            </svg>

          </button>
        </div>

        <div>
          <button className='connectProfile' placeholder="connectProfile" onClick={() => navigate('/profile')}>
            <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_4_52)">
                <circle cx="26.5" cy="22.5" r="22.5" fill="white" />
              </g>
              <path d="M26.8082 3.69861C16.2517 3.69861 7.69862 12.2517 7.69862 22.8082C7.69862 33.3647 16.2517 41.9178 26.8082 41.9178C37.3647 41.9178 45.9178 33.3647 45.9178 22.8082C45.9178 12.2517 37.3647 3.69861 26.8082 3.69861ZM26.8082 11.0959C30.5531 11.0959 33.589 14.1318 33.589 17.8767C33.589 21.6216 30.5531 24.6575 26.8082 24.6575C23.0633 24.6575 20.0274 21.6216 20.0274 17.8767C20.0274 14.1318 23.0633 11.0959 26.8082 11.0959ZM26.8082 37.6027C22.2851 37.6027 18.232 35.5531 15.5197 32.3476C16.9683 29.6198 19.8039 27.7397 23.1096 27.7397C23.2945 27.7397 23.4794 27.7705 23.6567 27.8245C24.6584 28.1481 25.7063 28.3561 26.8082 28.3561C27.9101 28.3561 28.9657 28.1481 29.9598 27.8245C30.137 27.7705 30.3219 27.7397 30.5068 27.7397C33.8125 27.7397 36.6481 29.6198 38.0967 32.3476C35.3844 35.5531 31.3313 37.6027 26.8082 37.6027Z" fill="url(#paint0_radial_4_52)" />
              <defs>
                <filter id="filter0_d_4_52" x="0" y="0" width="53" height="53" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_52" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4_52" result="shape" />
                </filter>
                <radialGradient id="paint0_radial_4_52" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(34.2055 35.137) rotate(-127.003) scale(26.6302)">
                  <stop offset="0.37675" />
                  <stop offset="0.943057" stop-color="#191919" />
                </radialGradient>
              </defs>
            </svg>
          </button>
        </div>
      </div>
    </div >
  );
}
