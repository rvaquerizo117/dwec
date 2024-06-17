// js/main.js

import RestaurantsManager from './models/RestaurantsManager.js';
import Category from './models/Category.js';
import Dish from './models/Dish.js';
import Allergen from './models/Allergen.js';
import Menu from './models/Menu.js';
import Restaurant from './models/Restaurant.js';
import Coordinate from './models/Coordinate.js';
import CategoryController from './controllers/CategoryController.js';
import AllergenController from './controllers/AllergenController.js';
import MenuController from './controllers/MenuController.js';
import RestaurantController from './controllers/RestaurantController.js';
import CategoryFormController from './controllers/CategoryFormController.js';
import CategoryFormView from './views/CategoryFormView.js';
import CategoryView from './views/CategoryView.js';
import RestaurantFormController from './controllers/RestaurantFormController.js';
import RestaurantFormView from './views/RestaurantFormView.js';
import DishFormController from './controllers/DishFormController.js';
import DishController from './controllers/DishController.js';
import { initializeFormModal } from './controllers/FormController.js';
import LoginController from './controllers/LoginController.js';
import BackupController from './controllers/BackupController.js';


// Declarar dishController en el ámbito global
let dishController;


// Función para verificar si el usuario está autenticado
function isAuthenticated() {
    //console.log("Verificando autenticación...");
    const authenticated = document.cookie.split(';').some(cookie => cookie.trim().startsWith('authenticated='));
    //console.log("Autenticado:", authenticated);
    return authenticated;
}

// Función para cargar la vista de login
function loadLoginView() {
    //console.log("Cargando vista de login...");
    new LoginController();
}

// Función para obtener el nombre de usuario de la cookie
function getUsernameFromCookie() {
    const username = document.cookie.split(';').find(cookie => cookie.trim().startsWith('username='));
    //console.log("Valor de la cookie username:", username); // Depuración
    return username ? username.split('=')[1] : '';
}

// Función para mostrar el nombre de usuario en el menú
function showUsernameInMenu() {
    const username = getUsernameFromCookie();
    //console.log("Nombre de usuario obtenido:", username); // Depuración
    if (username) {
        const userArea = document.getElementById('user-area');
        if (userArea) {
            userArea.innerHTML = `
                <a class="navbar-link" href="#">Hola, ${username}</a>
                <div class="navbar-dropdown is-right">
                    <a class="navbar-item" href="#" id="favorites-link">Mis Favoritos</a>
                    <a class="navbar-item" href="#" id="backup-link">Backup</a>
                    <a class="navbar-item" href="#" id="logout-link">Desconectar</a>
                </div>
            `;
            userArea.style.display = 'block';
            console.log("Actualización del área de usuario completada."); // Depuración

            document.getElementById('logout-link').addEventListener('click', () => {
                document.cookie = 'authenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                location.reload();
            });

            // Añadir evento de click al enlace de backup
            document.getElementById('backup-link').addEventListener('click', (event) => {
                event.preventDefault();
                backupController.view.init();
            });
        } else {
            console.error("Elemento 'user-area' no encontrado."); // Depuración
        }
    } else {
        console.error("Nombre de usuario no encontrado en la cookie."); // Depuración
    }
}



