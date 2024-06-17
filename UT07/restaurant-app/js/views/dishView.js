// js/views/DishView.js

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

    isFavorite(dishId) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return favorites.includes(dishId);
    }

    toggleFavorite(dishId) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (this.isFavorite(dishId)) {
            console.log(`Removing dish ${dishId} from favorites`); // Depuración
            favorites = favorites.filter(id => id !== dishId);
            ToastUtility.showSuccess("Plato eliminado de favoritos");
        } else {
            console.log(`Adding dish ${dishId} to favorites`); // Depuración
            favorites.push(dishId);
            ToastUtility.showSuccess("Plato añadido a favoritos");
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
    updateFavoriteButton(button, isFavorite) {
        if (isFavorite) {
            button.innerHTML = '<i class="fas fa-star"></i>'; // Icono lleno
        } else {
            button.innerHTML = '<i class="far fa-star"></i>'; // Icono vacío
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
    
        const titleContainer = document.createElement('div');
        titleContainer.className = 'title-container';
        
        const title = document.createElement('h2');
        title.className = 'title';
        title.textContent = dish.name;
        titleContainer.appendChild(title);
    
        // Añadir el icono de favorito al lado del título
        const favoriteButton = document.createElement('button');
        favoriteButton.className = 'favorite-btn';
        this.updateFavoriteButton(favoriteButton, this.isFavorite(dish.name)); // Usar dish.name como ID
        favoriteButton.onclick = () => {
            this.toggleFavorite(dish.name); // Usar dish.name como ID
            this.updateFavoriteButton(favoriteButton, this.isFavorite(dish.name)); // Usar dish.name como ID
        };
        titleContainer.appendChild(favoriteButton);
    
        mainContent.appendChild(titleContainer);
    
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

    renderFavoriteDishes() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = ''; // Clear content
        
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const dishes = Array.from(this.controller.restaurantsManager.dishes.values());
        const favoriteDishes = dishes.filter(dish => favorites.includes(dish.name));
    
        if (favoriteDishes.length === 0) {
            mainContent.innerHTML = '<p>No tienes platos favoritos.</p>';
            return;
        }
    
        const table = document.createElement('table');
        table.className = 'table is-fullwidth';
        
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
            </tr>
        `;
        table.appendChild(thead);
        
        const tbody = document.createElement('tbody');
        favoriteDishes.forEach(dish => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${dish.name}</td>
                <td>${dish.description}</td>
                <td>
                    <button class="button is-danger" onclick="removeFromFavorites('${dish.name}')">Eliminar Fav</button>
                </td>
            `;
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        mainContent.appendChild(table);
    }
    
    
// Eliminar plato ---
    removeDish(dish) {
        ToastUtility.showSuccess(`El plato "${dish.name}" ha sido eliminado con éxito.`); 
        console.log(`Dish "${dish.name}" has been deleted.`);
    }
}

// Función global para eliminar un plato de favoritos
window.removeFromFavorites = (dishName) => {
    const controller = window.dishController; // Asegúrate de que dishController esté disponible globalmente
    controller.view.toggleFavorite(dishName);
    controller.view.renderFavoriteDishes();
};

export default DishView;

