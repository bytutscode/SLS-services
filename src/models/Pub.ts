import { DataTypes, Model } from "sequelize";
import sequelize from "../database/SQL";

export interface PubInstance extends Model {
    id: number,
    title: string,
    pubPhoto: string,
    pubPhotoDelete: string
    userId: number,
    state: string,
    city: string,
    phone: string,
    username: string,
    whatsapp: string
}

export const Pub = sequelize.define<PubInstance>('Pub', {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    title: DataTypes.STRING,
    pubPhoto: DataTypes.STRING,
    pubPhotoDelete: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    phone: DataTypes.STRING,
    username: DataTypes.STRING,
    whatsapp: DataTypes.STRING
}, { tableName: 'pubs', timestamps: false })

