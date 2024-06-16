import Category from './Category.js';
import Dish from './Dish.js';
import Allergen from './Allergen.js';
import Menu from './Menu.js';
import Restaurant from './Restaurant.js';

class RestaurantsManager {
    constructor() {
        if (RestaurantsManager.instance) {
            throw new Error("Use RestaurantsManager.getInstance() to get the singleton instance.");
        }
        this.categories = new Map();
        this.dishes = new Map();
        this.allergens = new Map();
        this.menus = new Map();
        this.restaurants = new Map();
        RestaurantsManager.instance = this;
        RestaurantsManager.instanceCount++;
        console.log('New instance created');
    }
    

    static getInstance() {
        if (!RestaurantsManager.instance) {
            console.log('Creating new singleton instance');
            RestaurantsManager.instance = new RestaurantsManager();
        } else {
            console.log('Returning existing singleton instance');
            console.trace('Instance requested');
        }
        return RestaurantsManager.instance;
    }
    
    

    init() {
        this.dishes = new Map();
        this.categories = new Map();
        this.allergens = new Map();
        this.menus = new Map();
        this.restaurants = new Map();
    }

    reset() {
        this.init();
    }

    // Creation methods
    createCategory(name, description) {
        if (this.categories.has(name)) {
            throw new Error("Category already exists.");
        }
        const category = new Category(name, description);
        this.categories.set(name, category);
        return category;
    }

    createDish(name, description, ingredients, image) {
        const normalizedDishName = name.trim().toLowerCase();
        if (this.dishes.has(normalizedDishName)) {
            throw new Error("Dish already exists.");
        }
        const dish = new Dish(name, description, ingredients, image);
        this.dishes.set(normalizedDishName, dish);
        return dish;
    }

    createMenu(name, description) {
        if (this.menus.has(name)) {
            throw new Error("Menu already exists.");
        }
        const menu = new Menu(name, description);
        this.menus.set(name, menu);
        return menu;
    }

    createAllergen(name, description) {
        if (this.allergens.has(name)) {
            throw new Error("Allergen already exists.");
        }
        const allergen = new Allergen(name, description);
        this.allergens.set(name, allergen);
        return allergen;
    }

    createRestaurant(name, description, location) {
        if (this.restaurants.has(name)) {
            throw new Error("Restaurant already exists.");
        }
        const restaurant = new Restaurant(name, description, location);
        this.restaurants.set(name, restaurant);
        return restaurant;
    }

    // Add and remove methods
    addCategory(category) {
        if (!category || !(category instanceof Category)) {
            throw new Error("Invalid or missing Category object.");
        }
        if (this.categories.has(category.name)) {
            throw new Error("Category already exists.");
        }
        this.categories.set(category.name, category);
        return this;
    }

    removeCategory(category) {
        if (!category || !(category instanceof Category) || !this.categories.has(category.name)) {
            throw new Error("Category not found.");
        }
        this.categories.delete(category.name);
        // remove category from all dishes
        for (let dish of this.dishes.values()) {
            dish.categories.delete(category);
        }
        return this;
    }


    addMenu(menu) {
        if (!menu || !(menu instanceof Menu)) {
            throw new Error("Invalid or missing Menu object.");
        }
        if (this.menus.has(menu.name)) {
            throw new Error("Menu already exists.");
        }
        this.menus.set(menu.name, menu);
        return this;
    }

    removeMenu(menu) {
        if (!menu || !(menu instanceof Menu) || !this.menus.has(menu.name)) {
            throw new Error("Menu not found.");
        }
        this.menus.delete(menu.name);
        return this;
    }

    addAllergen(allergen) {
        if (!allergen || !(allergen instanceof Allergen)) {
            throw new Error("Invalid or missing Allergen object.");
        }
        if (this.allergens.has(allergen.name)) {
            throw new Error("Allergen already exists.");
        }
        this.allergens.set(allergen.name, allergen);
        return this;
    }

    removeAllergen(allergen) {
        if (!allergen || !(allergen instanceof Allergen) || !this.allergens.has(allergen.name)) {
            throw new Error("Allergen not found.");
        }
        this.allergens.delete(allergen.name);
        // remove allergen from all dishes
        for (let dish of this.dishes.values()) {
            dish.allergens.delete(allergen);
        }
        return this;
    }

