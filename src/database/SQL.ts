import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
    process.env.MYSQL_DB as string,
    process.env.MYSQL_USERNAME as string,
    process.env.MYSQL_PASSWORD as string, {
    dialect: 'postgres',
    dialectModule: require('pg'),
    host: process.env.MYSQL_HOST,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true
        }
    }
});



export default sequelize;