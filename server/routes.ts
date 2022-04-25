const express = require('express');
const app = express.Router();

export { app as routes };

const messages = ['a', 'b', 'c', 'd', 'e'] as String[];
app.get('/light-message', (req: any, res: any) => {
    console.log("Toggle check requested");
    let msgIndex = Math.floor(Math.random() * messages.length);
    res.send({message: messages[msgIndex]});
});

app.get('/users', (req: any, res: any) => res.send([]));
app.post('/users', (req: any, res: any) => res.send({body: req.body}));
