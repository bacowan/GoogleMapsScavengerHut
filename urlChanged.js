chrome.tabs.onRemoved.addListener(function(tabId, changeInfo, tab) {
    chrome.storage.sync.get(['previousTabId'], function(result) {
        if (tabId === result.previousTabId) {
            chrome.storage.sync.set({'previousTabId': null}, () => {}); // TODO: this isn't really thread safe
        }
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.storage.sync.get(['previousTabId', 'save'], function(result) {
        if (changeInfo.url != null && urlContains(changeInfo.url, '://www.google.com/maps/')) {
            const currentLatLon = getLatLon(changeInfo.url);
            if (result.save.currentLat == null || result.save.currentLon == null) {
                resetData(currentLatLon.currentLat, currentLatLon.currentLon);
                chrome.storage.sync.set({'previousTabId': tabId}, () => {}); // TODO: this isn't really thread safe
            }
            else if (tabId === result.previousTabId) {
                setLatLon(result.save, currentLatLon.currentLat, currentLatLon.currentLon, tabId);
            }
            //else if (distance is 0) {
            //}
            else {
                // TODO: Error handling. This will occur if you come back to google maps, or you are looking
                // at it from a second tab. We should display the option to jump to the position and continue
                // playing. Otherwise we should replace the sidebar with the option to do so.
            }
        }
    });
});

function urlContains(url, match) {
    return url.includes(match);
}