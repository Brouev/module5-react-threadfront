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

      const userData = {
        email, // la valeur à jour de l'email
        password, // la valeur à jour du password
        pseudo, // la valeur à jour du pseudo

      };

      // Logique de validation : vérifie si les deux champs de mot de passe correspondent.
      if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas !");
        return; // Arrête la fonction si la validation échoue.
      }

      try {
        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
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
          console.log("Inscription réussie");
          setCurrentUser(data.user);
          navigate("/");

        } else {
          console.error('Erreur lors de la creation de compte');
        }

      } catch (error) {
        console.error(error);
      }
    }


    // const response = await fetch("http://localhost:3000/register", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         username: pseudo,
    //         email: email,
    //         password: password
    //     })
    // })


    , [email, password, confirmPassword, pseudo])
    ; // Dépendances pour useCallback




  // Le 'return' principal du composant, qui définit le JSX (la structure HTML) à afficher.
  return (
    <div className="register" id="register" >

      <div className="Groupe1">

        <svg className="Rectangle-4" width="3" height="89" viewBox="0 0 3 89" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="3" height="89" fill="white" />
        </svg>

        <h2 className="CreationCompte">Creation de Compte</h2><br />
      </div>

      <div className="Groupe2">
        {/* Le formulaire est lié à la fonction handleSubmit lors de sa soumission. */}
        <form className="registerForm" onSubmit={handleSubmit}>

          {/* Champ Pseudo : doit être lié à l'état 'pseudo' via value et onChange. */}
          <input
            type="text"
            className="pseudo"
            placeholder="@Pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />

          {/* Champ Email : doit être lié à l'état 'email'. */}
          <input
            type="email"
            className="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Champ Mot de passe : doit être lié à l'état 'password'. */}
          <input
            type="password"
            className="password"
            placeholder="mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Champ Confirmation Mot de passe : doit être lié à l'état 'confirmPassword'. */}
          <input
            type="password"
            className="confirmPassword"
            placeholder="mot de passe encore"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="creerCompte">
            {/* Bouton de soumission : type 'submit' déclenche le formulaire et handleSubmit. */}
            <button type="submit" className="creerCompteButtonRegister">
              Créer un compte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default Register;