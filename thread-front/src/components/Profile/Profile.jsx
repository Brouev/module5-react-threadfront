import { useEffect, useState } from "react";
import "./Profile.css"; // Importe les styles CSS spécifiques au composant Profile.
import { useNavigate } from "react-router-dom"; // Importe le Hook useNavigate de react-router-dom pour la navigation programmatique.



export default function Profile({ currentUser }) {
    // Définit le composant fonctionnel "Profile" qui reçoit "currentUser" en tant que prop.
    const navigate = useNavigate(); // Initialise la fonction de navigation.

    const [posts,setPosts] = useState ([]);
    const [username] = useState ("");

    useEffect(() => {
        if (!currentUser) {
            // Si aucun utilisateur n'est connecté, redirige vers la page de connexion.
            return;
            
        }
    }, [currentUser, navigate]);

    if (!currentUser) {
        return null;
    }

    const post = currentUser.latestPost;

    // 2. Si l'utilisateur est connecté mais n'a PAS de post
    if (!post) {
        return (
            <div className="ProfileContainer">
                <div className="GroupeSquare">
                    <div className='TitleSquare'>
                        <div className="RectangleProfile" style={{width: '3px', height: '40px', backgroundColor: 'white'}}></div>
                        <h2>Profil de {currentUser.username}</h2>
                    </div>
                </div>
                <div className="postContentProfile">
                    <p>Vous n'avez pas encore publié de contenu.</p>
                </div>
                <div className='addPostCommentProfile'>
                    <button className='addPost' onClick={() => navigate('/add-post')}>
                        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23 0C10.2944 0 0 10.2944 0 23C0 35.7056 10.2944 46 23 46C35.7056 46 46 35.7056 46 23C46 10.2944 35.7056 0 23 0ZM36.3548 25.5968C36.3548 26.2089 35.854 26.7097 35.2419 26.7097H26.7097V35.2419C26.7097 35.854 26.2089 36.3548 25.5968 36.3548H20.4032C19.7911 36.3548 19.2903 35.854 19.2903 35.2419V26.7097H10.7581C10.146 26.7097 9.64516 26.2089 9.64516 25.5968V20.4032C9.64516 19.7911 10.146 19.2903 10.7581 19.2903H19.2903V10.7581C19.2903 10.146 19.7911 9.64516 20.4032 9.64516H25.5968C26.2089 9.64516 26.7097 10.146 26.7097 10.7581V19.2903H35.2419C35.854 19.2903 36.3548 19.7911 36.3548 20.4032V25.5968Z" fill="#E3E3E3" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    }

    // 3. Si l'utilisateur a un post (CAS NORMAL)



        return (
            <div className="ProfileContainer">
                <div className="GroupeSquare">
                    <div className='TitleSquare'>
                        <div className="RectangleProfile" width="3" height="89" viewBox="0 0 3 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        </div>
                        <h2>{post.title}</h2>
                    </div>
                    <h2>{post.author}</h2>
                </div>
                <div className="postContentProfile">
                    <p>{post.content}</p>
                </div>
                <div className="postCommentsProfile">

                    {post.comments?.map(comment => (
                        <div key={comment.id} className="comment">
                            <strong>{comment.author}:</strong> {comment.text}
                        </div>
                    ))}
                </div>
                <div className='buttonProfileSettings'>
                    <button className='settings' placeholder="Settings" onClick={() => navigate('/settings')}>
                        Settings
                    </button>
                </div>
                <div className='addPostCommentProfile'>
                    <button
                        className='addPost' onClick={() => navigate('/add-post')}>
                        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23 0C10.2944 0 0 10.2944 0 23C0 35.7056 10.2944 46 23 46C35.7056 46 46 35.7056 46 23C46 10.2944 35.7056 0 23 0ZM36.3548 25.5968C36.3548 26.2089 35.854 26.7097 35.2419 26.7097H26.7097V35.2419C26.7097 35.854 26.2089 36.3548 25.5968 36.3548H20.4032C19.7911 36.3548 19.2903 35.854 19.2903 35.2419V26.7097H10.7581C10.146 26.7097 9.64516 26.2089 9.64516 25.5968V20.4032C9.64516 19.7911 10.146 19.2903 10.7581 19.2903H19.2903V10.7581C19.2903 10.146 19.7911 9.64516 20.4032 9.64516H25.5968C26.2089 9.64516 26.7097 10.146 26.7097 10.7581V19.2903H35.2419C35.854 19.2903 36.3548 19.7911 36.3548 20.4032V25.5968Z" fill="#E3E3E3" />
                        </svg>

                    </button>
                    <button className='addComment' placeholder="Add Comment" onClick={() => navigate('/add-comment')}>
                        <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_4_184)">
                                <path d="M35.875 0H5.125C2.29824 0 0 2.29824 0 5.125V28.1875C0 31.0143 2.29824 33.3125 5.125 33.3125H12.8125V40.0391C12.8125 40.8238 13.7094 41.2803 14.342 40.8158L24.3438 33.3125H35.875C38.7018 33.3125 41 31.0143 41 28.1875V5.125C41 2.29824 38.7018 0 35.875 0Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_4_184">
                                    <rect width="41" height="41" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                    </button>
                </div>

            </div>
        );
    }
