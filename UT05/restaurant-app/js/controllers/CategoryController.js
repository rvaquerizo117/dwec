class CategoryController {
    static showAllCategories() {
        const categories = RestaurantsManager.getInstance().categories.values();
        categoryView.renderCategories(categories);

        const randomDishes = RestaurantsManager.getInstance().getRandomDishes(3);
        dishView.renderRandomDishes(randomDishes);

        categoryView.updateBreadcrumb([{ name: 'Inicio', link: '#' }]);
    }

    static showCategoryDetails(categoryName) {
        const category = RestaurantsManager.getInstance().findCategoryByName(categoryName);
        if (category) {
            categoryView.renderCategoryDetails(category);
            dishView.renderDishes(category.dishes); // Mostrar los platos de la categoría
            categoryView.updateBreadcrumb([
                { name: 'Inicio', link: '#' },
                { name: 'Categorías', link: '#' },
                { name: category.name, link: '#' }
            ]);
        }
    }
}
