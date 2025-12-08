import { Sequelize, DataTypes } from "sequelize";


/**
 * 
 * @param {Sequelize} sequelize 
 */
export async function createTable(sequelize) {
    try {
        
        const User = sequelize.define("User", {
            username: DataTypes.TEXT,
            email: DataTypes.TEXT,
            password: DataTypes.TEXT
        });

        const Post = sequelize.define("Post", {
            title: DataTypes.TEXT,
            content: DataTypes.TEXT
        });

        const Comment = sequelize.define("Comment", {
            content: DataTypes.TEXT,
        });

        const Role = sequelize.define("Role", {
            name: {
                type:DataTypes.STRING,
                unique : true
            }
        });



        // Association
        Role.hasMany(User, { foreignKey: "RoleId", as: "userRole" });
        User.belongsTo(Role);

        User.hasMany(Post, { foreignKey: "UserId", as: "posts" });
        Post.belongsTo(User, {foreignKey: "UserId", as: "author"});

        Post.hasMany(Comment, { foreignKey: "PostId", as: "comments" });

        Comment.belongsTo(User, {foreignKey: "UserId", as: "author"});
        Comment.belongsTo(Post);
        await sequelize.sync();

        // Création des roles
        await Role.findOrCreate({
            where: { "name": "member" }
        });
        await Role.findOrCreate({
            where: { "name": "admin" }
        });

        // Données de test
        return sequelize.models;

    } catch (error) {
        console.error("Erreur lors de la création des tables SQL : ", error);
        throw error;
    }
}   