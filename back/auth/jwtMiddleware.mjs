import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../key.mjs";
import { sequelize } from "../Helpers/database.mjs"
const { Role, Comment, Post } = sequelize.models;


export function verifyToken(req, res, next) {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Accès non autorisé" });
        }
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload; // Je stocke le payload dans la requete (id = req.user.id)
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Accès non autorisé" });
    }
}

export async function isAdmin(req, res, next) {
    const roleId = req.user.role
    if (!roleId) {
        res.status(404).json({ message: "Erreur lors de la récupération du role ID." });
    }
    const role = await Role.findOne({ where: { id: roleId } });
    if (!role) {
        return res.status(404).json({ message: "Role introuvable." });
    }
    if (role.name == "admin") {
        next();
    } else {
        res.status(401).json({ message: "Accès non autorisé" });
    }
}

export async function canDeletePost(req, res, next) {
    const post = await Post.findByPk(req.params.postId);
    if (!post) {
        return res.status(404).json({ message: "Post introuvable." });
    }
    if (req.user.role === "admin" || post.UserId === req.user.id) {
        next();
    } else {
        return res.status(403).json({ message: "Suppression non autorisée." });
    }
}

export async function canDeleteComment(req, res, next) {
    const comment = await Comment.findByPk(req.params.commentId);
    if (!comment) {
        return res.status(404).json({ message: "Commentaire introuvable." });
    }
    if (req.user.role === "admin" || comment.UserId === req.user.id) {
        next();
    } else {
        return res.status(403).json({ message: "Suppression non autorisée." });
    }
}