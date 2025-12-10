// Importe le hook 'useState' de React pour gérer l'état local du composant.
import { useState } from "react";

// Définition du composant fonctionnel 'Register'.
export function Register() {

    // Déclare l'état 'email' et sa fonction de mise à jour 'setEmail'. 
    const [email, setEmail] = useState('');
    // Déclare l'état 'password' et sa fonction de mise à jour 'setPassword'.
    const [password, setPassword] = useState('');
    // Déclare l'état 'confirmPassword' pour la vérification du mot de passe.
    const [confirmPassword, setConfirmPassword] = useState('');
    // Déclare l'état 'speudo' (pseudo) et sa fonction de mise à jour 'setSpeudo'.
    const [pseudo, setPseudo] = useState('');

    // Fonction exécutée lors de la soumission du formulaire.
    // Utilisation de useCallback pour une meilleure performance si le composant est re-rendu.
    const handleSubmit = useCallback((event) => {
        // Empêche le rechargement de la page par défaut du formulaire.
        event.preventDefault();

        // Logique de validation : vérifie si les deux champs de mot de passe correspondent.
        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return; // Arrête la fonction si la validation échoue.
        }

        const userData = {
            email, // la valeur à jour de l'email
            password, // la valeur à jour du password
            pseudo, // la valeur à jour du pseudo

        };

// TODO:fetch

    }, [email, password, confirmPassword, pseudo]); // Dépendances pour useCallback




        // Le 'return' principal du composant, qui définit le JSX (la structure HTML) à afficher.
        return (
            <div className="register" id="register" >
                <h2 className="CreationCompte">Création de compte</h2><br />

                <div className="Groupe2">
                    {/* Le formulaire est lié à la fonction handleSubmit lors de sa soumission. */}
                    <form onSubmit={handleSubmit}>

                        {/* Champ Pseudo : doit être lié à l'état 'speudo' via value et onChange. */}
                        <input
                            type="text" // Changé de 'speudo' à 'text' pour la sémantique HTML
                            placeholder="Pseudo"
                            value={pseudo}
                            onChange={(e) => setSpeudo(e.target.value)}
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


