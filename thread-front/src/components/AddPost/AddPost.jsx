import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../services/httpClient";

export default function AddPost() {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!content.trim()) {
      setError("Le post ne doit pas être vide");
      return;
    }

    try {
      await request("/posts", {
        method: "POST",
        body: { content },
        auth: true, // send cookies JWT
      });

      //redirection autofeed après post
      navigate("/");
    } catch (err) {
      setError(err.message || "Erreur lors de la création du post");
    }
  }

  const currentDate = new Date().toLocaleString(); // date sous zone

  return (
    <div className="new-post-page">
      <h1 className="page-title">New Post</h1>

      <form onSubmit={handleSubmit} className="new-post-form">
        <div className="new-post-card">
          <textarea
            className="new-post-textarea"
            placeholder="Tapez votre post ici ..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <p className="new-post-date">{currentDate}</p>
        </div>

        {error && <p className="new-post-error">{error}</p>}

        <button type="submit" className="new-post-submit">
          Poster !
        </button>
      </form>
    </div>
  );
}
