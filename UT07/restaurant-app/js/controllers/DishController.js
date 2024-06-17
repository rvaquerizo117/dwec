// js/controllers/DishController.js

import Dish from '../models/Dish.js';
import DishView from '../views/dishView.js';

class DishController {
    constructor(manager) {
        this.restaurantsManager = manager;
        this.view = new DishView(this);
        window.dishController = this; // Hacer dishController disponible globalmente
    }

    addDish(name, description, ingredients, image, categories = [], allergens = []) {
        const normalizedDishName = name.trim().toLowerCase();
        console.log('Attempting to add dish:', { name, normalizedDishName, description, ingredients, image, categories, allergens });
    
        const existingDish = this.restaurantsManager.findDishByName(normalizedDishName);
        console.log('Existing dish:', existingDish);
        if (existingDish) {
            ToastUtility.showError('El plato ya existe.'); 
            console.log('Dish addition failed: dish already exists');
            return false; // Ensure return of false on error
        }
    
        try {
            const dish = new Dish(name, description, ingredients, image);
            console.log('Dish created:', dish);
    
            this.restaurantsManager.addDish(dish);
    
            categories.forEach(categoryName => {
                const category = this.restaurantsManager.findCategoryByName(categoryName);
                console.log('Category found:', category);
                if (category) {
                    this.restaurantsManager.assignCategoryToDish(category, dish);
                } else {
                    throw new Error(`Category '${categoryName}' not found.`);
                }
            });
    
            allergens.forEach(allergenName => {
                const allergen = this.restaurantsManager.findAllergenByName(allergenName);
                console.log('Allergen found:', allergen);
                if (allergen) {
                    this.restaurantsManager.assignAllergenToDish(allergen, dish);
                } else {
                    throw new Error(`Allergen '${allergenName}' not found.`);
                }
            });
    
            ToastUtility.showSuccess('Plato añadido con éxito');
            console.log('Dish addition successful');
            return true; // Ensure return of false on error
        } catch (error) {
            console.error('Error adding the dish:', error);
            ToastUtility.showError(`Error añadiendo el plato: ${error.message}`); 
            console.log('Dish addition failed:', error.message);
            return false; // Ensurereturn of false on error
        }
    }
    
    

    removeDish(name) {
        try {
            const dish = this.restaurantsManager.findDishByName(name);
            if (!dish) {
                throw new Error(`El plato con el nombre "${name}" no existe.`);
            }
            this.restaurantsManager.removeDish(dish);
            this.view.removeDish(dish);
        } catch (error) {
            this.view.renderError(`Error al eliminar el plato: ${error.message}`);
        }
    }

    assignCategoryToDish(categoryName, dishName) {
        try {
            const category = this.restaurantsManager.findCategoryByName(categoryName);
            const dish = this.restaurantsManager.findDishByName(dishName);
            this.restaurantsManager.assignCategoryToDish(category, dish);
            this.view.renderDishes([dish]);
        } catch (error) {
            this.view.renderError(error.message);
        }
    }

    assignAllergenToDish(allergenName, dishName) {
        try {
            const allergen = this.restaurantsManager.findAllergenByName(allergenName);
            const dish = this.restaurantsManager.findDishByName(dishName);
            this.restaurantsManager.assignAllergenToDish(allergen, dish);
            this.view.renderDishes([dish]);
        } catch (error) {
            this.view.renderError(error.message);
        }
    }

    showAllDishes() {
        try {
            const dishes = this.restaurantsManager.dishes.getAll();
            this.view.renderDishes(dishes);
        } catch (error) {
            this.view.renderError(error.message);
        }
    }

    showDishDetails(name) {
        try {
            const dish = this.restaurantsManager.findDishByName(name);
            this.view.renderDishDetails(dish);
        } catch (error) {
            this.view.renderError(error.message);
        }
    }
}

export default DishController;
