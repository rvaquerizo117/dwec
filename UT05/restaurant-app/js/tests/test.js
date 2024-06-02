const manager = RestaurantsManager.getInstance();

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

function testAddCategory() {
    console.log("Testing AddCategory...");
    manager.reset();
    const category = new Category("Starters", "Appetizers and starters");
    manager.addCategory(category);
    assert(manager.categories.has("Starters"), "AddCategory failed to add the category.");
    console.log("AddCategory Passed!");
}

function testAddDuplicateCategory() {
    console.log("Testing AddDuplicateCategory...");
    manager.reset();
    const category = new Category("Starters", "Appetizers and starters");
    try {
        manager.addCategory(category);
        manager.addCategory(category);
        assert(false, "Should have thrown an error for adding a duplicate category");
    } catch (error) {
        assert(error.message === "Category already exists.", "Expected 'Category already exists.' error");
    }
    console.log("AddDuplicateCategory Passed!");
}

function testRemoveCategory() {
    console.log("Testing RemoveCategory...");
    manager.reset();
    const category = new Category("Starters", "Appetizers and starters");
    manager.addCategory(category);
    manager.removeCategory(category);
    assert(!manager.categories.has("Starters"), "RemoveCategory failed to remove the category.");
    console.log("RemoveCategory Passed!");
}

function testAddDish() {
    console.log("Testing AddDish...");
    manager.reset();
    const dish = new Dish("Pasta", "Italian Pasta", ["Pasta", "Tomato"], "images/pasta.jpg");
    manager.addDish(dish);
    assert(manager.dishes.has("Pasta"), "AddDish failed to add the dish.");
    console.log("AddDish Passed!");
}

function testRemoveDish() {
    console.log("Testing RemoveDish...");
    manager.reset();
    const dish = new Dish("Pasta", "Italian Pasta", ["Pasta", "Tomato"], "images/pasta.jpg");
    manager.addDish(dish);
    manager.removeDish(dish);
    assert(!manager.dishes.has("Pasta"), "RemoveDish failed to remove the dish.");
    console.log("RemoveDish Passed!");
}

function testAssignCategoryToDish() {
    console.log("Testing AssignCategoryToDish...");
    manager.reset();
    const category = new Category("Main Course", "Main course dishes");
    const dish = new Dish("Steak", "Grilled Steak", ["Beef", "Salt"], "images/steak.jpg");
    manager.addCategory(category);
    manager.addDish(dish);
    manager.assignCategoryToDish(category, dish);
    const storedDish = manager.dishes.get("Steak");
    assert(storedDish.categories.has(category), "AssignCategoryToDish failed to assign the category to the dish.");
    console.log("AssignCategoryToDish Passed!");
}

function testDeassignCategoryToDish() {
    console.log("Testing DeassignCategoryToDish...");
    manager.reset();
    const category = new Category("Main Course", "Main course dishes");
    const dish = new Dish("Steak", "Grilled Steak", ["Beef", "Salt"], "images/steak.jpg");
    manager.addCategory(category);
    manager.addDish(dish);
    manager.assignCategoryToDish(category, dish);
    manager.deassignCategoryToDish(category, dish);
    const storedDish = manager.dishes.get("Steak");
    assert(!storedDish.categories.has(category), "DeassignCategoryToDish failed to remove the category from the dish.");
    console.log("DeassignCategoryToDish Passed!");
}

function testAssignAllergenToDish() {
    console.log("Testing AssignAllergenToDish...");
    manager.reset();
    const allergen = new Allergen("Peanuts", "Peanut allergy");
    const dish = new Dish("Salad", "Green Salad", ["Lettuce", "Tomato"], "images/salad.jpg");
    manager.addAllergen(allergen);
    manager.addDish(dish);
    manager.assignAllergenToDish(allergen, dish);
    const storedDish = manager.dishes.get("Salad");
    assert(storedDish.allergens.has(allergen), "AssignAllergenToDish failed to assign the allergen to the dish.");
    console.log("AssignAllergenToDish Passed!");
}

