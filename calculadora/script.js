function sonido() {
    let audio = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");
    audio.play();
}

function agregar(valor) {
    sonido();
    let p = document.getElementById("pantalla");

    let ultimo = p.value.slice(-1);

    if ("+-*/".includes(valor) && "+-*/".includes(ultimo)) {
        return;
    }

    p.value += valor;
}

function limpiar() {
    sonido();
    document.getElementById("pantalla").value = "";
}

function borrar() {
    sonido();
    let p = document.getElementById("pantalla");
    p.value = p.value.slice(0, -1);
}

function calcular() {
    sonido();
    let p = document.getElementById("pantalla");
    try {
        let resultado = eval(p.value);
        guardarHistorial(p.value + " = " + resultado);
        p.value = resultado;
    } catch {
        p.value = "Error";
    }
}

function guardarHistorial(texto) {
    let lista = document.getElementById("lista");
    let item = document.createElement("li");
    item.textContent = texto;
    lista.appendChild(item);
}

function cambiarModo() {
    document.body.classList.toggle("oscuro");
    document.body.classList.toggle("claro");
}

document.addEventListener("keydown", function(e) {
    let tecla = e.key;

    if (!isNaN(tecla) || "+-*/.".includes(tecla)) {
        agregar(tecla);
    } else if (tecla === "Enter") {
        calcular();
    } else if (tecla === "Backspace") {
        borrar();
    }
});