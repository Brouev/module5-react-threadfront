import { Routes, Route } from "react-router-dom";
import Feed from "./components/Feed.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import PostCardDetail from "./components/PostCardDetail.jsx";
import Profile from "./components/Profile.jsx";
import AddPost from "./components/AddPost.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Feed />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/posts/:postId" element={<PostCardDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-post" element={<AddPost />} />
    </Routes>
  );
}

export default App;
