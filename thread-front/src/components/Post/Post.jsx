import {Link} from 'react-router-dom';
import PostDetailCard from '../PostDetailCard/PostDetailCard.jsx';
import CommentCard from '../CommentCard/CommentCard.jsx';
import './Post.css';

function Post({post}) {
  return (
    <div className="post-container">
      <div className="post-detail">
        <h1>Post</h1>
        <PostDetailCard post={post} />
      </div>
      <div className="post-comments">
        <p>{post.comments.length} icone de commentaire</p>
        {post.comments.map (comment => <CommentCard comment={comment} key={comment.id} />)}
      </div>
      <div className="nav-buttons">
        <Link to={'/add-post'}>
          {/* Ajouter l'icone correspondante */}
        </Link>
        <Link to={'/profile'}>
          {/* Ajouter l'icone correspondante */}
        </Link>
        <Link to={'/feed'}>
          {/* Ajouter l'icone correspondante */}
        </Link>
      </div>

    </div>
  );
}

export default Post;
