import "./LatestPost.css"

function LatestPost({latestPost}) {

    return (
        <div className="latest-post-card">
            <div className="latest-post-date">
            <p>Dernier post le </p>
            <p className="post-date">{latestPost.createdAt}</p>
            </div>
            <p className="latest-post-content">{latestPost.content}</p>
        </div>
    )
}

export default LatestPost;