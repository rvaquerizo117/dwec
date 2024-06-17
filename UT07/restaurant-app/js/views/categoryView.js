// CategoryView.js

import ToastUtility from '../utils/ToastUtility.js';

class CategoryView {
    constructor(controller, dishController) {
        this.controller = controller;
        this.dishController = dishController;
    }

    renderCategories(categories) {
        console.log('Rendering categories:', categories);
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = '';

        const grid = document.createElement('div');
        grid.className = 'columns is-multiline';

        for (const category of categories) {
            const column = document.createElement('div');
            column.className = 'column is-one-third';
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => {
                this.controller.showCategoryDetails(category.name);
            };
            const cardContent = document.createElement('div');
            cardContent.className = 'card-content';
            const media = document.createElement('div');
            const mediaContent = document.createElement('div');
            mediaContent.className = 'media-content';
            const pTitle = document.createElement('p');
            pTitle.className = 'title is-4';
            pTitle.textContent = category.name;
            const pSubtitle = document.createElement('p');
            pSubtitle.className = 'subtitle is-6';
            pSubtitle.textContent = category.description;
            mediaContent.appendChild(pTitle);
            mediaContent.appendChild(pSubtitle);
            media.appendChild(mediaContent);
            cardContent.appendChild(media);
            card.appendChild(cardContent);
            column.appendChild(card);
            grid.appendChild(column);
        }
        mainContent.appendChild(grid);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        if (!document.getElementById('create-category-button')) {
            const createCategoryButton = document.createElement('button');
            createCategoryButton.className = 'button is-primary';
            createCategoryButton.textContent = 'Crear o Eliminar categorias';
            createCategoryButton.id = 'create-category-button';
            createCategoryButton.onclick = () => {
                this.controller.showCreateCategoryModal();
            };
            buttonContainer.appendChild(createCategoryButton);
        }

        if (!document.getElementById('manage-categories-button')) {
            const manageCategoriesButton = document.createElement('button');
            manageCategoriesButton.className = 'button is-primary';
            manageCategoriesButton.textContent = 'Gestionar Categorías';
            manageCategoriesButton.id = 'manage-categories-button';
            manageCategoriesButton.onclick = () => {
                this.controller.showManageCategories();
            };
            buttonContainer.appendChild(manageCategoriesButton);
        }

        mainContent.appendChild(buttonContainer);
    }

    renderCategory(category) {
        console.log(`Rendering category: ${category.name}`);
        const mainContent = document.getElementById('main-content');
        const grid = mainContent.querySelector('.columns.is-multiline');

        const column = document.createElement('div');
        column.className = 'column is-one-third';
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => {
            this.controller.showCategoryDetails(category.name);
        };
        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        const media = document.createElement('div');
        const mediaContent = document.createElement('div');
        mediaContent.className = 'media-content';
        const pTitle = document.createElement('p');
        pTitle.className = 'title is-4';
        pTitle.textContent = category.name;
        const pSubtitle = document.createElement('p');
        pSubtitle.className = 'subtitle is-6';
        pSubtitle.textContent = category.description;
        mediaContent.appendChild(pTitle);
        mediaContent.appendChild(pSubtitle);
        media.appendChild(mediaContent);
        cardContent.appendChild(media);
        card.appendChild(cardContent);
        column.appendChild(card);
        grid.appendChild(column);
    }

