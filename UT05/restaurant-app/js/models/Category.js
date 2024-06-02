class Category {
    constructor(name, description = "") {
        this._name = name;
        this._description = description;
        this._dishes = new Set();
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

    get dishes() {
        return this._dishes;
    }

    toString() {
        return `Category: ${this.name}, Description: ${this.description}`;
    }
}
