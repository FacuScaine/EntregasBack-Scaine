import {Router} from 'express';
import UsuarioManager from '../managers/usuariosManager.js';

const usuarioService = new UsuarioManager();
let users = await usuarioService.getAll();

const router = Router();

router.get('/',(req,res)=>{

    res.render('users',{
        // users
    })
})

export default router;