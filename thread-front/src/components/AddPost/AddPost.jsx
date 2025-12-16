import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../services/httpClient";
import "./AddPost.css";

function AddPost() {
  const [title] = useState("Post");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!content.trim()) {
      setError("Le contenu est obligatoire.");
      return;
    }

    try {
      await request("/posts", {
        method: "POST",
        body: { title, content },
        auth: true,
      });
      navigate("/");
    } catch (err) {
      setError(err.message || "Erreur lors de la création du post.");
    }
  }

  return (
    <div className="addpost-page">
      <div className="addpost-title-wrap">
        <div className="addpost-bar" />
        <h1 className="addpost-title">New Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="addpost-form">
        <div className="addpost-card">
          <textarea
            className="addpost-textarea"
            placeholder="Tapez votre post ici ..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="addpost-date">
            15:25 - 13 août 25
          </div>
        </div>

        {error && <p className="addpost-error">{error}</p>}

        <button type="submit" className="addpost-btn">
          Poster !
        </button>
      </form>
    </div>
  );
}

export default AddPost;
	
