class DishController {
    static showAllDishes() {
        const dishes = RestaurantsManager.getInstance().dishes.values();
        dishView.renderDishes(dishes);
        categoryView.updateBreadcrumb([{ name: 'Inicio', link: '#' }]);
    }

    static showDishDetails(dishName) {
        const dish = RestaurantsManager.getInstance().findDishByName(dishName);
        if (dish) {
            dishView.renderDishDetails(dish);
            dishView.updateBreadcrumb([
                { name: 'Inicio', link: '#' },
                { name: 'Platos', link: '#' },
                { name: dish.name, link: '#' }
            ]);
        }
    }
}