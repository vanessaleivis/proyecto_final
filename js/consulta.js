document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const tableBody = document.querySelector("tbody");
    const modal = new bootstrap.Modal(document.getElementById('nuevoRegistroModal')); // Instancia del modal para abrir y cerrar
    let editIndex = null; // Indica si estamos editando un usuario

    const loadTableData = () => {
        const users = JSON.parse(localStorage.getItem("users")) || []; //obtencion de datos
        renderTable(users);
    };

    const saveUser = (user) => {
        const users = JSON.parse(localStorage.getItem("users")) || []; // recupera
        
        if (editIndex === null) {
            // Agregar un nuevo usuario
            users.push(user);
        } else {
            // Actualizar usuario existente
            users[editIndex] = user;
            editIndex = null; // Reiniciara el índice de edición
        }

        localStorage.setItem("users", JSON.stringify(users));
        renderTable(users);
        form.reset(); // Limpiar el formulario después de guardar
        modal.hide(); // Cerrar el modal después de guardar
        form.querySelector('button[type="submit"]').innerText = "Guardar"; // Restaurar el texto del botón
    };

    const renderTable = (users) => {
        tableBody.innerHTML = "";

        users.forEach((user, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.city}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.startdate}</td>
                  <td>
                    <button class="btn btn-success" onclick="consultUser(${index})">Consultar</button>
                    <button class="btn btn-warning" onclick="editUser(${index})">Editar</button>
                    <button class="btn btn-danger" onclick="deleteUser(${index})">Eliminar</button>
                 </td>
            `;
            tableBody.appendChild(row);
        });
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = {
            name: document.getElementById("name").value,
            age: document.getElementById("age").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            startdate: document.getElementById("startdate").value,
        };
        saveUser(user);
    });

    window.deleteUser = (index) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(users));
        renderTable(users);
    };

    window.consultUser = (index) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users[index];

        // Precargar los datos del usuario seleccionado en el formulario
        document.getElementById("name").value = user.name;
        document.getElementById("age").value = user.age;
        document.getElementById("city").value = user.city;
        document.getElementById("email").value = user.email;
        document.getElementById("phone").value = user.phone;
        document.getElementById("startdate").value = user.startdate;

        // Abrir el modal del formulario
        modal.show();

        // Desactivar edición (solo consulta, sin guardar)
        editIndex = null;

        // Cambiar el texto del botón de guardar a "Cerrar"
        form.querySelector('button[type="submit"]').innerText = "Cerrar";
    };

    window.editUser = (index) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users[index];

        // Precargar los datos del usuario seleccionado en el formulario
        document.getElementById("name").value = user.name;
        document.getElementById("age").value = user.age;
        document.getElementById("city").value = user.city;
        document.getElementById("email").value = user.email;
        document.getElementById("phone").value = user.phone;
        document.getElementById("startdate").value = user.startdate;

        // Abrir el modal del formulario
        modal.show();

        // Cambiar el índice de edición para guardar cambios al usuario
        editIndex = index;

        // Cambiar el texto del botón de guardar para indicar "Guardar Cambios"
        form.querySelector('button[type="submit"]').innerText = "Guardar Cambios";
    };

    loadTableData();
});

