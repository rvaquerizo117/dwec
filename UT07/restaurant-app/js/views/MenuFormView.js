// js/views/MenuFormView.js

import initializeDragAndDrop from '../utils/DragAndDropUtility.js';
import ToastUtility from '../utils/ToastUtility.js';


class MenuFormView {
    constructor(controller) {
        this.controller = controller;
    }

    renderManageMenus(dishes, menuDishes = []) {
        const modal = document.getElementById('manage-menus-modal');
        const dishList = document.getElementById('manage-menus-dish-list');
        const associatedList = document.getElementById('manage-menus-associated-list');
        dishList.innerHTML = '';
        associatedList.innerHTML = '';

        dishes.forEach(dish => {
            const dishElement = document.createElement('div');
            dishElement.className = 'menu-dish-item';
            dishElement.textContent = dish.name;
            dishElement.draggable = true; // element draggable
            dishList.appendChild(dishElement);
        });

        menuDishes.forEach(dish => {
            const dishElement = document.createElement('div');
            dishElement.className = 'menu-dish-item';
            dishElement.textContent = dish.name;
            dishElement.draggable = true; // element draggable
            associatedList.appendChild(dishElement);
        });

        modal.classList.add('is-active');

        // Initialize drag and drop functionality after rendering 
        initializeDragAndDrop(this.controller);
    }

    showSuccessMessage(message) {
        ToastUtility.showSuccess(message);
    }

    showErrorMessage(message) {
        ToastUtility.showError(message);
    }
}

export default MenuFormView;
