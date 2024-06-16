import RestaurantsManager from './models/RestaurantsManager.js';
import Category from './models/Category.js';
import Dish from './models/Dish.js';
import Allergen from './models/Allergen.js';
import Menu from './models/Menu.js';
import Restaurant from './models/Restaurant.js';
import Coordinate from './models/Coordinate.js';
import CategoryController from './controllers/CategoryController.js';
import DishController from './controllers/DishController.js';
import AllergenController from './controllers/AllergenController.js';
import MenuController from './controllers/MenuController.js';
import RestaurantController from './controllers/RestaurantController.js';
import DishFormController from './controllers/DishFormController.js';
import CategoryFormController from './controllers/CategoryFormController.js';
import CategoryFormView from './views/CategoryFormView.js';
import CategoryView from './views/CategoryView.js';
import RestaurantFormController from './controllers/RestaurantFormController.js'; 
import RestaurantFormView from './views/RestaurantFormView.js'; 
import { initializeFormModal } from './controllers/FormController.js';

function initializeApp() {
    const manager = RestaurantsManager.getInstance(); // Obtener la instancia singleton una vez
    const dishController = new DishController(manager);
    const categoryController = new CategoryController(manager, dishController);
    const allergenController = new AllergenController(manager, dishController);
    const menuController = new MenuController(manager, dishController);
    const dishFormController = new DishFormController(manager, dishController);
    const restaurantController = new RestaurantController(manager);
    const categoryFormController = new CategoryFormController(manager, categoryController);
    const categoryFormView = new CategoryFormView(categoryFormController);
    const restaurantFormController = new RestaurantFormController(manager, restaurantController); 
    const restaurantFormView = new RestaurantFormView(restaurantFormController);


    function createInitialObjects() {
        console.log("Creating initial objects...");

        const categories = [
            new Category("Starters", "Appetizers and starters"),
            new Category("Main Course", "Main course dishes"),
            new Category("Desserts", "Sweet desserts")
        ];

        const dishes = [
            new Dish("Pasta", "Italian Pasta", ["Pasta", "Tomato"], "images/pasta.jpg"),
            new Dish("Salad", "Green Salad", ["Lettuce", "Tomato"], "images/salad.jpg"),
            new Dish("Steak", "Grilled Steak", ["Beef", "Salt"], "images/steak.jpg"),
            new Dish("Ice Cream", "Vanilla Ice Cream", ["Milk", "Sugar"], "images/icecream.jpg"),
            new Dish("Soup", "Tomato Soup", ["Tomato", "Basil"], "images/soup.jpg"),
            new Dish("Burger", "Beef Burger", ["Beef", "Bun", "Lettuce"], "images/burger.jpg"),
            new Dish("Cake", "Chocolate Cake", ["Flour", "Sugar", "Cocoa"], "images/cake.jpg"),
            new Dish("Sandwich", "Ham Sandwich", ["Ham", "Bread", "Cheese"], "images/sandwich.jpg"),
            new Dish("Pizza", "Margherita Pizza", ["Dough", "Tomato", "Cheese"], "images/pizza.jpg"),
            new Dish("Fish", "Grilled Fish", ["Fish", "Lemon"], "images/fish.jpg"),
            new Dish("Pancakes", "Blueberry Pancakes", ["Flour", "Milk", "Blueberries"], "images/pancakes.jpg"),
            new Dish("Salmon", "Baked Salmon", ["Salmon", "Garlic"], "images/salmon.jpg")
        ];

        const allergens = [
            new Allergen("Peanuts", "Peanut allergy"),
            new Allergen("Gluten", "Gluten allergy"),
            new Allergen("Lactose", "Lactose intolerance"),
            new Allergen("Shellfish", "Shellfish allergy")
        ];

        const menus = [
            new Menu("Lunch", "Lunch Menu"),
            new Menu("Dinner", "Dinner Menu"),
            new Menu("Kids", "Kids Menu")
        ];

        const restaurants = [
            new Restaurant("Test Restaurant 1", "Restaurant 1", new Coordinate(10, 10)),
            new Restaurant("Test Restaurant 2", "Restaurant 2", new Coordinate(20, 20)),
            new Restaurant("Test Restaurant 3", "Restaurant 3", new Coordinate(30, 30))
        ];

        console.log("Adding initial categories...");
        categories.forEach(category => manager.addCategory(category));
        console.log("Added categories:", manager.categories);

        console.log("Adding initial dishes...");
        dishes.forEach(dish => manager.addDish(dish));
        console.log("Added dishes:", manager.dishes);

        console.log("Adding initial allergens...");
        allergens.forEach(allergen => manager.addAllergen(allergen));

        console.log("Adding initial menus...");
        menus.forEach(menu => manager.addMenu(menu));

        console.log("Adding initial restaurants...");
        restaurants.forEach(restaurant => manager.addRestaurant(restaurant));

        console.log("Assigning dishes to categories...");
        try {
            categories.forEach(category => {
                const categoryName = category.name;
                dishes.forEach(dish => {
                    if (categoryName === "Starters" && ["Pasta", "Salad", "Soup", "Sandwich"].includes(dish.name)) {
                        manager.assignCategoryToDish(category, dish);
                    } else if (categoryName === "Main Course" && ["Steak", "Burger", "Pizza", "Fish"].includes(dish.name)) {
                        manager.assignCategoryToDish(category, dish);
                    } else if (categoryName === "Desserts" && ["Ice Cream", "Cake", "Pancakes", "Salmon"].includes(dish.name)) {
                        manager.assignCategoryToDish(category, dish);
                    }
                });
            });
        } catch (error) {
            console.error("Error assigning category to dish:", error);
        }

        console.log("Assigning dishes to menus...");
        manager.assignDishToMenu(dishes[0], menus[0]);
        manager.assignDishToMenu(dishes[1], menus[0]);
        manager.assignDishToMenu(dishes[2], menus[0]);
        manager.assignDishToMenu(dishes[3], menus[1]);
        manager.assignDishToMenu(dishes[4], menus[1]);
        manager.assignDishToMenu(dishes[5], menus[1]);
        manager.assignDishToMenu(dishes[6], menus[2]);
        manager.assignDishToMenu(dishes[7], menus[2]);
        manager.assignDishToMenu(dishes[8], menus[2]);

        console.log("Assigning allergens to dishes...");
        manager.assignAllergenToDish(allergens[0], dishes[2]); // Peanuts to Steak
        manager.assignAllergenToDish(allergens[0], dishes[3]); // Peanuts to Ice Cream
        manager.assignAllergenToDish(allergens[1], dishes[6]); // Gluten to Cake
        manager.assignAllergenToDish(allergens[2], dishes[3]); // Lactose to Ice Cream
        manager.assignAllergenToDish(allergens[3], dishes[11]); // Shellfish to Salmon
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
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        initializeApp();
    });
    

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
    

    createInitialObjects();
    loadCategoriesIntoMenu();
    setupHomeLink();
    loadMenuOptions();
    attachRestaurantFormListeners();
    categoryController.showAllCategories();
    CategoryView.updateBreadcrumb([{ name: 'Inicio', link: '#' }]);
    showRandomDishes();

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
            dishFormController
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

document.addEventListener('DOMContentLoaded', initializeApp);
