import jwt from "jsonwebtoken"
import { Sequelize } from "sequelize";
import { JWT_SECRET } from "../key.mjs";

const secretKey = JWT_SECRET;

/**
 * 
 * @param {Sequelize.Model} User 
 * @param {string} secretKey 
 * @returns 
 */
export function generateToken(User) {
    const payload = {
        id: User.id,
        username: User.username,
        role: User.RoleId
    };
    const options = {
        expiresIn: "1h"
    };
    return jwt.sign(payload, secretKey, options);
}

