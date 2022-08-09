import express from 'express';
import usuariosRouter from './routes/usuarios.router.js';
import viewsRouter from './routes/views.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import {Server} from 'socket.io';
import UsuarioManager from './managers/usuariosManager.js';

const usuarioService = new UsuarioManager();
let users = await usuarioService.getAll()


const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const io = new Server(server);

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use('/api',usuariosRouter);
app.use('/',viewsRouter);

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname + '/views');
app.set('view engine','handlebars');

let history = [];
io.on('connection',socket=>{
    console.log("SocketConnected")
    // socket.broadcast.emit('newUser')
    socket.emit('lista',users);

    socket.on('message',data=>{
        history.push(data)
        io.emit('history',history)
    })

});