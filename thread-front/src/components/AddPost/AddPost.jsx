import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../services/httpClient";

function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Titre et contenu sont obligatoires.");
      return;
    }

    try {
      await request("/posts", {
        method: "POST",
        body: { title, content },
        auth: true, // cookie JWT
      });
      navigate("/");
    } catch (err) {
      setError(err.message || "Erreur lors de la création du post.");
    }
  }

  return (
    <div className="new-post-page">
      <h1 className="page-title">New Post</h1>

      <form onSubmit={handleSubmit} className="new-post-form">
        <input
          type="text"
          className="new-post-title"
          placeholder="Titre du post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="new-post-textarea"
          placeholder="Tape ton post ici..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {error && <p className="new-post-error">{error}</p>}

        <button type="submit" className="new-post-submit">
          Poster !
        </button>
      </form>
    </div>
  );
}

export default AddPost;
