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

**Réponse succès (201)** :
```json
{
  "user": {
    "id": 1,
    "username": "alice",
    "email": "alice@email.com",
    "RoleId": 2,
    "createdAt": "2025-12-10T10:00:00.000Z",
    "updatedAt": "2025-12-10T10:00:00.000Z"
  }
}
```
*Note: Un cookie `jwt` est défini.*

**Réponse erreur (400)** :
```json
{ "message": "Les champs : Username, E-mail et Password sont requis !" }
```
ou
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

**Réponse succès (200)** :
```json
{
  "message": "Connexion réussie",
  "user": {
    "id": 1,
    "username": "alice",
    "email": "alice@email.com",
    "RoleId": 2,
    "createdAt": "2025-12-10T10:00:00.000Z",
    "updatedAt": "2025-12-10T10:00:00.000Z"
  }
}
```
*Note: Un cookie `jwt` est défini.*

**Réponse erreur (400)** :
```json
{ "message": "Les champs : E-mail et Password sont requis pour la connexion !" }
```

**Réponse erreur (401)** :
```json
{ "message": "Identifiants incorrect" }
```

---

### POST `/logout`
**Description** : Déconnecte l'utilisateur (supprime le cookie).

**Réponse succès (200)** :
```json
{ "message": "Déconnexion réussie." }
```

---

## Posts

### GET `/posts`
**Description** : Récupère tous les posts avec leurs commentaires et les informations des auteurs.

**Réponse succès (200)** :
```json
{
  "AllPostsAndComments": [
    {
      "id": 1,
      "title": "Mon premier post",
      "content": "Ceci est le contenu du post",
      "createdAt": "2025-12-10T10:00:00.000Z",
      "author": "alice",
      "comments": [
        {
          "id": 1,
          "content": "Super post !",
          "createdAt": "2025-12-10T10:05:00.000Z",
          "author": "bob"
        }
      ]
    }
  ]
}
```
*Si aucun post n'existe :*
```json
{ "message": "Aucun Posts dans la base de données" }
```

---

### POST `/posts`
**Description** : Crée un nouveau post.
**Auth** : Requis (Token JWT).

**Body exemple** :
```json
{
  "title": "Mon nouveau post",
  "content": "Contenu intéressant"
}
```

**Réponse succès (201)** :
```json
{
  "message": "Post crée avec succès",
  "Post": {
    "id": 2,
    "title": "Mon nouveau post",
    "content": "Contenu intéressant",
    "UserId": 1,
    "updatedAt": "2025-12-10T10:10:00.000Z",
    "createdAt": "2025-12-10T10:10:00.000Z"
  }
}
```

**Réponse erreur (400)** :
```json
{ "message": "Un post doit contenir un titre et son contenu !" }
```

---

### DELETE `/posts/:postId`
**Description** : Supprime un post.
**Auth** : Requis (Token JWT + Propriétaire ou Admin).

**Réponse succès (200)** :
```json
{ "message": "Post supprimé avec succès" }
```

**Réponse erreur (404)** :
```json
{ "message": "Erreur lors de la suppresion du post" }
```

---

### GET `/users/:userId/posts`
**Description** : Récupère les posts d'un utilisateur spécifique.

**Réponse succès (200)** :
```json
{
  "posts": [
    {
      "id": 1,
      "title": "Mon post",
      "content": "...",
      "UserId": 1,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "username": "alice"
}
```
*Si l'utilisateur n'a aucun post :*
```json
{ "message": "L'utilisateur n'a aucun post" }
```

---

## Commentaires

### POST `/posts/:postId/comments`
**Description** : Ajoute un commentaire à un post.
**Auth** : Requis (Token JWT).

**Body exemple** :
```json
{
  "content": "Mon commentaire"
}
```

**Réponse succès (201)** :
```json
{
  "id": 1,
  "content": "Mon commentaire",
  "PostId": "1",
  "UserId": 1,
  "updatedAt": "2025-12-10T10:15:00.000Z",
  "createdAt": "2025-12-10T10:15:00.000Z"
}
```

**Réponse erreur (400)** :
```json
{ "message": "Un commentaire doit avoir un contenu" }
```

---

### DELETE `/comments/:commentId`
**Description** : Supprime un commentaire.
**Auth** : Requis (Token JWT + Propriétaire ou Admin).

**Réponse succès (200)** :
```json
{ "message": "Commentaire supprimé avec succès" }
```

**Réponse erreur (404)** :
```json
{ "message": "Erreur lors de la suppresion du commentaire" }
```
