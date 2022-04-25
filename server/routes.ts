const express = require('express');
const app = express.Router();

export { app as routes };

app.get('/', (req: any, res: any) => res.send([{message: 'Hello World'}]));
app.get('/users', (req: any, res: any) => res.send([]));
app.post('/users', (req: any, res: any) => res.send({body: req.body}));