    addDish(dish) {
        const normalizedDishName = dish.name.trim().toLowerCase();
        if (this.dishes.has(normalizedDishName)) {
            throw new Error("Dish already exists.");
        }
        this.dishes.set(normalizedDishName, dish);
    }

    removeDish(dish) {
        const normalizedDishName = dish.name.trim().toLowerCase();
        if (!dish || !(dish instanceof Dish) || !this.dishes.has(normalizedDishName)) {
            throw new Error("Dish does not exist.");
        }
        this.dishes.delete(normalizedDishName);
        // Remove the dish from all menus
        for (let menu of this.menus.values()) {
            menu.dishes.delete(dish);
        }
        // Delete the dish from all categories
        for (let category of this.categories.values()) {
            category.dishes.delete(dish);
        }
        // Delete the dish from all allergens
        for (let allergen of this.allergens.values()) {
            allergen.dishes.delete(dish);
        }
        return this;
    }

removeDishFromMenu(dish, menu) {
    const normalizedDishName = dish.name.trim().toLowerCase();
    if (!menu || !dish) {
        throw new Error("Menu or Dish object missing.");
    }
    if (!this.menus.has(menu.name)) {
        throw new Error("Menu not found.");
    }
    if (!this.dishes.has(normalizedDishName)) {
        throw new Error("Dish not found.");
    }
    const storedMenu = this.menus.get(menu.name);
    storedMenu.dishes.delete(dish);
    return this;
}

    addRestaurant(restaurant) {
        if (!restaurant || !(restaurant instanceof Restaurant)) {
            throw new Error("Invalid or missing Restaurant object.");
        }
        if (this.restaurants.has(restaurant.name)) {
            throw new Error("Restaurant already exists.");
        }
        this.restaurants.set(restaurant.name, restaurant);
        return this;
    }

    removeRestaurant(restaurant) {
        if (!restaurant || !(restaurant instanceof Restaurant) || !this.restaurants.has(restaurant.name)) {
            throw new Error("Restaurant not found.");
        }
        this.restaurants.delete(restaurant.name);
        return this;
    }

    // Assignment and deassignment methods
    assignCategoryToDish(category, dish) {
        if (!category || !this.categories.has(category.name)) {
            throw new Error("Category not found.");
        }
        const normalizedDishName = dish.name.trim().toLowerCase();
        if (!dish || !this.dishes.has(normalizedDishName)) {
            throw new Error("Dish not found.");
        }
        const storedDish = this.dishes.get(normalizedDishName);
        storedDish.categories.add(category);
        const storedCategory = this.categories.get(category.name);
        storedCategory.dishes.add(storedDish);
        return this;
    }

    deassignCategoryToDish(category, dish) {
        const normalizedDishName = dish.name.trim().toLowerCase();
        if (!dish || !category || !this.dishes.has(normalizedDishName) || !this.categories.has(category.name)) {
            throw new Error("Dish or Category not found.");
        }
        const storedDish = this.dishes.get(normalizedDishName);
        const storedCategory = this.categories.get(category.name);
        if (storedDish.categories.has(category)) {
            storedDish.categories.delete(category);
            storedCategory.dishes.delete(storedDish);
        }
        return this;
    }

    assignAllergenToDish(allergen, dish) {
        const normalizedDishName = dish.name.trim().toLowerCase();
        if (!allergen || !dish) {
            throw new Error("Allergen or Dish object missing.");
        }
        if (!this.allergens.has(allergen.name)) {
            throw new Error("Allergen not found.");
        }
        if (!this.dishes.has(normalizedDishName)) {
            throw new Error("Dish not found.");
        }
        const storedDish = this.dishes.get(normalizedDishName);
        const storedAllergen = this.allergens.get(allergen.name);
        storedDish.allergens.add(allergen);
        storedAllergen.dishes.add(storedDish); // Add the dish to the allergen
        return this;
    }

