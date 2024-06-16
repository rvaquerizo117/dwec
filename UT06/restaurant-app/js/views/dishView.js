import ToastUtility from '../utils/ToastUtility.js'; // Importar ToastUtility

class DishView {
    constructor(controller) {
        this.controller = controller;
    }

    loadCategories() {
        const categorySelect = document.getElementById('dish-categories');
        categorySelect.innerHTML = ''; // Clear previous options
        const categories = this.controller.restaurantsManager.categoriesIterator;
        for (const category of categories) {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        }
    }

    loadAllergens() {
        const allergenSelect = document.getElementById('dish-allergens');
        allergenSelect.innerHTML = ''; // Clear previous options
        const allergens = this.controller.restaurantsManager.allergensIterator;
        for (const allergen of allergens) {
            const option = document.createElement('option');
            option.value = allergen.name;
            option.textContent = allergen.name;
            allergenSelect.appendChild(option);
        }
    }

    renderDishes(dishes) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = ''; // Clear content
        const grid = document.createElement('div');
        grid.className = 'columns is-multiline';
        dishes.forEach(dish => {
            const column = document.createElement('div');
            column.className = 'column is-one-third';
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => {
                this.controller.showDishDetails(dish.name);
            };
            const cardImage = document.createElement('div');
            cardImage.className = 'card-image';
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
            media.className = 'media';
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
            grid.appendChild(column);
        });
        mainContent.appendChild(grid);
    }

    renderDishDetails(dish) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = ''; // Clear content
    
        const title = document.createElement('h2');
        title.className = 'title';
        title.textContent = dish.name;
        mainContent.appendChild(title);
    
        const description = document.createElement('p');
        description.textContent = dish.description;
        mainContent.appendChild(description);
    
        const ingredientsTitle = document.createElement('h3');
        ingredientsTitle.className = 'title is-5';
        ingredientsTitle.textContent = 'Ingredientes:';
        mainContent.appendChild(ingredientsTitle);
    
        const ingredientsList = document.createElement('ul');
        dish.ingredients.forEach(ingredient => {
            const item = document.createElement('li');
            item.textContent = ingredient;
            ingredientsList.appendChild(item);
        });
        mainContent.appendChild(ingredientsList);
    
        const allergensTitle = document.createElement('h3');
        allergensTitle.className = 'title is-5';
        allergensTitle.textContent = 'Alérgenos:';
        mainContent.appendChild(allergensTitle);
    
        const allergensList = document.createElement('ul');
        dish.allergens.forEach(allergen => {
            const item = document.createElement('li');
            item.textContent = allergen.name;
            allergensList.appendChild(item);
        });
        mainContent.appendChild(allergensList);
    
        const image = document.createElement('img');
        image.src = dish.image;
        image.alt = dish.name;
        image.className = 'dish-image';
        mainContent.appendChild(image);
    
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
    
        const deleteButton = document.createElement('button');
        deleteButton.className = 'button is-danger';
        deleteButton.textContent = 'Eliminar Plato';
        deleteButton.onclick = () => {
            if (confirm(`¿Estás seguro de que quieres eliminar el plato "${dish.name}"?`)) {
                this.controller.removeDish(dish.name);
            }
        };
        buttonContainer.appendChild(deleteButton);
    
        mainContent.appendChild(buttonContainer);
    }

    renderError(errorMessage) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `<div class="notification is-danger">${errorMessage}</div>`;
    }

    showSuccessMessage(message) {
        ToastUtility.showSuccess(message); // ToastUtility
    }

    static updateBreadcrumb(paths) {
        const breadcrumbList = document.getElementById('breadcrumb-list');
        breadcrumbList.innerHTML = ''; // Clear breadcrumb
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

    renderRandomDishes(dishes) {
        const mainContent = document.getElementById('main-content');
        const randomDishesSection = document.createElement('div');
        randomDishesSection.className = 'random-dishes section';

        const title = document.createElement('h2');
        title.className = 'title';
        title.textContent = 'Platos Aleatorios';
        randomDishesSection.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'columns is-multiline';
        dishes.forEach(dish => {
            const column = document.createElement('div');
            column.className = 'column is-one-third';
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => {
                this.controller.showDishDetails(dish.name);
            };
            const cardImage = document.createElement('div');
            cardImage.className = 'card-image';
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
            media.className = 'media';
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
            grid.appendChild(column);
        });
        randomDishesSection.appendChild(grid);
        mainContent.appendChild(randomDishesSection);
    }

    removeDish(dish) {
        ToastUtility.showSuccess(`El plato "${dish.name}" ha sido eliminado con éxito.`); 
        console.log(`Dish "${dish.name}" has been deleted.`);
    }
}

export default DishView;
