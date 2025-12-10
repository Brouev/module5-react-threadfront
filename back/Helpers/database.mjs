import { Sequelize } from "sequelize";
import { createTable } from "./tables.mjs";

// On attend que la fonction retourne l'instance connectée
export const sequelize = await loadSequelize();
await createTable(sequelize);

/**
 * * @returns {Promise<Sequelize>}
 */
export async function loadSequelize() {
    try {
        const sequelize = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,     
            process.env.DB_PASSWORD, 
            {
                dialect: "mysql",
                host: process.env.DB_HOST || "localhost" 
            }
        );
        
        await sequelize.authenticate();
        console.log("Connexion à la BDD réussie avec succès !");
        return sequelize;
    } catch (error) {
        console.error("Erreur Sequelize :", error);
        throw Error("Échec du chargement de Sequelize");
    }
}