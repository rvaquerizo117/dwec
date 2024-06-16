import Category from '../models/Category.js';
import ToastUtility from '../utils/ToastUtility.js';

class CategoryFormController {
    constructor(manager, categoryController) {
        this.restaurantsManager = manager;
        this.categoryController = categoryController;
    }

    addCategory(name, description) {
        console.log(`Adding category: ${name}, ${description}`); 

        const existingCategory = this.restaurantsManager.findCategoryByName(name);
        if (existingCategory) {
            console.warn('Category already exists:', name);
            throw new Error('La categoría ya existe.');
        }

        try {
            const category = new Category(name, description);
            this.restaurantsManager.addCategory(category);
            ToastUtility.showSuccess('Categoría añadida con éxito');
            this.categoryController.updateCategoriesView();
            this.categoryController.view.updateCategoryMenu(this.restaurantsManager.categoriesIterator); // update menu
            console.log('Category added and view updated');
            return category;
        } catch (error) {
            console.error('Error adding category:', error);
            ToastUtility.showError(`Error al agregar la categoría: ${error.message}`);
            throw error;
        }
    }

    removeCategory(name) {
        try {
            const category = this.restaurantsManager.findCategoryByName(name);
            if (!category) {
                throw new Error('La categoría no existe.');
            }
            this.restaurantsManager.removeCategory(category);
            ToastUtility.showSuccess('Categoría eliminada con éxito');
            this.categoryController.updateCategoriesView();
            this.categoryController.view.updateCategoryMenu(this.restaurantsManager.categoriesIterator); // update menu
            console.log('Category removed and view updated');
            return category;
        } catch (error) {
            console.error('Error removing category:', error);
            ToastUtility.showError(`Error al eliminar la categoría: ${error.message}`);
            throw error;
        }
    }

    updateCategoriesView() {
        const categories = this.restaurantsManager.getAllCategories();
        this.categoryController.categoryView.renderCategories(categories);
    }
}

export default CategoryFormController;
