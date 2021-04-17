function setLatLon(lat, lon) {
    const distance = calculateDistance(lat, lon, data.currentLat, data.currentLon);
    updateData({
        stamina: data.stamina - (distance * 100),
        currentLat: lat,
        currentLon: lon
    });
}

function calculateDistance(previousLat, previousLon, currentLat, currentLon) {
    /*console.log(previousLat)
    console.log(previousLon)
    console.log(currentLat)
    console.log(currentLon)
    console.log("")*/
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