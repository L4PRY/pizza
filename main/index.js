import express from 'express';
import cors from 'cors';
import futarRouter from '../routers/futarRouter.js';
import pizzaRouter from '../routers/pizzaRouter.js';
import vevoRouter from '../routers/vevoRouter.js'
import rendelesRouter from '../routers/rendelesRouter.js';
import tetelRouter from '../routers/tetelRouter.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    var reqdata = {
        method: req.method,
        ip: req.socket.remoteAddress,
        useragent: req.headers['user-agent'],
        location: req.headers['referer'],
        body: req.body,
        time: new Date().toTimeString()
    }
    console.log(reqdata);
    
    next()
})

app.use('/api/futar',futarRouter);
app.use('/api/pizza',pizzaRouter);
app.use('/api/vevo',vevoRouter);
app.use('/api/rendeles',rendelesRouter);
app.use('/api/tetel',tetelRouter);

const PORT = 3000;
app.listen(PORT, () => {console.log(`http://localhost:${PORT}/`)});