import express from "express";
import { verifyToken } from "../auth/jwtMiddleware.mjs";
import { isAdmin, canDeleteComment, canDeletePost } from "../auth/jwtMiddleware.mjs";
import getUserNameById from "../Helpers/user.mjs";
import { sequelize } from "../Helpers/database.mjs";
const { Post, Comment } = sequelize.models;


const router = express.Router();

router.post("/posts", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        if (userId == null) {
            return res.status(404).json({ message: "Erreur lors de la recuperation de l'userId" });
        }


        if (!req.body.title || !req.body.content) {
            return res.status(400).json({ message: "Un post doit contenir un titre et son contenu !" });
        }
        const post = await Post.create({
            "title": req.body.title,
            "content": req.body.content,
            "UserId": userId
        });
        if (post) {
            res.status(201).json({
                "message": "Post crée avec succès",
                "Post": post
            });
        } else {
            res.status(404).json({ comment: "Erreur lors de la création du post" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                {
                    association: "author",
                    attributes: ["username"]
                },
                {
                    association: "comments",
                    include: [
                        {
                            association: "author",
                            attributes: ["username"]
                        }
                    ]
                }

            ]
        });

        const formattedPosts = posts.map((post => ({
            id: post.id,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
            author: post.author?.username || "Utilsateur inconnu",
            comments: post.comments.map(comment => ({
                id: comment.id,
                content: comment.content,
                createdAt: comment.createdAt,
                author: comment.author?.username || "Utilisateur inconnu"
            }))
        })));

        if (posts.length > 0) {
            res.status(200).json({
                AllPostsAndComments: formattedPosts
            });
        } else {
            res.status(200).json({ message: "Aucun Posts dans la base de données" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

router.post("/posts/:postId/comments", verifyToken, async (req, res) => {
    try {
        if (!req.body || !req.body.content) {
            return res.status(400).json({ message: "Un commentaire doit avoir un contenu" });
        }
        const comment = await Comment.create({
            "content": req.body.content,
            "PostId": req.params.postId,
            "UserId": req.user.id
        });
        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

router.delete("/posts/:postId", verifyToken, canDeletePost, async (req, res) => {
    try {
        const deleted = await Post.destroy({ where: { id: req.params.postId } });
        if (deleted) {
            res.status(200).json({ message: "Post supprimé avec succès" });
        } else {
            res.status(404).json({ message: "Erreur lors de la suppresion du post" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

router.delete("/comments/:commentId", verifyToken, canDeleteComment, async (req, res) => {
    try {
        const deleted = await Comment.destroy({ where: { id: req.params.commentId } });
        if (deleted) {
            res.status(200).json({ message: "Commentaire supprimé avec succès" });
        } else {
            res.status(404).json({ message: "Erreur lors de la suppresion du commentaire" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

router.get("/users/:userId/posts", async (req, res) => {
    try {
        const userPosts = await Post.findAll({
            where: { UserId: req.params.userId }
        });
        const username = await getUserNameById(req.params.userId);
        if (userPosts.length > 0) {
            res.status(200).json({ posts: userPosts, username: username });
        } else {
            res.status(200).json({ message: "L'utilisateur n'a aucun post" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

export default router;

