// js/views/MenuView.js

import ToastUtility from '../utils/ToastUtility.js'; 


class MenuView {
    constructor(controller, dishController) {
        this.controller = controller;
        this.dishController = dishController;
    }

    renderMenus(menus) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = '';

        const grid = document.createElement('div');
        grid.className = 'columns is-multiline';
        for (const menu of menus) {
            const column = document.createElement('div');
            column.className = 'column is-one-third';
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => {
                this.controller.showMenuDetails(menu.name);
            };
            const cardContent = document.createElement('div');
            cardContent.className = 'card-content';
            const media = document.createElement('div');
            media.className = 'media';
            const mediaContent = document.createElement('div');
            mediaContent.className = 'media-content';
            const pTitle = document.createElement('p');
            pTitle.className = 'title is-4';
            pTitle.textContent = menu.name;
            const pSubtitle = document.createElement('p');
            pSubtitle.className = 'subtitle is-6';
            pSubtitle.textContent = menu.description;
            mediaContent.appendChild(pTitle);
            mediaContent.appendChild(pSubtitle);
            media.appendChild(mediaContent);
            cardContent.appendChild(media);
            card.appendChild(cardContent);
            column.appendChild(card);
            grid.appendChild(column);
        }
        mainContent.appendChild(grid);

        // Create a container for the buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        
        // Create and append the "Manage Menus" button
        const manageButton = document.createElement('button');
        manageButton.className = 'button is-primary';
        manageButton.textContent = 'Gestionar Menús';
        manageButton.id = 'manage-menus-button';
        manageButton.onclick = () => {
            this.controller.showManageMenus();
        };
        buttonContainer.appendChild(manageButton);

        // Create and append the "Crear Nuevo Plato" button if it doesn't exist
        if (!document.getElementById('create-dish-button')) {
            const createDishButton = document.createElement('button');
            createDishButton.className = 'button is-primary';
            createDishButton.textContent = 'Crear Nuevo Plato';
            createDishButton.id = 'create-dish-button';
            buttonContainer.appendChild(createDishButton);
        }

        // Append the button container to main content at the bottom
        mainContent.appendChild(buttonContainer);
    }

    renderMenuDetails(menu) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = ''; 
        const title = document.createElement('h2');
        title.className = 'title';
        title.textContent = menu.name;
        mainContent.appendChild(title);
        const description = document.createElement('p');
        description.textContent = menu.description;
        mainContent.appendChild(description);

        const dishGrid = document.createElement('div');
        dishGrid.className = 'columns is-multiline';
        for (const dish of menu.dishes) {
            const column = document.createElement('div');
            column.className = 'column is-one-third';
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => {
                this.dishController.showDishDetails(dish.name);
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
            dishGrid.appendChild(column);
        }
        mainContent.appendChild(dishGrid);
    }

    renderError(errorMessage) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `<div class="notification is-danger">${errorMessage}</div>`;
    }

    static updateBreadcrumb(paths) {
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

    renderManageMenus(dishes) {
        const modal = document.getElementById('manage-menus-modal');
        const content = document.getElementById('manage-menus-dish-list');
        content.innerHTML = ''; 

        dishes.forEach(dish => {
            const dishElement = document.createElement('div');
            dishElement.className = 'menu-dish-item navbar-item';
            dishElement.textContent = dish.name;
            dishElement.draggable = true; //  element draggable

            const dragIcon = document.createElement('span');
            dragIcon.className = 'icon is-small has-text-grey-light drag-icon';
            dragIcon.innerHTML = '<i class="fas fa-grip-lines"></i>';

            const contentContainer = document.createElement('div');
            contentContainer.className = 'dish-content';
            contentContainer.appendChild(dragIcon);
            contentContainer.appendChild(document.createTextNode(dish.name));

            dishElement.innerHTML = ''; // Clear previous content
            dishElement.appendChild(contentContainer);

            content.appendChild(dishElement);
        });

        modal.classList.add('is-active');
    }
    
    showSuccessMessage(message) {
        ToastUtility.showSuccess(message);
    }

    showErrorMessage(message) {
        ToastUtility.showError(message);
    }
}

export default MenuView;
