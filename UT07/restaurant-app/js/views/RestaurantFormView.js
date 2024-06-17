// js/views/RestaurantFormView.js

import ToastUtility from '../utils/ToastUtility.js';
//import RestaurantFormController from '../controllers/RestaurantFormController.js';
import RestaurantView from '../views/restaurantView.js';

class RestaurantFormView {
    constructor(restaurantFormController) {
        this.controller = restaurantFormController;
        this.restaurantView = new RestaurantView(this.controller.restaurantController);
    }

    showCreateRestaurantModal() {
        const modal = document.getElementById('create-restaurant-modal');
        if (modal) {
            modal.classList.add('is-active');
        }

        const saveButton = document.getElementById('save-restaurant-button');
        if (!saveButton.hasAttribute('data-event-registered')) {
            saveButton.addEventListener('click', (event) => {
                event.preventDefault();
                this.validateAndSaveRestaurant();
            });
            saveButton.setAttribute('data-event-registered', 'true');
        }

        this.resetRestaurantForm();
        const restaurants = Array.from(this.controller.restaurantsManager.restaurantsIterator);
        this.renderRestaurantsTable(restaurants);
    }

    renderRestaurantsTable(restaurants) {
        const tableBody = document.getElementById('restaurants-table-body');
        tableBody.innerHTML = '';

        for (const restaurant of restaurants) {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = restaurant.name;
            row.appendChild(nameCell);

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = restaurant.description;
            row.appendChild(descriptionCell);

            const locationCell = document.createElement('td');
            locationCell.textContent = restaurant.location;
            row.appendChild(locationCell);

            const actionCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.className = 'button is-danger';
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = () => {
                this.controller.restaurantController.removeRestaurant(restaurant.name); // Cambiado para usar el método correcto del controlador
                this.renderRestaurantsTable(Array.from(this.controller.restaurantsManager.restaurantsIterator)); // Update the table after deleting
                this.restaurantView.updateRestaurantMenu(this.controller.restaurantsManager.restaurantsIterator); // Update menu after deleting
                console.log('Restaurant removed from modal and view updated');
            };
            actionCell.appendChild(deleteButton);
            row.appendChild(actionCell);

            tableBody.appendChild(row);
        }
    }

    validateAndSaveRestaurant() {
        const nameInput = document.getElementById('restaurant-name');
        const descriptionInput = document.getElementById('restaurant-description');
        const locationInput = document.getElementById('restaurant-location');
        let isValid = true;
        let missingFields = [];
    
        [nameInput, descriptionInput, locationInput].forEach(input => {
            input.classList.remove('is-danger');
            const invalidFeedback = input.nextElementSibling;
            if (invalidFeedback) {
                invalidFeedback.style.display = 'none';
            }
        });
    
        if (!nameInput.value) {
            isValid = false;
            missingFields.push('Nombre');
            nameInput.classList.add('is-danger');
            const invalidFeedback = nameInput.nextElementSibling;
            if (invalidFeedback) {
                invalidFeedback.style.display = 'block';
            }
        }
    
        if (!descriptionInput.value) {
            isValid = false;
            missingFields.push('Descripción');
            descriptionInput.classList.add('is-danger');
            const invalidFeedback = descriptionInput.nextElementSibling;
            if (invalidFeedback) {
                invalidFeedback.style.display = 'block';
            }
        }
    
        if (!locationInput.value) {
            isValid = false;
            missingFields.push('Ubicación');
            locationInput.classList.add('is-danger');
            const invalidFeedback = locationInput.nextElementSibling;
            if (invalidFeedback) {
                invalidFeedback.style.display = 'block';
            }
        } else {
            const [latitude, longitude] = locationInput.value.split(',').map(coord => parseFloat(coord.trim()));
            if (isNaN(latitude) || isNaN(longitude)) {
                isValid = false;
                missingFields.push('Ubicación (formato incorrecto)');
                locationInput.classList.add('is-danger');
                const invalidFeedback = locationInput.nextElementSibling;
                if (invalidFeedback) {
                    invalidFeedback.style.display = 'block';
                }
            } else {
                console.log(`Parsed coordinates: Latitude = ${latitude}, Longitude = ${longitude}`);
            }
        }
    
        console.log('Campos del formulario:', {
            name: nameInput.value,
            description: descriptionInput.value,
            location: locationInput.value,
            isValid: isValid,
            missingFields: missingFields
        });
    
        if (isValid) {
            try {
                const newRestaurant = this.controller.addRestaurant(nameInput.value, descriptionInput.value, locationInput.value);
                this.restaurantView.renderRestaurants([newRestaurant]);
                this.restaurantView.updateRestaurantMenu(this.controller.restaurantsManager.restaurantsIterator); // Actualiza el menú después de agregar
                this.hideCreateRestaurantModal();
            } catch (error) {
                ToastUtility.showError(`Error al agregar el restaurante: ${error.message}`);
            }
        } else {
            ToastUtility.showError(`Por favor, complete todos los campos obligatorios: ${missingFields.join(', ')}.`);
        }
    }

    resetRestaurantForm() {
        const form = document.getElementById('restaurant-form');
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
}

export default RestaurantFormView;
