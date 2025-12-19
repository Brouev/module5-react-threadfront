import { useState } from "react";
import "./AddComment.css";

export function AddComment({ onSubmit }) {
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    setContent("");
  }

  return (
    <form className="add-comment" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Écris un commentaire..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

            <button type="submit" hidden></button>

    </form>
  );
}

export default AddComment;