    deassignAllergenToDish(allergen, dish) {
        const normalizedDishName = dish.name.trim().toLowerCase();
        if (!allergen || !dish || !this.allergens.has(allergen.name) || !this.dishes.has(normalizedDishName)) {
            throw new Error("Allergen or Dish not found.");
        }
        const storedDish = this.dishes.get(normalizedDishName);
        const storedAllergen = this.allergens.get(allergen.name);
        if (!storedDish.allergens.has(allergen)) {
            throw new Error("Allergen not assigned to this Dish.");
        }
        storedDish.allergens.delete(allergen);
        storedAllergen.dishes.delete(storedDish);
        return this;
    }

    assignDishToMenu(dish, menu) {
        const normalizedDishName = dish.name.trim().toLowerCase();
        if (!menu || !dish) {
            throw new Error("Menu or Dish object missing.");
        }
        if (!this.menus.has(menu.name)) {
            throw new Error("Menu not found.");
        }
        if (!this.dishes.has(normalizedDishName)) {
            throw new Error("Dish not found.");
        }
        const storedMenu = this.menus.get(menu.name);
        storedMenu.dishes.add(dish);
        return this;
    }
    
    

    deassignDishToMenu(dish, menu) {
        const normalizedDishName = dish.name.trim().toLowerCase();
        if (!menu || !this.menus.has(menu.name) || !dish || !this.dishes.has(normalizedDishName)) {
            throw new Error("Dish or Menu not found.");
        }
        const storedMenu = this.menus.get(menu.name);
        if (!storedMenu.dishes.has(dish)) {
            throw new Error("Dish not assigned to this Menu.");
        }
        storedMenu.dishes.delete(dish);
        return this;
    }

    reorderDishes(menu, draggedDishName, targetDishName) {
        const draggedIndex = menu.dishes.findIndex(dish => dish.name === draggedDishName);
        const targetIndex = menu.dishes.findIndex(dish => dish.name === targetDishName);

        if (draggedIndex === -1 || targetIndex === -1) {
            throw new Error('Plato no encontrado en el menú');
        }

        const [draggedDish] = menu.dishes.splice(draggedIndex, 1);
        menu.dishes.splice(targetIndex, 0, draggedDish);
    }

    // Iteration methods
    get categoriesIterator() {
        return this.categories.values();
    }

    get menusIterator() {
        return this.menus.values();
    }

    get allergensIterator() {
        return this.allergens.values();
    }

    get restaurantsIterator() {
        return this.restaurants.values();
    }

    get dishesIterator() {
        return this.dishes.values();
    }

    // Search methods
    findCategoryByName(name) {
        return this.categories.get(name) || null;
    }

    findDishByName(name) {
        const normalizedSearchName = name.trim().toLowerCase();
        console.log(`Buscando plato con nombre normalizado: '${normalizedSearchName}'`);
        
        // Uso de una búsqueda directa en el Map
        if (this.dishes.has(normalizedSearchName)) {
            console.log(`Plato encontrado: ${name}`);
            return this.dishes.get(normalizedSearchName);
        }
        
        console.log(`Plato no encontrado: ${name}`);
        return null;
    }

    findAllergenByName(name) {
        return this.allergens.get(name) || null;
    }

    findMenuByName(name) {
        return this.menus.get(name) || null;
    }

    findRestaurantByName(name) {
        return this.restaurants.get(name) || null;
    }

    // Random selection methods
    getRandomDishes(count) {
        const dishesArray = Array.from(this.dishes.values());
        const randomDishes = [];
        while (randomDishes.length < count && dishesArray.length > 0) {
            const randomIndex = Math.floor(Math.random() * dishesArray.length);
            randomDishes.push(dishesArray.splice(randomIndex, 1)[0]);
        }
        return randomDishes;
    }

    // Generic search methods
    find(callback) {
        let results = [];
        for (let collection of [this.categories.values(), this.dishes.values(), this.allergens.values(), this.menus.values(), this.restaurants.values()]) {
            for (let item of collection) {
                if (callback(item)) {
                    results.push(item);
                }
            }
        }
        return results;
    }
}

RestaurantsManager.instanceCount = 0;

export default RestaurantsManager;
