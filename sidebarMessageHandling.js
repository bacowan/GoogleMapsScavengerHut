// messages from background scripts
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        const iframe = document.getElementById("sidebar-iframe");
        iframe.contentWindow.postMessage(request, '*');
    }
);

// messages from iframe
window.onmessage = function(e) {
    if (e.data.action === "new") {
        chrome.runtime.sendMessage({
            action: "new",
            url: location.href
        });
    }
    else if (e.data.action === "resize") {
        const iframe = document.getElementById("sidebar-iframe");
        iframe.style.width = e.data.width + 'px';
        iframe.style.height = e.data.height + 'px';
    }
}