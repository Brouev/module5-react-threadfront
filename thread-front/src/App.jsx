import "./App.css";
import { Routes, Route } from "react-router-dom";

import Feed from "./components/Feed.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Profil from "./components/Profil.jsx";
import AddPost from "./components/AddPost.jsx";
import PostDetailCard from "./components/PostDetailCard.jsx";

function App() {
  return (
    <Routes>
      {/* feed */}
      <Route path="/" element={<Feed />} />

      {/* auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* profil user connecté */}
      <Route path="/profile" element={<Profil />} />

      {/* add post */}
      <Route path="/add-post" element={<AddPost />} />

      {/* detail post */}
      <Route path="/posts/:postId" element={<PostDetailCard />} />
    </Routes>
  );
}

export default App;
