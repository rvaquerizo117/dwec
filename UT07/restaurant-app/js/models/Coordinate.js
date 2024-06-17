// js/models/Coordinate.js

class Coordinate {
    constructor(latitude, longitude) {
        this._latitude = latitude;
        this._longitude = longitude;
    }

    get latitude() {
        return this._latitude;
    }

    set latitude(value) {
        this._latitude = value;
    }

    get longitude() {
        return this._longitude;
    }

    set longitude(value) {
        this._longitude = value;
    }

    toString() {
        return `Latitude: ${this._latitude}, Longitude: ${this._longitude}`;
    }

    getOpenStreetMapUrl() {
        return `https://www.openstreetmap.org/?mlat=${this._latitude}&mlon=${this._longitude}#map=13/${this._latitude}/${this._longitude}`;
    }
}

export default Coordinate;
