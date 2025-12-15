import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../services/httpClient.js";
import "./Settings.css";
import Profile from "../Profile/Profile.jsx";
export default function Settings({ currentUser }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    try {
      setLoading(true);
      setError("");
      
      // Envoyer requête logout à l'API
      await request("/logout", { 
        method: "POST",
        auth: true  // Envoyer le JWT
      });
      
      console.log("Déconnexion réussie");
      
      // Rediriger vers login
      navigate("/login");
    } catch (err) {
      setError("Erreur lors de la déconnexion. Veuillez réessayer.");
      console.error("Erreur logout:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="settings-page">
      <h1 className="settings-title"> Paramètres</h1>

      {error && <p className="settings-error">{error}</p>}

      {/* Section Informations Compte */}
      {/* <section className="settings-section">
        <h2>Informations du Compte</h2>
        <div className="settings-info">
          <p>
            <strong>Nom d'utilisateur :</strong> {currentUser?.username || "N/A"}
          </p>
          <p>
            <strong>Email :</strong> {currentUser?.email || "N/A"}
          </p>
          <p>
            <strong>ID utilisateur :</strong> {currentUser?.id || "N/A"}
          </p>
        </div>
      </section> */}

      {/* Section Sécurité */}
      <section className="settings-section">
        <h2>Sécurité</h2>
        <button className="settings-btn settings-btn--secondary" disabled>
          Changer le mot de passe
        </button>
        <p className="settings-hint">(Fonction à venir)</p>
      </section>

      {/* Section Confidentialité */}
      <section className="settings-section">
        <h2>Confidentialité</h2>
        <button className="settings-btn settings-btn--secondary" disabled>
          Gérer la confidentialité
        </button>
        <p className="settings-hint">(Fonction à venir)</p>
      </section>

      {/* Section Déconnexion (DANGER ZONE) */}
      <section className="settings-section settings-danger">
        
        <p className="settings-warning">
          ⚠️ Cliquer sur le bouton ci-dessous vous déconnectera de votre compte.
        </p>
        <button 
          className="settings-btn settings-btn--danger"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? "Déconnexion en cours..." : "Se Déconnecter"}
        </button>
      </section>
    </div>
  );
}
