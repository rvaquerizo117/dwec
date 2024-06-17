// js/controllers/MenuController.js

//import RestaurantsManager from '../models/RestaurantsManager.js';
import MenuView from '../views/menuView.js';
import initializeDragAndDrop from '../utils/DragAndDropUtility.js';
import ToastUtility from '../utils/ToastUtility.js'; 
class MenuController {
    constructor(manager, dishController) {
        this.restaurantsManager = manager;
        this.dishController = dishController;
        this.view = new MenuView(this, dishController);
    }

    addMenu(name, description) {
        try {
            const menu = new Menu(name, description);
            this.restaurantsManager.addMenu(menu);
            this.view.renderMenus([menu]);
            ToastUtility.showSuccess('Menú añadido con éxito');
            setTimeout(() => {
                this.closeModal();
            }, 2000); // Delay closing the modal
        } catch (error) {
            this.view.renderError(error.message);
        }
    }

    removeMenu(name) {
        try {
            const menu = this.restaurantsManager.findMenuByName(name);
            this.restaurantsManager.removeMenu(menu);
            this.view.removeMenu(menu);
            ToastUtility.showSuccess('Menú eliminado con éxito'); 
        } catch (error) {
            this.view.renderError(error.message);
        }
    }

    addDishToMenu(menuName, dishName) {
        try {
            const menu = this.restaurantsManager.findMenuByName(menuName);
            const dish = this.restaurantsManager.findDishByName(dishName);
            menu.addDish(dish);
            this.view.renderMenus([menu]);
            ToastUtility.showSuccess('Plato añadido al menú con éxito'); 
        } catch (error) {
            this.view.renderError(error.message);
        }
    }

    showAllMenus() {
        const menus = Array.from(this.restaurantsManager.menusIterator);
        this.view.renderMenus(menus);
        MenuView.updateBreadcrumb([{ name: 'Inicio', link: '#' }, { name: 'Menús', link: '#' }]);
    }

    showMenuDetails(name) {
        const menu = this.restaurantsManager.findMenuByName(name);
        this.view.renderMenuDetails(menu);
        MenuView.updateBreadcrumb([{ name: 'Inicio', link: '#' }, { name: 'Menús', link: '#' }, { name: menu.name, link: '#' }]);
    }

    showDishDetails(name) {
        if (!this.dishController) {
            console.error('DishController is not initialized');
            return;
        }
        this.dishController.showDishDetails(name);
    }

    showManageMenus() {
        const dishes = Array.from(this.restaurantsManager.dishesIterator);
        const modal = document.getElementById('manage-menus-modal');
        const dishList = document.getElementById('manage-menus-dish-list');
        if (!dishList || !modal) {
            ToastUtility.showError('Error al cargar el formulario de gestión de menús.'); 
            return;
        }
        dishList.innerHTML = '';

        for (const dish of dishes) {
            const dishItem = document.createElement('div');
            dishItem.className = 'menu-dish-item navbar-item';
            dishItem.textContent = dish.name;
            dishItem.draggable = true; 
            dishItem.onclick = () => {
                this.loadAssociatedMenus(dish);
            };
            dishList.appendChild(dishItem);
        }

        modal.classList.add('is-active');
        initializeDragAndDrop(this); 

       // Add the event listener for the cancel button
        const cancelButton = document.getElementById('manage-menus-cancel-button');
        if (cancelButton) {
            cancelButton.onclick = () => {
                this.closeModal();
            };
        }

        // Add the event listener for the close button
        const closeButton = document.getElementById('manage-menus-close-button');
        if (closeButton) {
            closeButton.onclick = () => {
                this.closeModal();
            };
        }
    }

