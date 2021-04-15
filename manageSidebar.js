chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        const iframe = document.getElementById("sidebar-iframe");
        iframe.contentWindow.postMessage(request, '*');
    }
);