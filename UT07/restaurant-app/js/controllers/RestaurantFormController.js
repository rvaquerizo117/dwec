// js/controllers/RestaurantFormController.js

//import RestaurantsManager from '../models/RestaurantsManager.js';
import Restaurant from '../models/Restaurant.js';
import Coordinate from '../models/Coordinate.js';
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
            const [latitude, longitude] = location.split(',').map(coord => parseFloat(coord.trim()));
    
            if (isNaN(latitude) || isNaN(longitude)) {
                throw new Error('Ubicación en formato incorrecto. Asegúrese de que la entrada tenga el formato "lat,long".');
            }
    
            console.log(`Parsed coordinates: Latitude = ${latitude}, Longitude = ${longitude}`);
    
            const coordinate = new Coordinate(latitude, longitude);
            const restaurant = new Restaurant(name, description, coordinate);
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
}

export default RestaurantFormController;
