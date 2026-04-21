function mostrarMensaje() {
    let mensaje = document.getElementById("mensaje");
    let musica = document.getElementById("musica");

    mensaje.innerHTML =
    "Since you came into my life... ❤️<br><br>" +
    "Everything feels more beautiful ✨<br><br>" +
    "You make me smile without trying 😊<br><br>" +
    "And honestly...<br><br>" +
    "💖 I really, really like you 💖";

    musica.play();
    crearCorazones();
}

function crearCorazones() {
    setInterval(() => {
        let corazon = document.createElement("div");
        corazon.classList.add("corazon");
        corazon.innerText = "❤️";

        corazon.style.left = Math.random() * 100 + "vw";
        corazon.style.fontSize = (Math.random() * 25 + 10) + "px";

        document.body.appendChild(corazon);

        setTimeout(() => {
            corazon.remove();
        }, 6000);
    }, 300);
}