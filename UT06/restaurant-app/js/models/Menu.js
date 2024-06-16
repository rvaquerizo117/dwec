class Menu {
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

    addDish(dish) {
        this._dishes.add(dish);
    }

    removeDish(dish) {
        this._dishes.delete(dish);
    }

    get dishes() {
        return this._dishes;
    }

    changeDishPositions(dish1, dish2) {
        if (!this._dishes.has(dish1) || !this._dishes.has(dish2)) {
            throw new Error("Both dishes must be in the menu.");
        }
        const dishesArray = Array.from(this._dishes);
        const index1 = dishesArray.indexOf(dish1);
        const index2 = dishesArray.indexOf(dish2);
        dishesArray[index1] = dish2;
        dishesArray[index2] = dish1;
        this._dishes = new Set(dishesArray);
    }

    toString() {
        return `Menu: ${this.name}, Description: ${this._description}, Dishes: ${Array.from(this._dishes).map(dish => dish.name).join(", ")}`;
    }
}

export default Menu;