function testDeassignAllergenToDish() {
    console.log("Testing DeassignAllergenToDish...");
    manager.reset();
    const allergen = new Allergen("Peanuts", "Peanut allergy");
    const dish = new Dish("Salad", "Green Salad", ["Lettuce", "Tomato"], "images/salad.jpg");
    manager.addAllergen(allergen);
    manager.addDish(dish);
    manager.assignAllergenToDish(allergen, dish);
    manager.deassignAllergenToDish(allergen, dish);
    const storedDish = manager.dishes.get("Salad");
    assert(!storedDish.allergens.has(allergen), "DeassignAllergenToDish failed to remove the allergen from the dish.");
    console.log("DeassignAllergenToDish Passed!");
}

function testAssignDishToMenu() {
    console.log("Testing AssignDishToMenu...");
    manager.reset();
    const menu = new Menu("Lunch", "Lunch Menu");
    const dish = new Dish("Salad", "Green Salad", ["Lettuce", "Tomato"], "images/salad.jpg");
    manager.addMenu(menu);
    manager.addDish(dish);
    manager.assignDishToMenu(dish, menu);
    const storedMenu = manager.menus.get("Lunch");
    assert(storedMenu.dishes.has(dish), "AssignDishToMenu failed to assign the dish to the menu.");
    console.log("AssignDishToMenu Passed!");
}

function testDeassignDishToMenu() {
    console.log("Testing DeassignDishToMenu...");
    manager.reset();
    const menu = new Menu("Lunch", "Lunch Menu");
    const dish = new Dish("Salad", "Green Salad", ["Lettuce", "Tomato"], "images/salad.jpg");
    manager.addMenu(menu);
    manager.addDish(dish);
    manager.assignDishToMenu(dish, menu);
    manager.deassignDishToMenu(dish, menu);
    const storedMenu = manager.menus.get("Lunch");
    assert(!storedMenu.dishes.has(dish), "DeassignDishToMenu failed to remove the dish from the menu.");
    console.log("DeassignDishToMenu Passed!");
}

function testChangeDishPositions() {
    console.log("Testing ChangeDishPositions...");
    manager.reset();
    const menu = new Menu("Lunch", "Lunch Menu");
    const dish1 = new Dish("Salad", "Green Salad", ["Lettuce", "Tomato"], "images/salad.jpg");
    const dish2 = new Dish("Pasta", "Italian Pasta", ["Pasta", "Tomato"], "images/pasta.jpg");
    manager.addMenu(menu);
    manager.addDish(dish1);
    manager.addDish(dish2);
    manager.assignDishToMenu(dish1, menu);
    manager.assignDishToMenu(dish2, menu);
    menu.changeDishPositions(dish1, dish2);
    const dishesArray = Array.from(menu.dishes);
    assert(dishesArray[0] === dish2 && dishesArray[1] === dish1, "ChangeDishPositions failed to swap the dishes.");
    console.log("ChangeDishPositions Passed!");
}

function testFindMethods() {
    console.log("Testing Find Methods...");
    manager.reset();
    const category = new Category("Starters", "Appetizers and starters");
    const dish = new Dish("Pasta", "Italian Pasta", ["Pasta", "Tomato"], "images/pasta.jpg");
    const allergen = new Allergen("Peanuts", "Peanut allergy");
    const menu = new Menu("Lunch", "Lunch Menu");
    const restaurant = new Restaurant("Test Restaurant", "A test restaurant", new Coordinate(10, 10));

    manager.addCategory(category);
    manager.addDish(dish);
    manager.addAllergen(allergen);
    manager.addMenu(menu);
    manager.addRestaurant(restaurant);

    assert(manager.findCategoryByName("Starters") === category, "FindCategoryByName failed");
    assert(manager.findDishByName("Pasta") === dish, "FindDishByName failed");
    assert(manager.findAllergenByName("Peanuts") === allergen, "FindAllergenByName failed");
    assert(manager.findMenuByName("Lunch") === menu, "FindMenuByName failed");
    assert(manager.findRestaurantByName("Test Restaurant") === restaurant, "FindRestaurantByName failed");

    console.log("Find Methods Passed!");
}

