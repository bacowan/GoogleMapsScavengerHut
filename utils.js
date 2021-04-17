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