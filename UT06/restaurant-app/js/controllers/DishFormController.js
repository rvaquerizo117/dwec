import DishFormView from '../views/DishFormView.js';
import Dish from '../models/Dish.js';
import ToastUtility from '../utils/ToastUtility.js';

class DishFormController {
    constructor(manager, dishController) {
        this.manager = manager;
        this.view = new DishFormView(this);
        this.dishController = dishController;
    }

    addDish(name, description, ingredients, image, categories = [], allergens = []) {
        const normalizedDishName = name.trim().toLowerCase();
        console.log('Attempting to add dish:', { name, normalizedDishName, description, ingredients, image, categories, allergens });
    
        const existingDish = this.manager.findDishByName(normalizedDishName);
        console.log('Existing dish:', existingDish);
        if (existingDish) {
            ToastUtility.showError('El plato ya existe.'); 
            console.log('Dish addition failed: dish already exists');
            return false; // Ensure return of false on err
        }
    
        try {
            const dish = new Dish(name, description, ingredients, image);
            console.log('Dish created:', dish);
    
            this.manager.addDish(dish);
    
            categories.forEach(categoryName => {
                const category = this.manager.findCategoryByName(categoryName);
                console.log('Category found:', category);
                if (category) {
                    this.manager.assignCategoryToDish(category, dish);
                } else {
                    throw new Error(`Category '${categoryName}' not found.`);
                }
            });
    
            allergens.forEach(allergenName => {
                const allergen = this.manager.findAllergenByName(allergenName);
                console.log('Allergen found:', allergen);
                if (allergen) {
                    this.manager.assignAllergenToDish(allergen, dish);
                } else {
                    throw new Error(`Allergen '${allergenName}' not found.`);
                }
            });
    
            ToastUtility.showSuccess('Plato añadido correctamente');
            console.log('Dish addition successful');
            return true; // Ensure return of false on err
        } catch (error) {
            console.error('Error adding the dish:', error);
            ToastUtility.showError(`Error adding the dish: ${error.message}`); 
            console.log('Dish addition failed:', error.message);
            return false; // Ensure return of false on err
        }
    }
    

    removeDish(name) {
        const normalizedDishName = name.trim().toLowerCase();
        console.log('Attempting to remove dish:', { name, normalizedDishName });

        const dish = this.manager.findDishByName(normalizedDishName);
        console.log('Dish found:', dish);
        if (!dish) {
            ToastUtility.showError('Dish not found.'); 
            return;
        }

        try {
            this.manager.removeDish(dish);
            ToastUtility.showSuccess('Plato eliminado correctamente');
        } catch (error) {
            console.error('Error removing the dish:', error);
            ToastUtility.showError(`Error removing the dish: ${error.message}`);
        }
    }
}

export default DishFormController;
