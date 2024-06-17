// js/views/RestaurantView.js

class RestaurantView {
    constructor(controller) {
        this.controller = controller;
    }

    renderRestaurants(restaurants) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = ''; 
        const grid = document.createElement('div');
        grid.className = 'columns is-multiline';

        for (const restaurant of restaurants) {
            const column = document.createElement('div');
            column.className = 'column is-one-third';
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => {
                this.controller.showRestaurantDetails(restaurant.name);
            };
            const cardContent = document.createElement('div');
            cardContent.className = 'card-content';
            const media = document.createElement('div');
            media.className = 'media';
            const mediaContent = document.createElement('div');
            mediaContent.className = 'media-content';
            const pTitle = document.createElement('p');
            pTitle.className = 'title is-4';
            pTitle.textContent = restaurant.name;
            const pSubtitle = document.createElement('p');
            pSubtitle.className = 'subtitle is-6';
            pSubtitle.textContent = restaurant.description;
            mediaContent.appendChild(pTitle);
            mediaContent.appendChild(pSubtitle);
            media.appendChild(mediaContent);
            cardContent.appendChild(media);
            card.appendChild(cardContent);
            column.appendChild(card);
            grid.appendChild(column);
        }

        mainContent.appendChild(grid);

        // Show the "Create New Restaurant" button
        const createButton = document.getElementById('create-restaurant-button');
        if (createButton) {
            createButton.classList.remove('is-hidden');
            createButton.onclick = () => this.controller.showCreateRestaurantModal();
        }
    }

    removeRestaurant(restaurant) {
        const mainContent = document.getElementById('main-content');
        const restaurantCard = [...mainContent.getElementsByClassName('card')].find(card => card.innerText.includes(restaurant.name));
        if (restaurantCard) {
            restaurantCard.parentElement.removeChild(restaurantCard);
        }
    }

    renderRestaurantDetails(restaurant) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = '';
    
        const title = document.createElement('h2');
        title.className = 'title';
        title.textContent = restaurant.name;
        mainContent.appendChild(title);
        const description = document.createElement('p');
        description.textContent = restaurant.description;
        mainContent.appendChild(description);
        const location = document.createElement('p');
        location.textContent = `Location: ${restaurant.location.latitude}, ${restaurant.location.longitude}`;
        mainContent.appendChild(location);

        // Crear el enlace de OpenStreetMap
        const osmLink = document.createElement('a');
        osmLink.href = restaurant.location.getOpenStreetMapUrl();
        osmLink.target = '_blank';
        osmLink.textContent = 'Ver en OpenStreetMap';
        mainContent.appendChild(osmLink);
    
        // Crear el contenedor del mapa
        const mapDiv = document.createElement('div');
        mapDiv.id = "map";
        mapDiv.style.height = "400px";
        mapDiv.style.width = "100%";
        mainContent.appendChild(mapDiv);
    
        // Inicializar el mapa de Leaflet
        const map = L.map('map').setView([restaurant.location.latitude, restaurant.location.longitude], 13);
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    
        L.marker([restaurant.location.latitude, restaurant.location.longitude]).addTo(map)
            .bindPopup(`${restaurant.name}<br>${restaurant.description}`)
            .openPopup();
    }

    renderError(errorMessage) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `<div class="notification is-danger">${errorMessage}</div>`;
    }

    updateRestaurantMenu(restaurants) {
        const restaurantMenu = document.getElementById('restaurant-menu');
        restaurantMenu.innerHTML = '';
        
        // Add the "Create New Restaurant" option
        const createRestaurantLink = document.createElement('a');
        createRestaurantLink.className = 'navbar-item';
        createRestaurantLink.textContent = 'Crear o eliminar Nuevo restaurante';
        createRestaurantLink.href = '#';
        createRestaurantLink.onclick = () => {
            this.controller.showCreateRestaurantModal();
        };
        restaurantMenu.appendChild(createRestaurantLink);

        for (const restaurant of restaurants) {
            const restaurantLink = document.createElement('a');
            restaurantLink.className = 'navbar-item';
            restaurantLink.textContent = restaurant.name;
            restaurantLink.href = '#';
            restaurantLink.onclick = () => {
                this.controller.showRestaurantDetails(restaurant.name);
            };
            restaurantMenu.appendChild(restaurantLink);
        }
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
}

export default RestaurantView;
