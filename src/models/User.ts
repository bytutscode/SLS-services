import { DataTypes, Model } from "sequelize";
import sequelize from "../database/SQL";

export interface UserInstance extends Model {
    id: number,
    username: string,
    email: string,
    password: string,
    token: string,
    phone: string,
    position: string
}

export const User = sequelize.define<UserInstance>('User', {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    phone: DataTypes.STRING,
    position: DataTypes.STRING
}, {
    tableName: 'users',
    timestamps: false
});