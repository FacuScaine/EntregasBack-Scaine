import fs from 'fs'
//CLASE CONTENEDORA
const path = 'src/public/usuarios.json';

class UsuarioManager {

    getAll = async () => {
        try {
            if (fs.existsSync(path)) {
                let fileData = await fs.promises.readFile(path, 'utf-8');
                let usuarios = JSON.parse(fileData)
                return usuarios;
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
