window.addEventListener("load", function() {
    const targetNode = document.getElementById("pane").firstChild;
    const config = { attributes: true, childList: true };

    const observer = new MutationObserver(onPaneChanged);

    observer.observe(targetNode, config);


    // TODO: obserber.disconnect();
});

function onPaneChanged(mutationList, observer) {
    const mutation = mutationList[0];
    if (mutation != null) {
        const sectionHeader = mutation.target.querySelector("[class*=section-hero-header-title-top-container]");
        if (sectionHeader != null && sectionHeader.firstElementChild != null && sectionHeader.firstElementChild.firstElementChild != null) {
            let visitButton = document.getElementById("visit-button");
            if (visitButton == null) {
                visitButton = document.createElement("button");
                visitButton.id = "visit-button";
                visitButton.innerHTML = "Visit";
                visitButton.style.color = "white";
                visitButton.style.background = "#007009";
                visitButton.style.padding = "1em";
                visitButton.style.borderRadius = "25px";
                visitButton.style.cursor = "pointer";
                sectionHeader.firstElementChild.insertBefore(visitButton, sectionHeader.firstElementChild.firstElementChild);
            }
            console.log(sectionHeader);
        }
    }
}