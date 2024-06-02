class Dish {
    constructor(name, description = "", ingredients = [], image = "") {
        this._name = name;
        this._description = description;
        this._ingredients = ingredients;
        this._image = image;
        this._categories = new Set();
        this._allergens = new Set();
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

    get ingredients() {
        return this._ingredients;
    }

    set ingredients(value) {
        this._ingredients = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

    get categories() {
        return this._categories;
    }

    get allergens() {
        return this._allergens;
    }

    toString() {
        return `Dish: ${this.name}, Description: ${this.description}, Ingredients: ${this.ingredients.join(", ")}`;
    }
}
