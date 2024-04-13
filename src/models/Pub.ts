import { DataTypes, Model } from "sequelize";
import sequelize from "../database/SQL";

export interface PubInstance extends Model {
    id: number,
    title: string,
    pubphoto: string,
    pubphotodelete: string
    userid: number,
    state: string,
    city: string,
    phone: string,
    username: string,
    whatsapp: string,
    status: number
}

export const Pub = sequelize.define<PubInstance>('Pub', {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    title: DataTypes.STRING,
    pubphoto: DataTypes.STRING,
    pubphotodelete: DataTypes.STRING,
    userid: DataTypes.INTEGER,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    phone: DataTypes.STRING,
    username: DataTypes.STRING,
    whatsapp: DataTypes.STRING,
    status: DataTypes.INTEGER
}, { tableName: 'pubs', timestamps: false })

