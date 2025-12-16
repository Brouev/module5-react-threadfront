import "./StatusCard.css";
import { useEffect } from "react";

// Cette card sera affiche dans un component parent selon l'etat du state status.
function StatusCard({ type, title, message, onClose }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            if (onClose) {
                // Fonction qui modifiera le state a null pour cacher la card
                onClose();
            }
        }, 5000);

        // Nettoie le timer si l'utilisateur quitte la page avant la fin du timer
        return () => clearTimeout(timer);

    }, onClose);

    return (
        <div className={`status-card ${type}`} role="alert">
            <div className="status-card-content">
                {title && <h3 className="status-card-title">{title}</h3>}
                <div className="status-card-message">
                    {message}
                </div>
            </div>
        </div>
    );
}

export default StatusCard;