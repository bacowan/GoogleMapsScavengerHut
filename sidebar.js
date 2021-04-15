window.onmessage = function(e) {
    const staminaElement = document.getElementById("stamina");
    const pointsElement = document.getElementById("points");

    staminaElement.innerHTML = e.data.stamina;
    pointsElement.innerHTML = e.data.points;
}