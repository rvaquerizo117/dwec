// js/controllers/FormController.js

import ToastUtility from '../utils/ToastUtility.js';
import RestaurantsManager from '../models/RestaurantsManager.js';
import DishFormController from '../controllers/DishFormController.js';
import CategoryFormController from '../controllers/CategoryFormController.js';

export function initializeFormModal(modalId, formId, openButtonId, closeButtonIds, saveButtonId, formType) {
    const modal = document.getElementById(modalId);
    const form = document.getElementById(formId);
    const openButton = document.getElementById(openButtonId);
    const closeButtons = closeButtonIds.map(id => document.getElementById(id));
    const saveButton = document.getElementById(saveButtonId);
    const imageInput = document.getElementById('dish-image');
    const imagePreview = document.getElementById('dish-image-preview');
    const messageContainerTop = document.getElementById('create-dish-message-container-top');
    const messageContainerBottom = document.getElementById('create-dish-message-container-bottom');
    const categorySelect = document.getElementById('dish-categories');
    const categoryFeedback = document.getElementById('category-feedback');
    const imageFeedback = document.getElementById('image-feedback');

    function openModal() {
        console.log('Opening modal...');
        modal.classList.add('is-active');
    }

    function closeModal() {
        console.log('Closing modal...');
        modal.classList.remove('is-active');
        form.classList.remove('was-validated');
        form.reset();
        if (imagePreview) {
            imagePreview.style.display = 'none';
            imagePreview.src = '';
        }
        if (messageContainerTop) messageContainerTop.innerHTML = '';  
        if (messageContainerBottom) messageContainerBottom.innerHTML = '';  
        clearFieldWarnings();
        console.log('Modal closed and form reset.');
    }

    function saveForm(event) {
        event.preventDefault();
        console.log('Save button clicked...');
        if (form.checkValidity() && imageInput?.files.length > 0 && categorySelect?.selectedOptions.length > 0) {
            console.log('Form is valid. Processing...');
            const name = document.getElementById('dish-name').value;
            const description = document.getElementById('dish-description').value;
            const ingredients = document.getElementById('dish-ingredients').value.split(',');
            const image = imageInput.files[0];
            const categories = Array.from(categorySelect.selectedOptions).map(option => option.value);
            const allergens = Array.from(document.getElementById('dish-allergens').selectedOptions).map(option => option.value);

            console.log('Datos del formulario:', { name, description, ingredients, image, categories, allergens });
            const success = formType.addDish(name, description, ingredients, URL.createObjectURL(image), categories, allergens);
            console.log('Dish added success status:', success);
            if (success === true) {
                ToastUtility.showSuccess('Plato añadido con éxito');
                console.log('Closing modal after successful dish addition...');
                setTimeout(() => {
                    closeModal();
                    console.log('Modal closed.');
                }, 2000);
            } else {
                console.log('Failed to add dish.');
            }
        } else {
            console.log('Form is invalid or missing required fields.');
            form.classList.add('was-validated');
            displayWarningMessages();
            highlightInvalidFields();
        }
    }

    function saveCategoryForm(event) {
        event.preventDefault();
        console.log('Save button clicked for category...');
        const name = document.getElementById('category-name').value;
        const description = document.getElementById('category-description').value;
        if (name && description) {
            try {
                formType.addCategory(name, description);
                form.classList.remove('was-validated');
                form.reset();
                modal.classList.remove('is-active');
                clearFieldWarnings();
                ToastUtility.showSuccess('Categoría añadida con éxito');
            } catch (error) {
                ToastUtility.showError(error.message);
            }
        } else {
            form.classList.add('was-validated');
            highlightInvalidFields();
            ToastUtility.showError('Por favor, complete todos los campos obligatorios.');
        }
    }

    function saveRestaurantForm(event) {
        event.preventDefault();
        console.log('Save button clicked for restaurant...');
        const name = document.getElementById('restaurant-name').value;
        const description = document.getElementById('restaurant-description').value;
        const location = document.getElementById('restaurant-location').value;
        if (name && description && location) {
            try {
                formType.addRestaurant(name, description, location);
                form.classList.remove('was-validated');
                form.reset();
                modal.classList.remove('is-active');
                clearFieldWarnings();
                ToastUtility.showSuccess('Restaurante añadido con éxito');
            } catch (error) {
                ToastUtility.showError(error.message);
            }
        } else {
            form.classList.add('was-validated');
            highlightInvalidFields();
            ToastUtility.showError('Por favor, complete todos los campos obligatorios.');
        }
    }

    function validateForm(event) {
        if (!form.checkValidity() || (formId === 'dish-form' && (imageInput?.files.length === 0 || categorySelect?.selectedOptions.length === 0))) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
        highlightInvalidFields();
    }

    function displayWarningMessages() {
        ToastUtility.showError('Por favor, complete todos los campos obligatorios.');
        scrollToMessage();
    }

    function highlightInvalidFields() {
        const invalidFields = form.querySelectorAll(':invalid');
        invalidFields.forEach(field => {
            field.classList.add('is-danger');
        });
    
        if (formId === 'dish-form') {
            if (imageInput && imageInput.files.length === 0) {
                imageInput.classList.add('is-danger');
                imageFeedback.style.display = 'block';
            } else {
                imageInput.classList.remove('is-danger');
                imageFeedback.style.display = 'none';
            }
    
            if (categorySelect && categorySelect.selectedOptions.length === 0) {
                categorySelect.classList.add('is-danger');
                categoryFeedback.style.display = 'block';
                categoryFeedback.style.color = 'red';
            } else {
                categorySelect.classList.remove('is-danger');
                categoryFeedback.style.display = 'none';
            }
        }
    
        if (formId === 'manage-categories-form') {
            const dishList = document.getElementById('manage-categories-dish-list');
            const associatedList = document.getElementById('manage-categories-associated-list');
    
            if (dishList.children.length === 0) {
                dishList.classList.add('is-danger');
            } else {
                dishList.classList.remove('is-danger');
            }
    
            if (associatedList.children.length === 0) {
                associatedList.classList.add('is-danger');
            } else {
                associatedList.classList.remove('is-danger');
            }
        }
    
        const validFields = form.querySelectorAll(':valid');
        validFields.forEach(field => {
            field.classList.remove('is-danger');
        });
    }
    

    function clearFieldWarnings() {
        const fields = form.querySelectorAll('.is-danger');
        fields.forEach(field => {
            field.classList.remove('is-danger');
        });
        document.querySelectorAll('.invalid-feedback').forEach(feedback => {
            feedback.style.display = 'none';
        });
    }

    function previewImage() {
        const file = imageInput?.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (imagePreview) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                }
            };
            reader.readAsDataURL(file);
        }
    }

    function scrollToMessage() {
        if (messageContainerTop) {
            messageContainerTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    if (!openButton.hasAttribute('data-event-registered')) {
        //console.log('Registering event listeners for modal and form...');
        openButton.addEventListener('click', openModal);
        openButton.setAttribute('data-event-registered', 'true');
    }

    closeButtons.forEach(button => {
        if (!button.hasAttribute('data-event-registered')) {
            //console.log('Registering close button:', button.id);
            button.addEventListener('click', closeModal);
            button.setAttribute('data-event-registered', 'true');
        }
    });

    if (formId === 'category-form') {
        saveButton.removeEventListener('click', saveForm);
        if (!saveButton.hasAttribute('data-event-registered')) {
            saveButton.addEventListener('click', saveCategoryForm);
            saveButton.setAttribute('data-event-registered', 'true');
        }
    } else if (formId === 'restaurant-form') {
        saveButton.removeEventListener('click', saveForm);
        if (!saveButton.hasAttribute('data-event-registered')) {
            saveButton.addEventListener('click', saveRestaurantForm);
            saveButton.setAttribute('data-event-registered', 'true');
        }
    } else {
        saveButton.removeEventListener('click', saveCategoryForm);
        if (!saveButton.hasAttribute('data-event-registered')) {
            saveButton.addEventListener('click', saveForm);
            saveButton.setAttribute('data-event-registered', 'true');
        }
    }

    if (!form.hasAttribute('data-event-registered')) {
        form.addEventListener('submit', validateForm, false);
        form.setAttribute('data-event-registered', 'true');
    }

    if (imageInput && !imageInput.hasAttribute('data-event-registered')) {
        imageInput.addEventListener('change', previewImage);
        imageInput.setAttribute('data-event-registered', 'true');
    }
}
