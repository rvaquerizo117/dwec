import Restaurant from './Restaurant.js';

class RestaurantCollection {
    constructor() {
        this.restaurants = new Map();
    }

    add(restaurant) {
        if (!restaurant || !(restaurant instanceof Restaurant)) {
            throw new Error("Invalid or missing Restaurant object.");
        }
        if (this.restaurants.has(restaurant.name)) {
            throw new Error("Restaurant already exists.");
        }
        this.restaurants.set(restaurant.name, restaurant);
    }

    remove(restaurant) {
        if (!restaurant || !this.restaurants.delete(restaurant.name)) {
            throw new Error("Restaurant not found.");
        }
    }

    get(name) {
        return this.restaurants.get(name) || null;
    }

    getAll() {
        return Array.from(this.restaurants.values());
    }
}

export default RestaurantCollection;
