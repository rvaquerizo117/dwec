// /js/categoriesategoryController.js

//import RestaurantsManager from '../models/RestaurantsManager.js';
import Category from '../models/Category.js';
import CategoryView from '../views/CategoryView.js';
import ToastUtility from '../utils/ToastUtility.js';
import CategoryFormView from '../views/CategoryFormView.js';

class CategoryController {
    constructor(manager, dishController) {
        this.restaurantsManager = manager;
        this.dishController = dishController;
        this.view = new CategoryView(this, this.dishController);
        this.formView = new CategoryFormView(this);
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
            this.view.renderCategory(category);
            this.updateCategoriesView();
            this.view.updateCategoryMenu(this.restaurantsManager.categoriesIterator); // Update dropdoun menu
        } catch (error) {
            console.error('Error adding category:', error);
            this.view.showErrorMessage(error.message);
        }
    }

    removeCategory(name) {
        try {
            const category = this.restaurantsManager.findCategoryByName(name);
            if (!category) {
                throw new Error('La categoría no existe.');
            }
            this.restaurantsManager.removeCategory(category);
            this.view.removeCategory(category);
            this.updateCategoriesView(); // Update the categories view
            this.view.updateCategoryMenu(this.restaurantsManager.categoriesIterator); // Update the dropdoun menu
        } catch (error) {
            console.error('Error removing category:', error);
            this.view.showErrorMessage(error.message);
        }
    }

    showAllCategories() {
        const categories = this.restaurantsManager.categoriesIterator;
        console.log('Showing all categories:', categories);
        this.view.renderCategories(categories);
        CategoryView.updateBreadcrumb([{ name: 'Inicio', link: '#' }, { name: 'Categorías', link: '#' }]);
    }

    showCategoryDetails(name) {
        const category = this.restaurantsManager.findCategoryByName(name);
        console.log('Showing category details:', category);
        this.view.renderCategoryDetails(category);
        CategoryView.updateBreadcrumb([{ name: 'Inicio', link: '#' }, { name: 'Categorías', link: '#' }, { name: category.name, link: '#' }]);
    }

    updateCategoriesView() {
        const categories = this.restaurantsManager.categoriesIterator;
        this.view.renderCategories(categories);
    }

    showManageCategories() {
        const dishes = Array.from(this.restaurantsManager.dishesIterator);
        const modal = document.getElementById('manage-categories-modal');
        const dishList = document.getElementById('manage-categories-dish-list');
        if (!dishList || !modal) {
            ToastUtility.showError('Error al cargar el formulario de gestión de categorías.');
            return;
        }
        dishList.innerHTML = '';
    
        for (const dish of dishes) {
            const dishItem = document.createElement('div');
            dishItem.className = 'category-dish-item navbar-item';
            dishItem.textContent = dish.name;
            dishItem.draggable = true;
            dishItem.onclick = () => {
                this.loadAssociatedCategories(dish);
            };
            dishList.appendChild(dishItem);
        }
    
        modal.classList.add('is-active');
    
        // Add the event listener for the cancel button
        const cancelButton = document.getElementById('manage-categories-cancel-button');
        if (cancelButton) {
            cancelButton.onclick = () => {
                this.closeModal();
            };
        }
    
        // Add the event listener for the close button
        const closeButton = document.getElementById('manage-categories-close-button');
        if (closeButton) {
            closeButton.onclick = () => {
                this.closeModal();
            };
        }
    
        // Add the event listener for the save button
        const saveButton = document.getElementById('manage-categories-save-button');
        if (saveButton) {
            saveButton.onclick = () => {
                this.saveManageCategories();
            };
        }
    }

    loadAssociatedCategories(dish) {
        const associatedList = document.getElementById('manage-categories-associated-list');
        associatedList.innerHTML = '';

        const categories = Array.from(this.restaurantsManager.categoriesIterator);
        for (const category of categories) {
            const categoryItem = document.createElement('div');
            categoryItem.className = 'navbar-item';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = category.dishes.has(dish);
            checkbox.setAttribute('data-dish-name', dish.name);
            categoryItem.appendChild(checkbox);
            categoryItem.appendChild(document.createTextNode(category.name));
            associatedList.appendChild(categoryItem);
        }
    }

    saveManageCategories() {
        const associatedList = document.getElementById('manage-categories-associated-list');
        const checkboxes = Array.from(associatedList.querySelectorAll('input[type="checkbox"]'));
    
        checkboxes.forEach(checkbox => {
            const categoryName = checkbox.nextSibling.textContent;
            const category = this.restaurantsManager.findCategoryByName(categoryName);
            const dishName = checkbox.getAttribute('data-dish-name');
            const dish = this.restaurantsManager.findDishByName(dishName);
    
            if (checkbox.checked) {
                if (!category.dishes.has(dish)) {
                    this.restaurantsManager.assignCategoryToDish(category, dish);
                }
            } else {
                if (category.dishes.has(dish)) {
                    this.restaurantsManager.deassignCategoryToDish(category, dish);
                }
            }
        });
    
        ToastUtility.showSuccess('Categorías guardadas con éxito.');
        this.closeModal();
    }

    closeModal() {
        const modal = document.getElementById('manage-categories-modal');
        modal.classList.remove('is-active');
    }

    showCreateCategoryModal() {
        this.formView.showCreateCategoryModal();
    }
}

export default CategoryController;