    renderCategoryDetails(category) {
        console.log('Rendering category details for:', category.name);
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = '';

        const title = document.createElement('h2');
        title.className = 'title';
        title.textContent = category.name;
        mainContent.appendChild(title);

        const description = document.createElement('p');
        description.textContent = category.description;
        mainContent.appendChild(description);

        const dishGrid = document.createElement('div');
        dishGrid.className = 'columns is-multiline';
        for (const dish of category.dishes) {
            const column = document.createElement('div');
            column.className = 'column is-one-third';
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => {
                this.dishController.showDishDetails(dish.name);
            };
            const cardImage = document.createElement('div');
            const figure = document.createElement('figure');
            figure.className = 'image is-4by3';
            const img = document.createElement('img');
            img.src = dish.image;
            img.alt = dish.name;
            figure.appendChild(img);
            cardImage.appendChild(figure);
            const cardContent = document.createElement('div');
            cardContent.className = 'card-content';
            const media = document.createElement('div');
            const mediaContent = document.createElement('div');
            mediaContent.className = 'media-content';
            const pTitle = document.createElement('p');
            pTitle.className = 'title is-4';
            pTitle.textContent = dish.name;
            const pSubtitle = document.createElement('p');
            pSubtitle.className = 'subtitle is-6';
            pSubtitle.textContent = dish.description;
            mediaContent.appendChild(pTitle);
            mediaContent.appendChild(pSubtitle);
            media.appendChild(mediaContent);
            cardContent.appendChild(media);
            card.appendChild(cardImage);
            card.appendChild(cardContent);
            column.appendChild(card);
            dishGrid.appendChild(column);
        }
        mainContent.appendChild(dishGrid);
    }

    updateCategoryMenu(categories) {
        const categoryMenu = document.getElementById('category-menu');
        categoryMenu.innerHTML = '';

        const createCategoryLink = document.createElement('a');
        createCategoryLink.className = 'navbar-item';
        createCategoryLink.textContent = 'Crear o eliminar categorías';
        createCategoryLink.href = '#';
        createCategoryLink.onclick = () => {
            this.controller.showCreateCategoryModal();
        };
        categoryMenu.appendChild(createCategoryLink);

        for (const category of categories) {
            const categoryLink = document.createElement('a');
            categoryLink.className = 'navbar-item';
            categoryLink.textContent = category.name;
            categoryLink.href = '#';
            categoryLink.onclick = () => {
                this.controller.showCategoryDetails(category.name);
            };
            categoryMenu.appendChild(categoryLink);
        }
    }

    renderError(errorMessage) {
        console.error('Render error:', errorMessage);
        ToastUtility.showError(errorMessage);
    }

    static updateBreadcrumb(paths) {
        //console.log('Updating breadcrumb:', paths);
        const breadcrumbList = document.getElementById('breadcrumb-list');
        breadcrumbList.innerHTML = '';
        paths.forEach((path, index) => {
            const li = document.createElement('li');
            if (index === paths.length - 1) {
                li.className = 'is-active';
                li.innerHTML = `<a href="${path.link}" aria-current="page">${path.name}</a>`;
            } else {
                li.innerHTML = `<a href="${path.link}">${path.name}</a>`;
            }
            breadcrumbList.appendChild(li);
        });
    }

    showCreateCategoryModal() {
        console.log('Showing create category modal');
        const modal = document.getElementById('create-category-modal');
        if (modal) {
            modal.classList.add('is-active');
        }

        const saveButton = document.getElementById('save-category-button');
        if (!saveButton.hasAttribute('data-event-registered')) {
            saveButton.addEventListener('click', () => {
                this.validateAndSaveCategory();
            });
            saveButton.setAttribute('data-event-registered', 'true');
        }

        this.resetCategoryForm();
    }

    removeCategory(category) {
        const mainContent = document.getElementById('main-content');
        const categoryElements = Array.from(mainContent.querySelectorAll('.category-item'));
        categoryElements.forEach(element => {
            if (element.textContent.includes(category.name)) {
                element.remove();
            }
        });

        // Additionally, update the category table in the modal if it exists
        const tableBody = document.getElementById('categories-table-body');
        if (tableBody) {
            const tableRows = Array.from(tableBody.querySelectorAll('tr'));
            tableRows.forEach(row => {
                if (row.textContent.includes(category.name)) {
                    row.remove();
                }
            });
        }
    }

    validateAndSaveCategory() {
        console.log('Validating category form');
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
                this.controller.addCategory(nameInput.value, descriptionInput.value);
                this.hideCreateCategoryModal();
            } catch (error) {
                this.renderError(error.message);
            }
        } else {
            ToastUtility.showError('Por favor, complete todos los campos obligatorios.');
        }
    }

    resetCategoryForm() {
        console.log('Resetting category form');
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

    showSuccessMessage(message) {
        ToastUtility.showSuccess(message);
    }

    showErrorMessage(message) {
        ToastUtility.showError(message);
    }
}

export default CategoryView;
