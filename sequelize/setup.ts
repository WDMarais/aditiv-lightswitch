const { Sequelize, DataTypes  } = require('sequelize');
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

const LIGHT_FUNCTION = `
CREATE OR REPLACE FUNCTION notify_light_toggle() RETURNS trigger
    LANGUAGE plpgsql

AS $$
    BEGIN
        PERFORM pg_notify('${config.pg_channel}'::text, NEW."isOn"::text);
        RETURN NULL;
    END;
$$;
`

const LIGHT_TRIGGER = `
CREATE OR REPLACE TRIGGER light_trigger AFTER INSERT ON "${config.table_name}"
FOR EACH ROW EXECUTE PROCEDURE notify_light_toggle();
`

const main = async () => {
    await createDatabase();
    await testConnection();
    await Light.sync({ force: true}); // Drop table if exists
    await sequelize.query(LIGHT_FUNCTION);
    await sequelize.query(LIGHT_TRIGGER);
    await Light.create({ isOn: false });
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

const Light = sequelize.define(config.table_name,
    {
        // Model attributes are defined here
        isOn: {
            type: DataTypes.BOOLEAN
            // allowNull defaults to true
        }
    },
    {
        // Other model options go here
        freezeTableName: true
    }
);

main();
