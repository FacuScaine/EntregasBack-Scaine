//CLASE CONTENEDORA
import db from "../dataBase/useres.db.js";

class UsuarioManager {

    getAll = async () => {
        try {
            if (db) {
                let users = await db('users').select('*');
                return users;
            }else{
                return [];
            }} catch (error) {console.log("error" +error)};
    }

    save = async (usuario) => {
        try{
            let usuarios = await this.getAll();
            if(usuarios.length === 0){
                usuario.id=1;
                usuarios.push(usuario);
                await fs.promises.writeFile(path,JSON.stringify(usuarios,null,'\t'));
                return usuarios[usuario.id] + usuario.id
            }else{
                usuario.id = usuarios[usuarios.length-1].id+1;
                usuarios.push(usuario);
                await fs.promises.writeFile(path,JSON.stringify(usuarios,null,'\t'));
            }
            return [usuario]
        }catch(error){
            console.log("Cannot write file: "+error)
        }
        
    }

    replace = async (usuario,id) => {
        let usuarios = await this.getAll();
        if (id-1 < usuarios.length){
            usuarios.splice(id-1,1,usuario)
            await fs.promises.writeFile(path,JSON.stringify(usuarios,null,'\t'));
        }else{
            return 1
        }
    }
    
    getById = async (id) =>{
        try {
            let usuarios = await this.getAll();
            if (id-1 <= usuarios.length){
                return usuarios[[id-1]]
            }else{
                return 1
            }
            
        } catch (error) {
            console.log(`El usuario ID=> ${id} no existe`)  
        }
    }

    deletById = async (id) =>{
        try {
            let usuarios = await this.getAll();
            if (id-1 <= usuarios.length){
                usuarios.splice(id-1,1)
                await fs.promises.writeFile(path,JSON.stringify(usuarios,null,'\t'));
            }else{
                return 1
            }
            
        } catch (error) {
            console.log("getById =>" +error)
        }
    }

    deletAll = async () =>{
        try {
            await fs.promises.writeFile(path,"[]");
        } catch (error) {
            console.log(error)
        }
    }
}


export default UsuarioManager;
