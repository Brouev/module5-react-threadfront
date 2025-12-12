import express from "express";
import cors from "cors";
import authRoutes from "../Routes/authRoutes.mjs";
import postRoutes from "../Routes/postRoutes.mjs";
import cookieParser from "cookie-parser";

async function main() {
    try {

        const app = express();
        app.use(cors({
            credentials: true,
            origin: ['https://localhost:5173', 'http://localhost:5173', 'https://localhost:5174', 'http://localhost:5174']
        }));
        app.use(express.json());
        app.use(cookieParser());
        app.use(authRoutes); // Routes d'auth
        app.use(postRoutes); // Routes post, comment

        app.listen(3000, () => {
            console.log("Serveur démarré sur http://localhost:3000");
        });


    } catch (error) {
        console.error("Error de chargement de Sequelize:", error);
    }
}
main();