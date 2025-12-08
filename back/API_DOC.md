# Documentation détaillée API ThreadAPI

## Authentification

### POST `/register`
**Description** : Crée un nouvel utilisateur.

**Body exemple** :
```json
{
  "username": "alice",
  "email": "alice@email.com",
  "password": "motdepasse"
}
```

**Réponse succès** :
```json
{
  "user": {
    "id": 1,
    "username": "alice",
    "email": "alice@email.com",
    "RoleId": 2
  }
}
```
**Réponse erreur** :
```json
{ "message": "Cet E-Mail existe deja" }
```

---

### POST `/login`
**Description** : Authentifie un utilisateur.

**Body exemple** :
```json
{
  "email": "alice@email.com",
  "password": "motdepasse"
}
```

**Réponse succès** :
```json
{
  "message": "Connexion réussie",
  "user": {
    "id": 1,
    "username": "alice",
    "email": "alice@email.com",
    "RoleId": 2
  }
}
```
**Réponse erreur** :
```json
{ "message": "Identifiants incorrect" }
```

---

### POST `/logout`
**Description** : Déconnecte l’utilisateur.

**Réponse succès** :
```json
{ "message": "Déconnexion réussie." }
```

---

## Posts

### POST `/posts`
**Description** : Crée un post (authentifié).

**Body exemple** :
```json
{
  "title": "Mon premier post",
  "content": "Voici le contenu du post."
}
```

**Réponse succès** :
```json
{
  "message": "Post crée avec succès",
  "Post": {
    "id": 1,
    "title": "Mon premier post",
    "content": "Voici le contenu du post.",
    "UserId": 1
  }
}
```
**Réponse erreur** :
```json
{ "message": "Un post doit contenir un titre et son contenu !" }
```

---

### GET `/posts`
**Description** : Liste tous les posts avec leurs commentaires et auteurs.

**Réponse succès** :
```json
{
  "AllPostsAndComments": [
    {
      "id": 1,
      "title": "Mon premier post",
      "content": "Voici le contenu du post.",
      "author": { "username": "alice" },
      "comments": [
        {
          "id": 1,
          "content": "Super post !",
          "author": { "username": "bob" }
        },
        {
          "id": 2,
          "content": "Merci pour le partage.",
          "author": { "username": "charlie" }
        }
      ]
    }
  ]
}
```
**Réponse erreur** :
```json
{ "message": "Erreur lors de la récupération de tout les posts et leurs commentaires" }
```

---

### DELETE `/posts/:postId`
**Description** : Supprime un post (admin ou propriétaire).

**Réponse succès** :
```json
{ "message": "Post supprimé avec succès" }
```
**Réponse erreur** :
```json
{ "message": "Suppression non autorisée." }
```

---

## Commentaires

### POST `/posts/:postId/comments`
**Description** : Ajoute un commentaire à un post (authentifié).

**Body exemple** :
```json
{
  "content": "Super post !"
}
```

**Réponse succès** :
```json
{
  "id": 1,
  "content": "Super post !",
  "PostId": 1,
  "UserId": 2
}
```
**Réponse erreur** :
```json
{ "message": "Un commentaire doit avoir un contenu" }
```

---

### DELETE `/comments/:commentId`
**Description** : Supprime un commentaire (admin ou propriétaire).

**Réponse succès** :
```json
{ "message": "Commentaire supprimé avec succès" }
```
**Réponse erreur** :
```json
{ "message": "Suppression non autorisée." }
```

---

## Utilisateurs

### GET `/users/:userId/posts`
**Description** : Liste les posts d’un utilisateur.

**Réponse succès** :
```json
{
  "posts": [
    {
      "id": 1,
      "title": "Mon premier post",
      "content": "Voici le contenu du post.",
      "UserId": 1
    }
  ],
  "username": "alice"
}
```
**Réponse erreur** :
```json
{ "message": "Erreur lors de la récupération des posts de l'utilisateur" }
```

---

## Sécurité et rôles

- Authentification par JWT (stocké dans un cookie).
- Middleware pour vérifier le token et le rôle (admin/propriétaire).
- Les routes de création/suppression de posts et commentaires nécessitent d’être connecté.

---
