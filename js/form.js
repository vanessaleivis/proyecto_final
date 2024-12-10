function registrarUsuario() {
    const user ={
        nombre:document.getElementById("nombre").value,
        usuario:document.getElementById("usuario").value,
        password:document.getElementById("password").value,
    }

    localStorage.setItem('user', JSON.stringify(user))
    console.log(user)
    alert("usuario registrado...")
    window.location.href = 'inicioSesion.html'
    
}