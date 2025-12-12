import "./PostCard.css"
import { useNavigate } from "react-router-dom";

function PostCard({post}) {
    const navigate = useNavigate();
    
const handleClick = () => {
    navigate(`/posts/${post.id}`)
} 

    return (
        <div className="post-card" onClick={handleClick}>
            <div className="post-infos">
            <h3 className="post-author-name">@{post.author}</h3>
            <p className="post-content">{post.content}</p>
            <p className="post-date">{post.createdAt}</p>
            </div>
        </div>
    )
}

export default PostCard;