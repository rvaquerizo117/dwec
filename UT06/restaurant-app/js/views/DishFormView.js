import ToastUtility from '../utils/ToastUtility.js';

class DishFormView {
    constructor(controller) {
        this.controller = controller;
    }

    loadCategories() {
        const categorySelect = document.getElementById('dish-categories');
        categorySelect.innerHTML = ''; 
        const categories = this.controller.manager.categoriesIterator;
        for (const category of categories) {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        }
    }

    loadAllergens() {
        const allergenSelect = document.getElementById('dish-allergens');
        allergenSelect.innerHTML = ''; 
        const allergens = this.controller.manager.allergensIterator;
        for (const allergen of allergens) {
            const option = document.createElement('option');
            option.value = allergen.name;
            option.textContent = allergen.name;
            allergenSelect.appendChild(option);
        }
    }

    showSuccessMessage(message) {
        ToastUtility.showSuccess(message);
    }

    showErrorMessage(message) {
        ToastUtility.showError(message); 
    }
}

export default DishFormView;
