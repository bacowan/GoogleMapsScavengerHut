const startingStamina = 100;

let data;
chrome.storage.sync.get(['save'], function(result) {
    if (result == null) {
        resetData(null, null);
    }
    else { // TODO: validate result
        data = result;
        updateUi(data);
    }
});

function resetData(lat, lon) {
    updateData({
        currentLat: lat,
        currentLon: lon,
        stamina: startingStamina,
        points: 0
    });
}

function updateData(newData) {
    Object.assign(data, newData);
    chrome.storage.sync.set({'save': data}, () => {});
    updateUi(data);
}

function updateUi(val) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, val);
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "new") {
        const latLon = getLatLon(request.url);
        resetData(latLon.currentLat, latLon.currentLon);
    }
});