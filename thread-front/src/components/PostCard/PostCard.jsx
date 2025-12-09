import "./PostCard.css"

function PostCard({post}) {

    return (
        <div className="post-card">
            <div className="post-infos">
            <h3 className="post-author-name">@{post.author.username}</h3>
            <p className="post-content">{post.content}</p>
            <p className="post-date">{post.createdAt}</p>
            </div>
        </div>
    )
}

export default PostCard;