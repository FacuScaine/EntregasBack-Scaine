let usuarioForm = document.getElementById('usuarioForm');
let id = document.getElementById('id');
let nombre = document.getElementById('nombre');
let apellido = document.getElementById('apellido');
let result
console.log("idex.js injected")

const socket = io();

socket.emit('saludo',3)

socket.on('lista',users=>{
    users.forEach(user => {
        id.innerText = user.id
        nombre.innerText = user.nombre
        apellido.innerText = user.apellido
    });
})

const handleSubmit = (evt,form,route) =>{
    // evt.preventDefault();
    let formData = new FormData(form);
    let obj = {};
    formData.forEach((value,key)=>obj[key]=value);
    fetch(route,{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })    
};

usuarioForm.addEventListener('submit',(e)=>{
    handleSubmit(e,e.target,'/api/usuarios');
});

