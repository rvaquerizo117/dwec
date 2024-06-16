import Restaurant from '../models/Restaurant.js';
import ToastUtility from '../utils/ToastUtility.js';

class RestaurantFormController {
    constructor(manager, restaurantController) {
        this.restaurantsManager = manager;
        this.restaurantController = restaurantController;
    }

    addRestaurant(name, description, location) {
        console.log(`Adding restaurant: ${name}, ${description}, ${location}`);

        const existingRestaurant = this.restaurantsManager.findRestaurantByName(name);
        if (existingRestaurant) {
            console.warn('Restaurant already exists:', name);
            throw new Error('El restaurante ya existe.');
        }

        try {
            const restaurant = new Restaurant(name, description, location);
            this.restaurantsManager.addRestaurant(restaurant);
            ToastUtility.showSuccess('Restaurante añadido con éxito');
            this.restaurantController.showAllRestaurants();
            this.restaurantController.view.updateRestaurantMenu(this.restaurantsManager.restaurantsIterator); // Asegura la actualización del menú
            console.log('Restaurant added and view updated');
            return restaurant;
        } catch (error) {
            console.error('Error adding restaurant:', error);
            ToastUtility.showError(`Error al agregar el restaurante: ${error.message}`);
            throw error;
        }
    }

    removeRestaurant(name) {
        try {
            const restaurant = this.restaurantsManager.findRestaurantByName(name);
            if (!restaurant) {
                throw new Error('El restaurante no existe.');
            }
            this.restaurantsManager.removeRestaurant(restaurant);
            ToastUtility.showSuccess('Restaurante eliminado con éxito');
            this.restaurantController.showAllRestaurants();
            this.restaurantController.view.updateRestaurantMenu(this.restaurantsManager.restaurantsIterator); // Asegura la actualización del menú
            console.log('Restaurant removed and view updated');
            return restaurant;
        } catch (error) {
            console.error('Error removing restaurant:', error);
            ToastUtility.showError(`Error al eliminar el restaurante: ${error.message}`);
            throw error;
        }
    }
}

export default RestaurantFormController;
