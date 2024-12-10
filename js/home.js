const nameUser = document.getElementById("bienvenido")

const data = JSON.parse(localStorage.getItem('user'))
let nombre = document.getElementById('nameUser')
nameUser.innerHTML = "Bienvenid@" + `${data.nombre}`

function logOut(){
    const exit = confirm("Esta seguro de querer salir ? ")
    if(exit){
        window.location.replace('inicioSesion.html')

    }
}