// Inicialización de la aplicación
async function initializeApp() {
    //console.log("Inicializando aplicación...");
    const manager = RestaurantsManager.getInstance(); // Obtener la instancia singleton una vez

    // Inicializa dishController primero
    dishController = new DishController(manager);  // Inicialización de dishController

    // Luego inicializa dishFormController con los parámetros correctos
    const dishFormController = new DishFormController(manager, dishController);  // Inicialización después de dishController

    const categoryController = new CategoryController(manager, dishController);
    const allergenController = new AllergenController(manager, dishController);
    const menuController = new MenuController(manager, dishController);
    const restaurantController = new RestaurantController(manager);
    const categoryFormController = new CategoryFormController(manager, categoryController);
    const categoryFormView = new CategoryFormView(categoryFormController);
    const restaurantFormController = new RestaurantFormController(manager, restaurantController); 
    const restaurantFormView = new RestaurantFormView(restaurantFormController);

    // Inicializar BackupController
    const backupController = new BackupController(manager); 

    //console.log("Controllers initialized:", { dishController, categoryController, allergenController, menuController, dishFormController, restaurantController, categoryFormController, restaurantFormController });

    // Añadir justo después de la inicialización de dishController
    const dishes = manager.dishesIterator; // Obtener todos los platos
    dishController.view.renderDishes(dishes); // Renderizar platos

    async function fetchInitialData() {
        const response = await fetch('data/initialData.json'); // Ajusta la ruta al archivo JSON
        const data = await response.json();
        return data;
    }
    
    async function createInitialObjects() {
        //console.log("Creating initial objects...");
        const data = await fetchInitialData();
    
        const categories = data.categories.map(c => new Category(c.name, c.description));
        const dishes = data.dishes.map(d => new Dish(d.name, d.description, d.ingredients, d.image));
        const allergens = data.allergens.map(a => new Allergen(a.name, a.description));
        const menus = data.menus.map(m => new Menu(m.name, m.description));
        const restaurants = data.restaurants.map(r => new Restaurant(r.name, r.description, new Coordinate(r.coordinate.latitude, r.coordinate.longitude)));
    
        // Adding initial categories
        //console.log("Adding initial categories...");
        categories.forEach(category => manager.addCategory(category));
        //console.log("Added categories:", manager.categories);
    
        // Adding initial dishes
        //console.log("Adding initial dishes...");
        dishes.forEach(dish => manager.addDish(dish));
        //console.log("Added dishes:", manager.dishes);
    
        // Assigning dishes to categories
        //console.log("Assigning dishes to categories...");
        data.categories.forEach(categoryData => {
            const category = manager.findCategoryByName(categoryData.name);
            if (category) {
                categoryData.dishes.forEach(dishName => {
                    const dish = manager.findDishByName(dishName);
                    if (dish) {
                        manager.assignCategoryToDish(category, dish);
                    }
                });
            }
        });
    
        // Adding initial allergens
        //console.log("Adding initial allergens...");
        allergens.forEach(allergen => manager.addAllergen(allergen));
    
        // Adding initial menus
        //console.log("Adding initial menus...");
        menus.forEach(menu => manager.addMenu(menu));
    
        // Assigning dishes to menus
        //console.log("Assigning dishes to menus...");
        data.menus.forEach(menuData => {
            const menu = manager.findMenuByName(menuData.name);
            if (menu) {
                menuData.dishes.forEach(dishName => {
                    const dish = manager.findDishByName(dishName);
                    if (dish) {
                        manager.assignDishToMenu(dish, menu);
                    }
                });
            }
        });
    
        // Adding initial restaurants
        //console.log("Adding initial restaurants...");
        restaurants.forEach(restaurant => manager.addRestaurant(restaurant));
    }
    
    

    function loadCategoriesIntoMenu() {
        const categoryMenu = document.getElementById('category-menu');
        const categories = manager.categoriesIterator;
        categoryMenu.innerHTML = '';
        
        const createCategoryLink = document.createElement('a');
        createCategoryLink.className = 'navbar-item';
        createCategoryLink.textContent = 'Crear o eliminar categorías';
        createCategoryLink.href = '#';
        createCategoryLink.onclick = () => {
            categoryFormView.showCreateCategoryModal();
        };
        categoryMenu.appendChild(createCategoryLink);
        
        for (const category of categories) {
            const categoryLink = document.createElement('a');
            categoryLink.className = 'navbar-item';
            categoryLink.textContent = category.name;
            categoryLink.href = '#';
            categoryLink.onclick = () => {
                categoryController.showCategoryDetails(category.name);
            };
            categoryMenu.appendChild(categoryLink);
        }
    }

    function showRandomDishes() {
        const mainContent = document.getElementById('main-content');
        const existingRandomDishesSection = mainContent.querySelector('.random-dishes');
    
        if (existingRandomDishesSection) {
            existingRandomDishesSection.remove();
        }
    
        const randomDishesSection = document.createElement('div');
        randomDishesSection.className = 'random-dishes section';
        const title = document.createElement('h2');
        title.className = 'title';
        title.textContent = 'Platos Aleatorios';
        randomDishesSection.appendChild(title);
    
        const grid = document.createElement('div');
        grid.className = 'columns is-multiline';
    
        const dishes = Array.from(manager.dishes.values());
        const randomDishes = [];
        while (randomDishes.length < 3 && dishes.length > 0) {
            const randomIndex = Math.floor(Math.random() * dishes.length);
            randomDishes.push(dishes.splice(randomIndex, 1)[0]);
        }
    
        randomDishes.forEach(dish => {
            const column = document.createElement('div');
            column.className = 'column is-one-third';
    
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => {
                dishController.showDishDetails(dish.name);
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

    function setupHomeLink() {
        const homeLink = document.getElementById('home-link');
        homeLink.onclick = event => {
            event.preventDefault();
            categoryController.showAllCategories();
            CategoryView.updateBreadcrumb([{ name: 'Inicio', link: '#' }]);
            showRandomDishes();
        };

        const breadcrumbHome = document.getElementById('breadcrumb-home');
        breadcrumbHome.onclick = event => {
            event.preventDefault();
            categoryController.showAllCategories();
            CategoryView.updateBreadcrumb([{ name: 'Inicio', link: '#' }]);
            showRandomDishes();
        };
    }

    function attachCategoryFormListeners() {
        const createCategoryButton = document.getElementById('create-category-button');
        function loadCategoryFormModal() {
            categoryFormView.showCreateCategoryModal();
        }
        if (createCategoryButton) {
            createCategoryButton.removeEventListener('click', loadCategoryFormModal);
            createCategoryButton.addEventListener('click', loadCategoryFormModal);
        }

        if (!window.categoryFormModalInitialized) {
            initializeFormModal(
                'create-category-modal',
                'category-form',
                'create-category-button',
                ['close-category-modal-button', 'cancel-category-modal-button'],
                'save-category-button',
                categoryFormController
            );
            window.categoryFormModalInitialized = true;
        }
    }

    function loadMenuOptions() {
        const allergensLink = document.getElementById('allergens-link');
        allergensLink.onclick = event => {
            event.preventDefault();
            allergenController.showAllAllergens();
        };
    
        const menusLink = document.getElementById('menus-link');
        menusLink.onclick = event => {
            event.preventDefault();
            menuController.showAllMenus();
        };
    
        const categoriesLink = document.getElementById('categories-link');
        categoriesLink.onclick = event => {
            event.preventDefault();
            categoryController.showAllCategories();
        };
    
        const restaurantsLink = document.getElementById('restaurants-link');
        restaurantsLink.onclick = event => {
            event.preventDefault();
            restaurantController.showAllRestaurants();
        };
    
        const restaurantMenu = document.getElementById('restaurant-menu');
        const restaurants = manager.restaurantsIterator;
        restaurantMenu.innerHTML = '';
    
        // Add the "Create New Restaurant" option
        const createRestaurantLink = document.createElement('a');
        createRestaurantLink.className = 'navbar-item';
        createRestaurantLink.textContent = 'Crear o eliminar restaurante';
        createRestaurantLink.href = '#';
        createRestaurantLink.onclick = () => {
            restaurantFormView.showCreateRestaurantModal();
        };
        restaurantMenu.appendChild(createRestaurantLink);
    
        for (const restaurant of restaurants) {
            const restaurantLink = document.createElement('a');
            restaurantLink.className = 'navbar-item';
            restaurantLink.textContent = restaurant.name;
            restaurantLink.href = '#';
            restaurantLink.onclick = () => {
                restaurantController.showRestaurantDetails(restaurant.name);
            };
            restaurantMenu.appendChild(restaurantLink);
        }
    
        const categoryMenu = document.getElementById('category-menu');
        const categories = manager.categoriesIterator;
        categoryMenu.innerHTML = '';
    
        // Add the "Create or delete categories" option
        const createCategoryLink = document.createElement('a');
        createCategoryLink.className = 'navbar-item';
        createCategoryLink.textContent = 'Crear o eliminar categorías';
        createCategoryLink.href = '#';
        createCategoryLink.onclick = () => {
            categoryFormView.showCreateCategoryModal();
        };
        categoryMenu.appendChild(createCategoryLink);
    
        for (const category of categories) {
            const categoryLink = document.createElement('a');
            categoryLink.className = 'navbar-item';
            categoryLink.textContent = category.name;
            categoryLink.href = '#';
            categoryLink.onclick = () => {
                categoryController.showCategoryDetails(category.name);
            };
            categoryMenu.appendChild(categoryLink);
        }
    
        const menusDropdown = document.getElementById('menus-dropdown');
        const menus = manager.menusIterator;
        menusDropdown.innerHTML = '';
    
        // Add the "Manage Menus" option
        const manageMenusLink = document.createElement('a');
        manageMenusLink.className = 'navbar-item';
        manageMenusLink.textContent = 'Gestionar Menús';
        manageMenusLink.href = '#';
        manageMenusLink.onclick = () => {
            menuController.showManageMenus();
        };
        menusDropdown.appendChild(manageMenusLink);
    
        for (const menu of menus) {
            const menuLink = document.createElement('a');
            menuLink.className = 'navbar-item';
            menuLink.textContent = menu.name;
            menuLink.href = '#';
            menuLink.onclick = () => {
                menuController.showMenuDetails(menu.name);
            };
            menusDropdown.appendChild(menuLink);
        }
    
        const manageMenusSaveButton = document.getElementById('manage-menus-save-button');
        if (manageMenusSaveButton) {
            manageMenusSaveButton.onclick = () => {
                menuController.saveManageMenus();
            };
        }
    
        // Agregar la opción de Backup en el menú de administración
        const backupLink = document.getElementById('backup-link');
        backupLink.onclick = () => {
            backupController.view.init();
        };
    }
    
    
    function attachRestaurantFormListeners() {
        const createRestaurantButton = document.getElementById('create-restaurant-button');
        function loadRestaurantFormModal() {
            restaurantFormView.showCreateRestaurantModal();
        }
        if (createRestaurantButton) {
            createRestaurantButton.removeEventListener('click', loadRestaurantFormModal);
            createRestaurantButton.addEventListener('click', loadRestaurantFormModal);
        }
    
        if (!window.restaurantFormModalInitialized) {
            initializeFormModal(
                'create-restaurant-modal',
                'restaurant-form',
                'create-restaurant-button',
                ['close-restaurant-modal-button', 'cancel-restaurant-modal-button'],
                'save-restaurant-button',
                restaurantFormController
            );
            window.restaurantFormModalInitialized = true;
        }
    }
    
    // call functions to load
await createInitialObjects(); // Esperar a que los objetos iniciales se creen
loadCategoriesIntoMenu();
setupHomeLink();
loadMenuOptions();
attachRestaurantFormListeners();
categoryController.showAllCategories();
CategoryView.updateBreadcrumb([{ name: 'Inicio', link: '#' }]);
showRandomDishes();
showUsernameInMenu();

const createDishButton = document.getElementById('create-dish-button');
function loadFormModal() {
    dishController.view.loadCategories();
    dishController.view.loadAllergens();
}
createDishButton.removeEventListener('click', loadFormModal);
createDishButton.addEventListener('click', loadFormModal);

if (!window.formModalInitialized) {
    initializeFormModal(
        'create-dish-modal',
        'dish-form',
        'create-dish-button',
        ['close-modal-button', 'cancel-modal-button'],
        'save-dish-button',
        dishFormController // Pasar dishFormController aquí
    );
    window.formModalInitialized = true;
}

const manageMenusButton = document.getElementById('manage-menus-button');
if (manageMenusButton) {
    manageMenusButton.onclick = () => {
        menuController.showManageMenus();
    };
}

const manageMenusModalBackground = document.getElementById('manage-menus-modal-background');
if (manageMenusModalBackground) {
    manageMenusModalBackground.onclick = () => {
        document.getElementById('manage-menus-modal').classList.remove('is-active');
    };
}

const closeManageMenusButton = document.getElementById('manage-menus-close-button');
if (closeManageMenusButton) {
    closeManageMenusButton.onclick = () => {
        document.getElementById('manage-menus-modal').classList.remove('is-active');
    };
}

attachCategoryFormListeners();
attachRestaurantFormListeners();
}

// Evento DOMContentLoaded para inicializar la aplicación o cargar la vista de login
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM content loaded...");
    if (!isAuthenticated()) {
        loadLoginView();
    } else {
        initializeApp().then(() => {
            // Añadir evento al enlace de favoritos
            const favoritesLink = document.getElementById('favorites-link');
            if (favoritesLink) {
                favoritesLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    dishController.view.renderFavoriteDishes();
                });
            }

            // Añadir evento al enlace de backup
            const backupLink = document.getElementById('backup-link');
            if (backupLink) {
                backupLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    backupController.view.init(); // Mostrar la vista de backup
                });
            }

            // Añadir evento al botón de crear nuevo plato
            const createDishLink = document.getElementById('create-dish-link');
            if (createDishLink) {
                createDishLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    dishController.view.loadCategories();
                    dishController.view.loadAllergens();
                    const createDishModal = document.getElementById('create-dish-modal');
                    if (createDishModal) {
                        createDishModal.classList.add('is-active');
                    }
                });
            }
        });
    }
});


