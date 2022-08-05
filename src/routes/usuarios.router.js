import { Router } from 'express';
import UsuarioManager from '../managers/usuariosManager.js';


const usuarioService = new UsuarioManager();
const router = Router();

router.get('/usuarios', (req, res) => {
    const enviroment = async () => {
        res.send(
            await usuarioService.getAll()
        )
    }
    enviroment()

});

router.get('/usuarios/:ID', (req, res) => {
    const enviroment = async () => {
        let id = req.params.ID
        let user = await usuarioService.getById(id)
        if (user === 1) res.status(400).send({error:"El usuario con ese Id no existe"})
        res.send(user)
    }
    enviroment()

});

router.post('/usuarios', (req, res) => {
    const enviroment = async () => {
        let user = req.body
        res.send(
            await usuarioService.save(user)
        )
    }
    enviroment()

});

router.put('/usuarios/:ID', (req, res) => {
    const enviroment = async () => {
        let id = req.params.ID
        let newUser = req.body
        let user = await usuarioService.replace(newUser,id)
        if (user === 1) res.status(400).send({error:"El usuario con ese Id no existe"})
    }
    enviroment()

});

router.delete('/usuarios/:ID', (req, res) => {
    const enviroment = async () => {
        let id = req.params.ID
        let user = await usuarioService.deletById(id)
        if (user === 1) res.status(400).send({error:"El usuario con ese Id no existe"})
        res.send(user)
    }
    enviroment()

});


export default router;