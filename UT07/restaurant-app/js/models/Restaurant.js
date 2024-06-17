// js/models/Restaurant.js

class Restaurant {
    constructor(name, description = "", location = null) {
        this._name = name;
        this._description = description;
        this._location = location;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get location() {
        return this._location;
    }

    set location(value) {
        this._location = value;
    }

    toString() {
        return `Restaurant: ${this.name}, Description: ${this._description}, Location: (${this._location.latitude}, ${this._location.longitude})`;
    }
}

export default Restaurant;
