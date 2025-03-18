let amigos = [];

const inputAmigo = document.getElementById("amigo");
const listaAmigos = document.getElementById("listaAmigos");
const resultado = document.getElementById("resultado");

function agregarAmigo() {
    const nombre = inputAmigo.value.trim();
    if (nombre && !amigos.includes(nombre)) {
        amigos.push(nombre);
        actualizarLista();
        inputAmigo.value = ""; 
    } else {
        alert("El nombre es inválido o ya está en la lista.");
    }
}

function actualizarLista() {
    listaAmigos.innerHTML = ""; 
    amigos.forEach((amigo) => {
        const li = document.createElement("li");
        li.textContent = amigo;
        li.setAttribute("role", "listitem");
        li.className = "name-item";
        listaAmigos.appendChild(li);
    });
}

function sortearAmigo() {
    resultado.innerHTML = ""; 
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

    const randomIndex = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[randomIndex];
    const amigoSecreto = asignaciones[amigoSorteado];

    
    resultado.textContent = `El amigo secreto es: ${amigoSecreto}`;

    listaAmigos.innerHTML = "";
}

