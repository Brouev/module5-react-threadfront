import { sequelize } from "./database.mjs";
const { User } = sequelize.models

async function getUserNameById(id) {
   try {
        const user = await User.findOne({where: {id: id}});
        return user ? user.username : null;
   } catch (error) {
    console.error("Erreur lors de la recuperation du nom de l'utilisateur !",error);
   }
}

export default getUserNameById;