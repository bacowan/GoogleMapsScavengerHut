document.getElementById("new-game-button").addEventListener("click", onNewGameClick);

window.top.postMessage({ action: "resize", width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight }, "*");

window.onmessage = function(e) {
    const staminaElement = document.getElementById("stamina");
    const pointsElement = document.getElementById("points");

    staminaElement.innerHTML = e.data.stamina;
    pointsElement.innerHTML = e.data.points;
}

function onNewGameClick() {
    window.top.postMessage({ action: "new" }, "*");
}