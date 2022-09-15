import express from 'express';
import usuariosRouter from './routes/usuarios.router.js';
import productsRouter from './routes/productos.router.js'
import viewsRouter from './routes/views.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import {Server} from 'socket.io';
import UsuarioManager from './managers/usuariosManager.js';
import mongoose from 'mongoose';
import usersService from './dataBase/useres.db.js';

const usuarioService = new UsuarioManager();
let users = await usuarioService.getAll()


const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const io = new Server(server);
mongoose.connect('mongodb+srv://FacuScaine:Scaine1234@backend-coder.bvphsqh.mongodb.net/test',err=>{
    if(err){
        console.log("Error connecting to databse");
    }
    else{
        console.log("Connected to database")
    }
});

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use('/api',usuariosRouter);
app.use('/api',productsRouter);
app.use('/',viewsRouter);

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname + '/views');
app.set('view engine','handlebars');

let history = [];
io.on('connection',socket=>{
    console.log("SocketConnected")
    socket.emit('lista',users);

    socket.on('message',data=>{
        usersService.create(data)
        history.push(data)
        io.emit('history',history)
    })

});