function testRelationships() {
    console.log("Testing Relationships...");
    manager.reset();
    const category1 = new Category("Starters", "Appetizers and starters");
    const category2 = new Category("Main Course", "Main course dishes");
    const category3 = new Category("Desserts", "Sweet desserts");

    manager.addCategory(category1);
    manager.addCategory(category2);
    manager.addCategory(category3);

    const dish1 = new Dish("Pasta", "Italian Pasta", ["Pasta", "Tomato"], "images/pasta.jpg");
    const dish2 = new Dish("Salad", "Green Salad", ["Lettuce", "Tomato"], "images/salad.jpg");
    const dish3 = new Dish("Steak", "Grilled Steak", ["Beef", "Salt"], "images/steak.jpg");
    const dish4 = new Dish("Ice Cream", "Vanilla Ice Cream", ["Milk", "Sugar"], "images/icecream.jpg");
    const dish5 = new Dish("Soup", "Tomato Soup", ["Tomato", "Basil"], "images/soup.jpg");
    const dish6 = new Dish("Burger", "Beef Burger", ["Beef", "Bun", "Lettuce"], "images/burger.jpg");
    const dish7 = new Dish("Cake", "Chocolate Cake", ["Flour", "Sugar", "Cocoa"], "images/cake.jpg");
    const dish8 = new Dish("Sandwich", "Ham Sandwich", ["Ham", "Bread", "Cheese"], "images/sandwich.jpg");
    const dish9 = new Dish("Pizza", "Margherita Pizza", ["Dough", "Tomato", "Cheese"], "images/pizza.jpg");
    const dish10 = new Dish("Fish", "Grilled Fish", ["Fish", "Lemon"], "images/fish.jpg");
    const dish11 = new Dish("Pancakes", "Blueberry Pancakes", ["Flour", "Milk", "Blueberries"], "images/pancakes.jpg");
    const dish12 = new Dish("Salmon", "Baked Salmon", ["Salmon", "Garlic"], "images/salmon.jpg");

    manager.addDish(dish1);
    manager.addDish(dish2);
    manager.addDish(dish3);
    manager.addDish(dish4);
    manager.addDish(dish5);
    manager.addDish(dish6);
    manager.addDish(dish7);
    manager.addDish(dish8);
    manager.addDish(dish9);
    manager.addDish(dish10);
    manager.addDish(dish11);
    manager.addDish(dish12);

    manager.assignCategoryToDish(category1, dish1);
    manager.assignCategoryToDish(category1, dish2);
    manager.assignCategoryToDish(category1, dish5);
    manager.assignCategoryToDish(category1, dish8);
    manager.assignCategoryToDish(category2, dish3);
    manager.assignCategoryToDish(category2, dish6);
    manager.assignCategoryToDish(category2, dish9);
    manager.assignCategoryToDish(category2, dish10);
    manager.assignCategoryToDish(category3, dish4);
    manager.assignCategoryToDish(category3, dish7);
    manager.assignCategoryToDish(category3, dish11);
    manager.assignCategoryToDish(category3, dish12);

    assert(dish1.categories.has(category1), "Dish 1 should be in Category 1");
    assert(dish2.categories.has(category1), "Dish 2 should be in Category 1");
    assert(dish5.categories.has(category1), "Dish 5 should be in Category 1");
    assert(dish8.categories.has(category1), "Dish 8 should be in Category 1");
    assert(dish3.categories.has(category2), "Dish 3 should be in Category 2");
    assert(dish6.categories.has(category2), "Dish 6 should be in Category 2");
    assert(dish9.categories.has(category2), "Dish 9 should be in Category 2");
    assert(dish10.categories.has(category2), "Dish 10 should be in Category 2");
    assert(dish4.categories.has(category3), "Dish 4 should be in Category 3");
    assert(dish7.categories.has(category3), "Dish 7 should be in Category 3");
    assert(dish11.categories.has(category3), "Dish 11 should be in Category 3");
    assert(dish12.categories.has(category3), "Dish 12 should be in Category 3");

    const menu1 = new Menu("Lunch", "Lunch Menu");
    const menu2 = new Menu("Dinner", "Dinner Menu");
    const menu3 = new Menu("Kids", "Kids Menu");

    manager.addMenu(menu1);
    manager.addMenu(menu2);
    manager.addMenu(menu3);

    manager.assignDishToMenu(dish1, menu1);
    manager.assignDishToMenu(dish2, menu1);
    manager.assignDishToMenu(dish3, menu1);
    manager.assignDishToMenu(dish4, menu2);
    manager.assignDishToMenu(dish5, menu2);
    manager.assignDishToMenu(dish6, menu2);
    manager.assignDishToMenu(dish7, menu3);
    manager.assignDishToMenu(dish8, menu3);
    manager.assignDishToMenu(dish9, menu3);

    assert(menu1.dishes.has(dish1), "Menu 1 should have Dish 1");
    assert(menu1.dishes.has(dish2), "Menu 1 should have Dish 2");
    assert(menu1.dishes.has(dish3), "Menu 1 should have Dish 3");
    assert(menu2.dishes.has(dish4), "Menu 2 should have Dish 4");
    assert(menu2.dishes.has(dish5), "Menu 2 should have Dish 5");
    assert(menu2.dishes.has(dish6), "Menu 2 should have Dish 6");
    assert(menu3.dishes.has(dish7), "Menu 3 should have Dish 7");
    assert(menu3.dishes.has(dish8), "Menu 3 should have Dish 8");
    assert(menu3.dishes.has(dish9), "Menu 3 should have Dish 9");

    const allergen1 = new Allergen("Peanuts", "Peanut allergy");
    const allergen2 = new Allergen("Dairy", "Dairy allergy");
    const allergen3 = new Allergen("Gluten", "Gluten allergy");

    manager.addAllergen(allergen1);
    manager.addAllergen(allergen2);
    manager.addAllergen(allergen3);

    manager.assignAllergenToDish(allergen1, dish1);
    manager.assignAllergenToDish(allergen1, dish2);
    manager.assignAllergenToDish(allergen2, dish4);
    manager.assignAllergenToDish(allergen2, dish7);
    manager.assignAllergenToDish(allergen3, dish9);
    manager.assignAllergenToDish(allergen3, dish11);

    assert(dish1.allergens.has(allergen1), "Dish 1 should have Allergen 1");
    assert(dish2.allergens.has(allergen1), "Dish 2 should have Allergen 1");
    assert(dish4.allergens.has(allergen2), "Dish 4 should have Allergen 2");
    assert(dish7.allergens.has(allergen2), "Dish 7 should have Allergen 2");
    assert(dish9.allergens.has(allergen3), "Dish 9 should have Allergen 3");
    assert(dish11.allergens.has(allergen3), "Dish 11 should have Allergen 3");

    console.log("Relationships Passed!");
}

// Run all tests
function runAllTests() {
    console.log("Starting All Unit Tests...");
    testAddCategory();
    testAddDuplicateCategory();
    testRemoveCategory();
    testAddDish();
    testRemoveDish();
    testAssignCategoryToDish();
    testDeassignCategoryToDish();
    testAssignAllergenToDish();
    testDeassignAllergenToDish();
    testAssignDishToMenu();
    testDeassignDishToMenu();
    testChangeDishPositions();
    testFindMethods();
    testRelationships();
    console.log("All Unit Tests Completed.");
}

runAllTests();
