class RestaurantController {
    static showAllRestaurants() {
        const restaurants = RestaurantsManager.getInstance().restaurants.values();
        restaurantView.renderRestaurants(restaurants);
        restaurantView.updateBreadcrumb([{ name: 'Inicio', link: '#' }, { name: 'Restaurantes', link: '#' }]);
    }

    static showRestaurantDetails(restaurantName) {
        const restaurant = RestaurantsManager.getInstance().findRestaurantByName(restaurantName);
        if (restaurant) {
            restaurantView.renderRestaurantDetails(restaurant);
            restaurantView.updateBreadcrumb([
                { name: 'Inicio', link: '#' },
                { name: 'Restaurantes', link: '#' },
                { name: restaurant.name, link: '#' }
            ]);
        }
    }
}
