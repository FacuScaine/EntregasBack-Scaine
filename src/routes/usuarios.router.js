import { Router } from 'express';
import db from '../dataBase/useres.db.js';

const router = Router();

router.get('/usuarios', async (req, res) => {
    try {
        let users = await db('users').select('*');
        res.send(users);
    } catch (error) {
        res.status(500).send("Cannot get users");
    }
});

router.get('/usuarios/:ID', async (req, res) => {
    try {
        let id = req.params.ID
        let user = await db('users').select('*').where('id', '=', id)
        res.send(user)
    } catch (error) {
        res.status(404).send("Cannot find id");
    }
});

router.post('/usuarios', async (req, res) => {
    try {
        let user = req.body
        await db('users').insert(user)
    } catch (error) {
        res.status(500).send("Cannot post user");
    }
});

router.put('/usuarios/:ID', async(req, res) => {
    try {
        let id = req.params.ID
        let newUser = req.body
        await db('users').where('id','=',id).update({nombre: newUser.nombre , apellido: newUser.apellido})
        res.send(`Usuario ${id} updated`)
    } catch (error) {
        res.status(500).send("Cannot update user")
    }
});

router.delete('/usuarios/:ID', async (req, res) => {
    try {
        let id = req.params.ID
        let deleted = await db('users').where('id', '=', id).del()
        res.send(deleted)
    } catch (error) {
        res.status(500).send("Cannot delete user")
    }
});


export default router;