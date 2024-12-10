function Usuario(){
    let usuario = document.getElementById("usuario").value
    let password = document.getElementById("password").value

    const data = JSON.parse(localStorage.getItem('user'))
    if(data.usuario === usuario && data.password === password){
        alert("Bienvenido")
        window.location.replace('home.html')
    }else{
        alert("Usuario o contraseña invalidos...")
    }
}