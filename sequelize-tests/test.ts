const { Sequelize } = require('sequelize');
const { Client } = require('pg');
import { default as config } from '../config.json';

const createDatabase = async () => {
    const client = new Client({
        user: config.username,
        password: config.password,
        host: config.host,
        port: config.port,
        database: config.wrapper
    });

    client.connect();
    const create = `CREATE DATABASE "${config.dbname}"`;
    client.query(create, (err: any, res: any) => {
        console.log(err, res);
        client.end();
    })
}

const testConnection = async () => {
    try {
        console.log('Test');
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const main = async () => {
    await createDatabase();
    await testConnection();
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

main();
