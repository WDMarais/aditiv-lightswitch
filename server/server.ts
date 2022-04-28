const express = require('express');
import { routes } from './routes';
import { default as config } from '../config.json';

const app = express();

app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
})

app.use(express.json());
app.use('/', routes);

let port = config.socket_port;
let host = config.socket_host;

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
    cors: {origin : '*'}
});

const { Client } = require('pg');
const pg_client = new Client({
    user: config.username,
    password: config.password,
    host: config.host,
    port: config.port,
    database: config.wrapper
});
pg_client.connect();
pg_client.query(`LISTEN ${config.pg_channel}`); // No variable necessary just yet

io.on('connection', (socket: any) => {
    console.log('a user connected');

    socket.on('message', (message: any) => {
        console.log(message);
        io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
    });

    socket.on('light-toggle', (message: any) => {
        io.emit('light-toggle', message);
    });

    socket.on('disconnect', () => {
      console.log('a user disconnected!');
    });

    socket.on('ready for data', (data: any) => {
        pg_client.on('notification', (title: any) => {
            console.log("RECEIVED TOGGLES");
            socket.emit('update', { message: title });
        });
    });
});

httpServer.listen(port, host, () => {
    console.log('Node server is listening');
});
