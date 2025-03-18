// Array para almacenar los nombres
let amigos = [];

// Referencias a los elementos del DOM
const inputAmigo = document.getElementById("amigo");
const listaAmigos = document.getElementById("listaAmigos");
const resultado = document.getElementById("resultado");

// Función para agregar un amigo
function agregarAmigo() {
    const nombre = inputAmigo.value.trim();
    if (nombre && !amigos.includes(nombre)) {
        amigos.push(nombre);
        actualizarLista();
        inputAmigo.value = ""; // Limpiar el campo de entrada
    } else {
        alert("El nombre es inválido o ya está en la lista.");
    }
}

// Función para actualizar la lista visual de amigos
function actualizarLista() {
    listaAmigos.innerHTML = ""; // Limpiar lista previa
    amigos.forEach((amigo) => {
        const li = document.createElement("li");
        li.textContent = amigo;
        li.setAttribute("role", "listitem");
        li.className = "name-item";
        listaAmigos.appendChild(li);
    });
}

// Función para sortear amigos secretos
function sortearAmigo() {
    resultado.innerHTML = ""; // Limpiar resultados previos
    if (amigos.length < 2) {
        alert("Se necesitan al menos 2 amigos para realizar el sorteo.");
        return;
    }

    // Crear una copia de la lista de amigos y resultados
    const participantes = [...amigos];
    const asignaciones = {};

    amigos.forEach((amigo) => {
        let opciones = participantes.filter((participante) => participante !== amigo);
        if (opciones.length === 0) {
            alert("No se pudo completar el sorteo. Inténtalo de nuevo.");
            return;
        }
        const indexAleatorio = Math.floor(Math.random() * opciones.length);
        const amigoSecreto = opciones[indexAleatorio];
        asignaciones[amigo] = amigoSecreto;
        participantes.splice(participantes.indexOf(amigoSecreto), 1);
    });

    // Seleccionar un amigo secreto al azar para mostrar
    const randomIndex = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[randomIndex];
    const amigoSecreto = asignaciones[amigoSorteado];

    // Mostrar el resultado del sorteo en el DOM
    resultado.textContent = `El amigo secreto es: ${amigoSecreto}`;

    // Limpiar la lista de amigos una vez realizado el sorteo
    listaAmigos.innerHTML = "";
}

