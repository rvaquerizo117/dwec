import RestaurantView from '../views/RestaurantView.js';
import Restaurant from '../models/Restaurant.js';
import RestaurantFormView from '../views/RestaurantFormView.js';

class RestaurantController {
    constructor(manager) {
        this.restaurantsManager = manager;
        this.view = new RestaurantView(this);
        this.formView = new RestaurantFormView(this);
    }

    addRestaurant(name, description, location) {
        try {
            const restaurant = new Restaurant(name, description, location);
            this.restaurantsManager.addRestaurant(restaurant);
            this.view.renderRestaurants([restaurant]);
            this.view.updateRestaurantMenu(this.restaurantsManager.restaurantsIterator);
            RestaurantView.updateBreadcrumb([{ name: 'Inicio', link: '#' }, { name: 'Restaurantes', link: '#' }, { name: restaurant.name, link: '#' }]);
        } catch (error) {
            this.view.renderError(error.message);
        }
    }

    removeRestaurant(name) {
        try {
            const restaurant = this.restaurantsManager.findRestaurantByName(name);
            this.restaurantsManager.removeRestaurant(restaurant);
            this.view.removeRestaurant(restaurant);
            this.view.updateRestaurantMenu(this.restaurantsManager.restaurantsIterator);
            RestaurantView.updateBreadcrumb([{ name: 'Inicio', link: '#' }, { name: 'Restaurantes', link: '#' }]);
        } catch (error) {
            this.view.renderError(error.message);
        }
    }

    showAllRestaurants() {
        const restaurants = this.restaurantsManager.restaurantsIterator;
        this.view.renderRestaurants(restaurants);
        RestaurantView.updateBreadcrumb([{ name: 'Inicio', link: '#' }, { name: 'Restaurantes', link: '#' }]);
    }

    showRestaurantDetails(name) {
        const restaurant = this.restaurantsManager.findRestaurantByName(name);
        this.view.renderRestaurantDetails(restaurant);
        RestaurantView.updateBreadcrumb([{ name: 'Inicio', link: '#' }, { name: 'Restaurantes', link: '#' }, { name: restaurant.name, link: '#' }]);
    }

    showCreateRestaurantModal() {
        this.formView.showCreateRestaurantModal();
    }
}

export default RestaurantController;
