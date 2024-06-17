import Dish from './Dish.js';

class DishCollection {
    constructor() {
        this.dishes = new Map();
    }

    add(dish) {
        if (!dish || !(dish instanceof Dish)) {
            throw new Error("Invalid or missing Dish object.");
        }
        if (this.dishes.has(dish.name)) {
            throw new Error("Dish already exists.");
        }
        this.dishes.set(dish.name, dish);
    }

    remove(dish) {
        if (!dish || !this.dishes.delete(dish.name)) {
            throw new Error("Dish not found.");
        }
    }

    get(name) {
        return this.dishes.get(name) || null;
    }

    getAll() {
        return Array.from(this.dishes.values());
    }
}

export default DishCollection;
