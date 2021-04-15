const iFrame = document.createElement("iframe");

iFrame.id = "sidebar-iframe";
iFrame.src = chrome.runtime.getURL("sidebar.html");
iFrame.style.position = "fixed";
iFrame.style.zIndex = 2147483647;
iFrame.style.right = 0;
iFrame.style.top = "25%";
iFrame.style.border = "none";

document.body.insertBefore(iFrame, document.body.firstChild);