function initializeApp() {
    const manager = RestaurantsManager.getInstance();

    function createInitialObjects() {
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

        categories.forEach(category => manager.addCategory(category));
        dishes.forEach(dish => manager.addDish(dish));
        allergens.forEach(allergen => manager.addAllergen(allergen));
        menus.forEach(menu => manager.addMenu(menu));
        restaurants.forEach(restaurant => manager.addRestaurant(restaurant));

        // Asignar platos a categorías
        manager.assignCategoryToDish(categories[0], dishes[0]);
        manager.assignCategoryToDish(categories[0], dishes[1]);
        manager.assignCategoryToDish(categories[0], dishes[4]);
        manager.assignCategoryToDish(categories[0], dishes[7]);
        manager.assignCategoryToDish(categories[1], dishes[2]);
        manager.assignCategoryToDish(categories[1], dishes[5]);
        manager.assignCategoryToDish(categories[1], dishes[8]);
        manager.assignCategoryToDish(categories[1], dishes[9]);
        manager.assignCategoryToDish(categories[2], dishes[3]);
        manager.assignCategoryToDish(categories[2], dishes[6]);
        manager.assignCategoryToDish(categories[2], dishes[10]);
        manager.assignCategoryToDish(categories[2], dishes[11]);

        // Asignar platos a menús
        manager.assignDishToMenu(dishes[0], menus[0]);
        manager.assignDishToMenu(dishes[1], menus[0]);
        manager.assignDishToMenu(dishes[2], menus[0]);
        manager.assignDishToMenu(dishes[3], menus[1]);
        manager.assignDishToMenu(dishes[4], menus[1]);
        manager.assignDishToMenu(dishes[5], menus[1]);
        manager.assignDishToMenu(dishes[6], menus[2]);
        manager.assignDishToMenu(dishes[7], menus[2]);
        manager.assignDishToMenu(dishes[8], menus[2]);

        // Asignar alérgenos a platos
        manager.assignAllergenToDish(allergens[0], dishes[2]); // Peanuts to Steak
        manager.assignAllergenToDish(allergens[0], dishes[3]); // Peanuts to Ice Cream
        manager.assignAllergenToDish(allergens[1], dishes[6]); // Gluten to Cake
        manager.assignAllergenToDish(allergens[2], dishes[3]); // Lactose to Ice Cream
        manager.assignAllergenToDish(allergens[3], dishes[11]); // Shellfish to Salmon
    }

    function loadCategoriesIntoMenu() {
        const categoryMenu = document.getElementById('category-menu');
        const categories = manager.categoriesIterator;
        categoryMenu.innerHTML = ''; // Clear previous content
        for (const category of categories) {
            const categoryLink = document.createElement('a');
            categoryLink.className = 'navbar-item';
            categoryLink.textContent = category.name;
            categoryLink.href = '#';
            categoryLink.onclick = () => {
                CategoryController.showCategoryDetails(category.name);
            };
            categoryMenu.appendChild(categoryLink);
        }
    }

    function showRandomDishes() {
        const mainContent = document.getElementById('main-content');
        const existingRandomDishesSection = mainContent.querySelector('.random-dishes');

        // Delete existing section if already present
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
                DishController.showDishDetails(dish.name);
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
        homeLink.onclick = (event) => {
            event.preventDefault();
            CategoryController.showAllCategories();
            categoryView.updateBreadcrumb([{ name: 'Inicio', link: '#' }]);
            showRandomDishes(); // random dishes only on the inicio page
        };

        const breadcrumbHome = document.getElementById('breadcrumb-home');
        breadcrumbHome.onclick = (event) => {
            event.preventDefault();
            CategoryController.showAllCategories();
            categoryView.updateBreadcrumb([{ name: 'Inicio', link: '#' }]);
            showRandomDishes(); // random dishes only on the inicio page
        };
    }

    function loadMenuOptions() {
        const allergensLink = document.getElementById('allergens-link');
        allergensLink.onclick = (event) => {
            event.preventDefault();
            AllergenController.showAllAllergens();
        };

        const menusLink = document.getElementById('menus-link');
        menusLink.onclick = (event) => {
            event.preventDefault();
            MenuController.showAllMenus();
        };

        const restaurantMenu = document.getElementById('restaurant-menu');
        const restaurants = manager.restaurantsIterator;
        restaurantMenu.innerHTML = ''; // Clear content
        for (const restaurant of restaurants) {
            const restaurantLink = document.createElement('a');
            restaurantLink.className = 'navbar-item';
            restaurantLink.textContent = restaurant.name;
            restaurantLink.href = '#';
            restaurantLink.onclick = () => {
                RestaurantController.showRestaurantDetails(restaurant.name);
            };
            restaurantMenu.appendChild(restaurantLink);
        }
    }

    createInitialObjects();
    loadCategoriesIntoMenu();
    setupHomeLink();
    loadMenuOptions();
    CategoryController.showAllCategories();
    categoryView.updateBreadcrumb([{ name: 'Inicio', link: '#' }]);
    showRandomDishes(); // random dishes only on the inicio page
}

window.onload = initializeApp;
