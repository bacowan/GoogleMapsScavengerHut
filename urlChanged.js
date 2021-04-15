let currentTabId = null;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url != null && urlContains(changeInfo.url, '://www.google.com/maps/')) {
        const currentLatLon = getLatLon(changeInfo.url);
        if (data.currentLat == null || data.currentLon == null) {
            resetData(currentLatLon.currentLat, currentLatLon.currentLon);
            currentTabId = tabId;
        }
        else if (tabId === currentTabId) {
            setLatLon(currentLatLon.currentLat, currentLatLon.currentLon);
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

function urlContains(url, match) {
    return url.includes(match);
}

function getLatLon(url) {
    const latMatcher = new RegExp('(?<=@)(.*?)(?=,)', 'g'); // everything from the first @ to the first , exclusive
    const lonMatcher = new RegExp('(?<=,)(.*?)(?=,)', 'g'); // everything from the first , to the second , exclusive
    const lat = latMatcher.exec(url)[0];
    const lon = lonMatcher.exec(url)[0];
    return {
        currentLat: lat,
        currentLon: lon
    }
}