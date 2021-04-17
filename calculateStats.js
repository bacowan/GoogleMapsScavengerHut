function setLatLon(data, currentLat, currentLon, tabId) {
    const distance = calculateDistance(data.currentLat, data.currentLon, currentLat, currentLon);
    updateData({
        stamina: data.stamina - (distance * 100),
        currentLat: currentLat,
        currentLon: currentLon
    }, tabId);
}

function calculateDistance(currentLat, currentLon, previousLat, previousLon) {
    if (previousLat == currentLat && previousLon == currentLon) {
        return 0;
    }
    else {
        // see https://stackoverflow.com/a/21623206/6043528
        const p = 0.017453292519943295;
        const c = Math.cos;
        const a = 0.5 - c((currentLat - previousLat) * p)/2 +
            c(previousLat * p) * c(currentLat * p) *
            (1 - c((currentLon - previousLon) * p))/2;
        return 12742 * Math.asin(Math.sqrt(a));
    }
}