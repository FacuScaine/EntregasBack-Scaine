const socket = io();

//LISTADO Productos

socket.on('lista', data => {
    let tabla = document.getElementById('tbody');
    tabla.innerHTML= ""
    
        fetch('http://localhost:8080/api/test')
        .then((respuesta)=>respuesta.json())
        .then((data)=>{
            data.forEach(producto =>{
                tabla.innerHTML +=`
                <tr>
                    <td>${producto.Nombre}</td>
                    <td>$${producto.Precio}</td>
                    <td>${producto.Descripcion}</td>
                </tr>
                `
            })
        })
    })

//CHAT

// swal.fire({
//     title: "Identificate",
//     input: "text",
//     text: "Ingresa nombre de Usuario",
//     inputValidator: (value) => {
//         return !value && "Necesitas identificarte para continuar"
//     },
//     allowOutsideClick: false,
//     allowEscapeKey: false
// }).then(result => {
//     userName = result.value
// })

let usuarioForm = document.getElementById('usuarioForm');

let obj = {}
usuarioForm.addEventListener("submit" , (evt) =>{
    evt.preventDefault();
    let data = new FormData(usuarioForm);
    data.forEach((value, key) => obj[key] = value);
})


let chat = document.getElementById('chatbox');

chat.addEventListener('keyup', evt => {
    if (evt.key === "Enter") {
        console.log(obj)
        if (chat.value.trim().length > 0) {
            socket.emit('message', {
                author: obj,
                mensaje: chat.value
            })
            chat.value = "";
        }
    }
})

socket.on('history', data => {
    let history = document.getElementById('history');
    let messages = "";
    let time  = new Date().toLocaleString();
    data.forEach(message => {
        messages = messages + `
        ${message.author.userName} ,
        [${time}],
        dice: ${message.mensaje}
        <img src=${message.avatar} alt="facu">
        </br>
        `
    })
    history.innerHTML = messages
})
