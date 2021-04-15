const startingStamina = 100;

let data;
chrome.storage.sync.get(['save'], function(result) {
    if (result == null) {
        resetData(null, null);
    }
    else { // TODO: validate result
        data = result;
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
}