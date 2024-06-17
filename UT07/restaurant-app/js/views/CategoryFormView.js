// CategoryFormView.js

import ToastUtility from '../utils/ToastUtility.js';
//import CategoryFormController from '../controllers/CategoryFormController.js';
import CategoryView from '../views/CategoryView.js';

class CategoryFormView {
    constructor(categoryFormController) {
        this.controller = categoryFormController;
        this.categoryView = new CategoryView(this.controller.categoryController, null);
    }

    showCreateCategoryModal() {
        const modal = document.getElementById('create-category-modal');
        if (modal) {
            modal.classList.add('is-active');
        }

        const saveButton = document.getElementById('save-category-button');
        if (!saveButton.hasAttribute('data-event-registered')) {
            saveButton.addEventListener('click', (event) => {
                event.preventDefault();
                this.validateAndSaveCategory();
            });
            saveButton.setAttribute('data-event-registered', 'true');
        }

        this.resetCategoryForm();
        this.loadExistingCategories(); // Load existing categories
    }

    loadExistingCategories() {
        const categories = Array.from(this.controller.restaurantsManager.categoriesIterator);
        this.renderCategoriesTable(categories);
    }

    renderCategoriesTable(categories) {
        const tableBody = document.getElementById('categories-table-body');
        tableBody.innerHTML = '';

        for (const category of categories) {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = category.name;
            row.appendChild(nameCell);

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = category.description;
            row.appendChild(descriptionCell);

            const actionCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.className = 'button is-danger';
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = () => {
                this.controller.removeCategory(category.name);
                this.renderCategoriesTable(Array.from(this.controller.restaurantsManager.categoriesIterator)); // Update the table after deleting
                console.log('Category removed from modal and view updated');
            };
            actionCell.appendChild(deleteButton);
            row.appendChild(actionCell);

            tableBody.appendChild(row);
        }
    }

    renderExistingCategories() {
        const categoryList = document.getElementById('existing-categories-list');
        categoryList.innerHTML = '';

        const categories = this.controller.restaurantsManager.categoriesIterator;
        for (const category of categories) {
            const listItem = document.createElement('li');
            listItem.textContent = category.name;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'button is-danger is-small';
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = () => {
                this.controller.removeCategory(category.name);
                this.renderExistingCategories(); // Update the list after deleting
                console.log('Category removed from list and view updated');
            };

            listItem.appendChild(deleteButton);
            categoryList.appendChild(listItem);
        }
    }

    validateAndSaveCategory() {
        const nameInput = document.getElementById('category-name');
        const descriptionInput = document.getElementById('category-description');
        let isValid = true;

        [nameInput, descriptionInput].forEach(input => {
            input.classList.remove('is-danger');
            const invalidFeedback = input.nextElementSibling;
            if (invalidFeedback) {
                invalidFeedback.style.display = 'none';
            }
        });

        if (!nameInput.value) {
            isValid = false;
            nameInput.classList.add('is-danger');
            const invalidFeedback = nameInput.nextElementSibling;
            if (invalidFeedback) {
                invalidFeedback.style.display = 'block';
            }
        }

        if (!descriptionInput.value) {
            isValid = false;
            descriptionInput.classList.add('is-danger');
            const invalidFeedback = descriptionInput.nextElementSibling;
            if (invalidFeedback) {
                invalidFeedback.style.display = 'block';
            }
        }

        if (isValid) {
            try {
                const newCategory = this.controller.addCategory(nameInput.value, descriptionInput.value);
                this.renderCategoriesTable(Array.from(this.controller.restaurantsManager.categoriesIterator)); // Refresh the table with new category
                this.categoryView.updateCategoryMenu(this.controller.restaurantsManager.categoriesIterator); // Update category menu
                this.hideCreateCategoryModal();
            } catch (error) {
                ToastUtility.showError(`Error al agregar la categoría: ${error.message}`);
            }
        } else {
            ToastUtility.showError('Por favor, complete todos los campos obligatorios.');
        }
    }

    resetCategoryForm() {
        const form = document.getElementById('category-form');
        if (form) {
            form.reset();
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.classList.remove('is-danger');
                const invalidFeedback = input.nextElementSibling;
                if (invalidFeedback) {
                    invalidFeedback.style.display = 'none';
                }
            });
        }
    }

    hideCreateCategoryModal() {
        const modal = document.getElementById('create-category-modal');
        if (modal) {
            modal.classList.remove('is-active');
        }
    }
}

export default CategoryFormView;
