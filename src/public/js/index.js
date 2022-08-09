const socket = io();

//LISTADO USERS

let usuarioForm = document.getElementById('usuarioForm');
const handleSubmit = (evt, form, route) => {
    evt.preventDefault();
    let formData = new FormData(form);
    let obj = {};
    formData.forEach((value, key) => obj[key] = value);
    fetch(route, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    })
};

usuarioForm.addEventListener('submit', (e) => { handleSubmit(e, e.target, '/api/usuarios'); });

socket.on('lista', data => {

    let tabla = document.getElementById('tbody');
    
        fetch('../usuarios.json')
        .then((respuesta)=>respuesta.json())
        .then((data)=>{
            let usuarios = data;
            console.log(usuarios)
            usuarios.forEach(usuario =>{
                tabla.innerHTML =`
                <tr>
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellido}</td>
                </tr>
                `
            })
    
        })
    })

//CHAT
let userName;
swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresa nombre de Usuario",
    inputValidator: (value) => {
        return !value && "Necesitas identificarte para continuar"
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    userName = result.value
})

let chat = document.getElementById('chatbox');

chat.addEventListener('keyup', evt => {
    if (evt.key === "Enter") {
        if (chat.value.trim().length > 0) {
            socket.emit('message', { user: userName, message: chat.value })
            chat.value = "";
        }
    }
})

socket.on('history', data => {
    let history = document.getElementById('history');
    let messages = "";
    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message}</br>`
    })
    history.innerHTML = messages
})


// users.forEach(user => {
//     const table = document.createElement("tr");
//     aja = table.innerHTML = `
//     <td>${user.id}</td>
//     <td>${user.nombre}</td>
//     <td>${user.apellido}</td>
//     `
//     tabla.appendChild(table)
// });