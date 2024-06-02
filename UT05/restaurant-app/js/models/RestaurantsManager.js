class RestaurantsManager {
    static instance = null;

    constructor() {
        if (RestaurantsManager.instance) {
            return RestaurantsManager.instance;
        }

        this.init();
        RestaurantsManager.instance = this;
    }

    static getInstance() {
        if (!RestaurantsManager.instance) {
            RestaurantsManager.instance = new RestaurantsManager();
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
        if (!category || !this.categories.delete(category.name)) {
            throw new Error("Category not found.");
        }
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
        if (!menu || !this.menus.delete(menu.name)) {
            throw new Error("Menu not found.");
        }
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
        if (!allergen || !this.allergens.delete(allergen.name)) {
            throw new Error("Allergen not found.");
        }
        for (let dish of this.dishes.values()) {
            dish.allergens.delete(allergen);
        }
        return this;
    }

    addDish(dish) {
        if (!dish || !(dish instanceof Dish)) {
            throw new Error("Invalid or missing Dish object.");
        }
        if (this.dishes.has(dish.name)) {
            throw new Error("Dish already exists.");
        }
        this.dishes.set(dish.name, dish);
        return this;
    }

    removeDish(dish) {
        if (!dish || !this.dishes.delete(dish.name)) {
            throw new Error("Dish not found.");
        }
        for (let menu of this.menus.values()) {
            menu.dishes.delete(dish);
        }
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
        if (!restaurant || !this.restaurants.delete(restaurant.name)) {
            throw new Error("Restaurant not found.");
        }
        return this;
    }

    assignCategoryToDish(category, dish) {
        if (!category || !this.categories.has(category.name)) {
            throw new Error("Category not found.");
        }
        if (!dish || !this.dishes.has(dish.name)) {
            throw new Error("Dish not found.");
        }
        const storedDish = this.dishes.get(dish.name);
        storedDish.categories.add(category);
        const storedCategory = this.categories.get(category.name);
        storedCategory.dishes.add(storedDish);
        return this;
    }

    deassignCategoryToDish(category, dish) {
        if (!dish || !category || !this.dishes.has(dish.name) || !this.categories.has(category.name)) {
            throw new Error("Dish or Category not found.");
        }
        const storedDish = this.dishes.get(dish.name);
        if (!storedDish.categories.has(category)) {
            throw new Error("Category not assigned to this Dish.");
        }
        storedDish.categories.delete(category);
        const storedCategory = this.categories.get(category.name);
        storedCategory.dishes.delete(storedDish);
        return this;
    }

    assignAllergenToDish(allergen, dish) {
        if (!allergen || !dish) {
            throw new Error("Allergen or Dish object missing.");
        }
        if (!this.allergens.has(allergen.name)) {
            throw new Error("Allergen not found.");
        }
        if (!this.dishes.has(dish.name)) {
            throw new Error("Dish not found.");
        }
        const storedDish = this.dishes.get(dish.name);
        storedDish.allergens.add(allergen);
        return this;
    }

    deassignAllergenToDish(allergen, dish) {
        if (!allergen || !dish || !this.allergens.has(allergen.name) || !this.dishes.has(dish.name)) {
            throw new Error("Allergen or Dish not found.");
        }
        const storedDish = this.dishes.get(dish.name);
        if (!storedDish.allergens.has(allergen)) {
            throw new Error("Allergen not assigned to this Dish.");
        }
        storedDish.allergens.delete(allergen);
        return this;
    }

    assignDishToMenu(dish, menu) {
        if (!menu || !dish) {
            throw new Error("Menu or Dish object missing.");
        }
        if (!this.menus.has(menu.name)) {
            throw new Error("Menu not found.");
        }
        if (!this.dishes.has(dish.name)) {
            throw new Error("Dish not found.");
        }
        const storedMenu = this.menus.get(menu.name);
        storedMenu.dishes.add(dish);
        return this;
    }

    deassignDishToMenu(dish, menu) {
        if (!menu || !this.menus.has(menu.name) || !dish || !this.dishes.has(dish.name)) {
            throw new Error("Dish or Menu not found.");
        }
        const storedMenu = this.menus.get(menu.name);
        if (!storedMenu.dishes.has(dish)) {
            throw new Error("Dish not assigned to this Menu.");
        }
        storedMenu.dishes.delete(dish);
        return this;
    }

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

    findCategoryByName(name) {
        return this.categories.get(name) || null;
    }

    findDishByName(name) {
        return this.dishes.get(name) || null;
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

    createDish(name, description, ingredients, image) {
        let dish = this.dishes.get(name);
        if (!dish) {
            dish = new Dish(name, description, ingredients, image);
            this.addDish(dish);
        }
        return dish;
    }

    createCategory(name, description) {
        let category = this.categories.get(name);
        if (!category) {
            category = new Category(name, description);
            this.addCategory(category);
        }
        return category;
    }

    createMenu(name, description) {
        let menu = this.menus.get(name);
        if (!menu) {
            menu = new Menu(name, description);
            this.addMenu(menu);
        }
        return menu;
    }

    createAllergen(name, description) {
        let allergen = this.allergens.get(name);
        if (!allergen) {
            allergen = new Allergen(name, description);
            this.addAllergen(allergen);
        }
        return allergen;
    }

    createRestaurant(name, description, location) {
        let restaurant = this.restaurants.get(name);
        if (!restaurant) {
            restaurant = new Restaurant(name, description, location);
            this.addRestaurant(restaurant);
        }
        return restaurant;
    }

    getRandomDishes(count) {
        const dishesArray = Array.from(this.dishes.values());
        const randomDishes = [];
        while (randomDishes.length < count && dishesArray.length > 0) {
            const randomIndex = Math.floor(Math.random() * dishesArray.length);
            randomDishes.push(dishesArray.splice(randomIndex, 1)[0]);
        }
        return randomDishes;
    }
}
