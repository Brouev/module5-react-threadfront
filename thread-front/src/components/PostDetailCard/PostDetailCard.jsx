import "./PostDetailCard.css";

function PostDetailCard({post}) {

    return (
        <div className="post-detail-card">
            <div className="post-detail-info">
                <h3 className="post-author-name">@{post.author}</h3>
                <p className="post-content">{post.content}</p>
            </div>
            <div className="post-detail-date">
                <p>{post.createdAt}</p>
            </div>
        </div>
    )
}
export default PostDetailCard;