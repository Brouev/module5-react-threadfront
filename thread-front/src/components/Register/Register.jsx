import { useState, useCallback } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
// Définition du composant fonctionnel 'Register'.
function Register({ setCurrentUser }) {
    // Déclare l'état 'email' et sa fonction de mise à jour 'setEmail'. 
  const [email, setEmail] = useState("");
    // Déclare l'état 'email' et sa fonction de mise à jour 'setEmail'. 
  const [password, setPassword] = useState("");
    // Déclare l'état 'confirmPassword' pour la vérification du mot de passe.
  const [confirmPassword, setConfirmPassword] = useState("");
    // Déclare l'état 'speudo' (pseudo) et sa fonction de mise à jour 'setSpeudo'.
  const [pseudo, setPseudo] = useState("");

  // Fonction exécutée lors de la soumission du formulaire.
    // Utilisation de useCallback pour une meilleure performance si le composant est re-rendu.
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

        // Logique de validation : vérifie si les deux champs de mot de passe correspondent.
      if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas !");
            return; // Arrête la fonction si la validation échoue.
      }

      try {
        const response = await fetch("http://localhost:3000/register", {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: pseudo,
            email,
            password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Inscription réussie", data);

          if (setCurrentUser) {
            setCurrentUser(data.user);
          }

          navigate("/");
        } else {
          const errData = await response.json();
          alert(
            `Échec de l'inscription : ${
              errData.message || "Veuillez vérifier les champs."
            }`
          );
        }
      } catch (err) {
        console.error("Erreur réseau :", err);
        alert("Erreur de connexion au serveur.");
      }
    },
    [email, password, confirmPassword, pseudo, setCurrentUser, navigate]
  );

  return (
    <div className="register" id="register">
      <h2 className="CreationCompte">Création de compte</h2>
      <div className="Groupe2">
                    {/* Le formulaire est lié à la fonction handleSubmit lors de sa soumission. */}
        <form onSubmit={handleSubmit}>

                        {/* Champ Pseudo : doit être lié à l'état 'speudo' via value et onChange. */}
          <input
                            type="text" // Changé de 'speudo' à 'text' pour la sémantique HTML
            placeholder="Pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />

                        {/* Champ Email : doit être lié à l'état 'email'. */}
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

                        {/* Champ Mot de passe : doit être lié à l'état 'password'. */}
          <input
            type="password"
            placeholder="mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

                        {/* Champ Confirmation Mot de passe : doit être lié à l'état 'confirmPassword'. */}
          <input
            type="password"
            placeholder="mot de passe encore"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />


                        {/* Bouton de soumission : type 'submit' déclenche le formulaire et handleSubmit. */}
                        <button type="submit">
                            Créer un compte
                        </button>
        </form>
      </div>
    </div>
  );
    
}


export default Register;