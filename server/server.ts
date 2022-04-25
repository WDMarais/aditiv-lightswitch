const express = require('express');

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

app.get('/', (req: any, res: any) => {
    let response = { message: 'hello world' };
    res.send([response]);
})

let port = 4201;
let host = '127.0.0.1';
app.listen(port, host, () => {
    console.log('Node server is listening');
});
