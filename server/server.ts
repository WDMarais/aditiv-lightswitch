import * as express from 'express';

const app = express();
let port = 4201;
let host = '127.0.0.1';
app.listen(port, host, () => {
    console.log('Node server is listening');
});
