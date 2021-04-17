const startingStamina = 100;

function resetData(lat, lon, tabId=null) {
    updateData({
        currentLat: lat,
        currentLon: lon,
        stamina: startingStamina,
        points: 0
    }, tabId);
}

function updateData(newData, tabId=null) {
    console.log(newData);
    chrome.storage.sync.get(['save'], function(data) {
        Object.assign(data.save, newData);
        chrome.storage.sync.set({'save': data.save}, () => {});
        updateUi(data.save, tabId);
    });
}

function updateUi(val, id=null) {
    if (id != null) {
        chrome.tabs.sendMessage(id, val);
    }
    else {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, val);
        });
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "new") {
        const latLon = getLatLon(request.url);
        chrome.storage.sync.set({'previousTabId': sender.tab.id}, () => {}); // TODO: this isn't really thread safe
        resetData(latLon.currentLat, latLon.currentLon, sender.tab.id);
    }
});