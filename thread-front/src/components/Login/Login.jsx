import { useState, useCallback } from "react"
// Importe les Hooks essentiels de React :
// - useState : pour gérer l'état local du composant (champs de formulaire, statut de chargement).
// - useCallback : pour mémoriser (mettre en cache) la fonction handleSubmit et éviter sa recréation inutile lors des rendus.
import "./Login.css"
import { useNavigate } from "react-router-dom";

export default function Login({ setCurrentUser }) {
  // Définit le composant fonctionnel "Login". 
    // 'export default' le rend disponible pour être importé ailleurs.

    // Initialise la fonction de navigation 
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Déclare deux variables d'état pour stocker les valeurs des champs d'entrée.
    // L'état initial est une chaîne vide ('').

  const [loading, setLoading] = useState(false);
    // Déclare l'état de chargement, utilisé pour désactiver le bouton pendant l'appel API.

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleSubmit = useCallback(
    async (event) => {
      // La fonction qui s'exécute lorsque l'utilisateur soumet le formulaire.
        // `useCallback` garantit que cette fonction n'est pas recréée à moins que `email` ou `password` ne changent.
      event.preventDefault();// Empêche le comportement par défaut de la soumission de formulaire (rechargement de page).


      if (!email || !password) {
        alert("Veuillez remplir tous les champs.");
        return;// Sort de la fonction si un champ est vide.
      }

      setLoading(true);

      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (response.ok) {
                // Vérifie si le statut de la réponse est 200-299 (succès HTTP).
          const data = await response.json();
          console.log("Connexion réussie", data);

          if (setCurrentUser) {
            setCurrentUser(data.user);
          }

          navigate("/");// redirection connection reussie 
        } else {
                // Gestion des statuts d'erreur HTTP (ex: 400, 401, 403).
          const errorData = await response.json();
          alert(
            `Échec de la connexion : ${
              errorData.message || "Vérifiez vos identifiants."
            }`
          );
        }
      } catch (error) {
            // Gestion des erreurs réseau (ex: serveur injoignable, problèmes de connexion).
        console.error("Erreur réseau :", error);
        alert("Erreur de connexion au serveur.");
      } finally {
        setLoading(false);
            // Ce bloc s'exécute TOUJOURS, après `try` ou `catch`.
            // C'est l'endroit idéal pour désactiver le chargement.
      }
    },
    [email, password, setCurrentUser, navigate]
  );

  return (
        // Le JSX (HTML-like syntaxe) que le composant rend.

    <div className="Connexion">
      <h2>Connexion</h2>

      <form onSubmit={handleSubmit}>
                {/* Le formulaire qui déclenche `handleSubmit` lors de sa soumission. */}

                <input type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
                // Met à jour l'état `email` à chaque frappe (contrôle du champ).
        />

                <input type="password"
          placeholder="*******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
                // Met à jour l'état `password` à chaque frappe.
        />

        <button
          type="submit"
          className="Se_connecter"
          disabled={loading}
        >
                    {loading ? 'Connexion en cours...' : 'Se connecter'}
                    {/* Suggestion: Afficher l'état de chargement dans le bouton. */}
        </button>
      </form>

      <div>

                <button className="creerCompte"onClick={handleRegisterClick}>
          Se créer un compte
        </button>

      </div>

    </div>
  );
}