    saveManageMenus() {
        console.log('Saving managed menus...');

        const associatedList = document.getElementById('manage-menus-associated-list');
        const checkboxes = Array.from(associatedList.querySelectorAll('input[type="checkbox"]'));

        checkboxes.forEach(checkbox => {
            const menuName = checkbox.nextSibling.textContent;
            const menu = this.restaurantsManager.findMenuByName(menuName);
            const dishName = checkbox.getAttribute('data-dish-name');
            const dish = this.restaurantsManager.findDishByName(dishName);

            if (checkbox.checked) {
                console.log(`Assigning dish ${dishName} to menu ${menuName}`);
                this.restaurantsManager.assignDishToMenu(dish, menu);
            } else {
                console.log(`Removing dish ${dishName} from menu ${menuName}`);
                this.restaurantsManager.removeDishFromMenu(dish, menu);
            }
        });

        console.log('Menus saved successfully.');
        ToastUtility.showSuccess('Menús guardados con éxito.'); 
        console.log('Displaying success message. Delaying modal close for 2 seconds.');

        setTimeout(() => {
            this.closeModal();
        }, 2000); // Delay closing the modal 
    }

    loadAssociatedMenus(dish) {
        console.log('Loading associated menus for dish:', dish.name);
        const associatedList = document.getElementById('manage-menus-associated-list');
        associatedList.innerHTML = ''; 

        const menus = Array.from(this.restaurantsManager.menusIterator);
        for (const menu of menus) {
            const menuItem = document.createElement('div');
            menuItem.className = 'navbar-item';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = menu.dishes.has(dish);
            checkbox.setAttribute('data-dish-name', dish.name); // Add the name of the dish as a data attribute
            menuItem.appendChild(checkbox);
            menuItem.appendChild(document.createTextNode(menu.name));
            associatedList.appendChild(menuItem);
        }
        console.log('Associated menus loaded for dish:', dish.name);
    }

    reorderDishes(draggedDishName, targetDishName) {
        try {
            console.log(`Reordering dishes: ${draggedDishName} -> ${targetDishName}`);
            const dishes = Array.from(this.restaurantsManager.dishesIterator);
            const draggedDish = this.restaurantsManager.findDishByName(draggedDishName);
            const targetDish = this.restaurantsManager.findDishByName(targetDishName);

            const draggedIndex = dishes.findIndex(dish => dish === draggedDish);
            const targetIndex = dishes.findIndex(dish => dish === targetDish);

            if (draggedIndex !== -1 && targetIndex !== -1) {
                const [removedDish] = dishes.splice(draggedIndex, 1);
                dishes.splice(targetIndex, 0, removedDish);
                this.view.renderManageMenus(dishes);

                // Reload associated menus for the dragged dish
                console.log('Reloading associated menus for dragged dish:', draggedDish.name);
                this.loadAssociatedMenus(draggedDish);
            }
        } catch (error) {
            this.view.renderError(error.message);
        }
    }

    renderManageMenus(dishes) {
        const modal = document.getElementById('manage-menus-modal');
        const content = document.getElementById('manage-menus-dish-list');
        content.innerHTML = '';

        dishes.forEach(dish => {
            const dishElement = document.createElement('div');
            dishElement.className = 'menu-dish-item navbar-item';
            dishElement.textContent = dish.name;
            dishElement.draggable = true; // dish element draggable

            const dragIcon = document.createElement('span');
            dragIcon.className = 'icon is-small has-text-grey-light drag-icon';
            dragIcon.innerHTML = '<i class="fas fa-grip-lines"></i>';

            const contentContainer = document.createElement('div');
            contentContainer.className = 'dish-content';
            contentContainer.appendChild(dragIcon);
            contentContainer.appendChild(document.createTextNode(dish.name));

            dishElement.innerHTML = ''; // 
            dishElement.appendChild(contentContainer);

            content.appendChild(dishElement);
        });

        modal.classList.add('is-active');
    }

    closeModal() {
        console.log('Closing modal...');
        const modal = document.getElementById('manage-menus-modal');
        if (modal) {
            modal.classList.remove('is-active');
        }
    }
}

export default MenuController;
