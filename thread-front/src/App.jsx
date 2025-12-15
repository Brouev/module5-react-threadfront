import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Feed from "./components/Feed/Feed.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import PostDetailCard from "./components/PostDetailCard/PostDetailCard.jsx";
import Profile from "./components/Profile/Profile.jsx";
import AddPost from "./components/AddPost/AddPost.jsx";
import {AddComment} from "./components/AddComment/AddComment.jsx";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Feed currentUser={currentUser} />} />
      <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
      <Route path="/register" element={<Register setCurrentUser={setCurrentUser} />} />
      <Route path="/posts/:postId" element={<PostDetailCard currentUser={currentUser} />} />
      <Route path="/profile" element={<Profile currentUser={{ id: 1, username: 'guest' }} />} />
      <Route path="/add-comment/:postId" element={<AddComment currentUser={currentUser} />} />
     <Route path="/add-post" element={<AddPost currentUser={currentUser} />} /> 
      
    </Routes>
  );
}

export default App;