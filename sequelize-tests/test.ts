const { Sequelize } = require('sequelize');
import { default as config } from '../config.json';

const testConnection = async () => {
    try {
        console.log('Test');
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const sequelize = new Sequelize(
    config.dbname,
    config.username,
    config.password,
    {
        host: config.host,
        port: config.port,
        dialect: config.wrapper
    }
);
testConnection();
