import { Sequelize } from "sequelize";

import { createTable } from "./tables.mjs";
export const sequelize = await loadSequelize();
await createTable(sequelize);

/**
 * 
 * @returns {Promise<Sequelize>}
 */
export async function loadSequelize() {
    try {
        const sequelize = new Sequelize('thread-api', 'root', 'root', {
            dialect: "mysql",
            host: "127.0.0.1"
        });
        await sequelize.authenticate();
        console.log("Connexion à la BDD réussi avec succès !");
        return sequelize;
    } catch (error) {
        console.error(error);
        throw Error("Échec du chargement de Sequelize");
    }

}