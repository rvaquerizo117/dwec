// js/controllers/RestaurantController.js

//import RestaurantsManager from '../models/RestaurantsManager.js';
import RestaurantView from '../views/restaurantView.js';
import Restaurant from '../models/Restaurant.js';
import RestaurantFormView from '../views/RestaurantFormView.js';

class RestaurantController {
    constructor(manager) {
        this.restaurantsManager = manager;
        this.view = new RestaurantView(this);
        this.formView = new RestaurantFormView(this);
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
        if (!restaurant) {
            this.view.renderError('Restaurant not found.');
            return;
        }
        // Verificar que el restaurante tenga coordenadas válidas
        if (!restaurant.location || !restaurant.location.latitude || !restaurant.location.longitude) {
            this.view.renderError('Invalid restaurant coordinates.');
            return;
        }
        this.view.renderRestaurantDetails(restaurant);
        RestaurantView.updateBreadcrumb([
            { name: 'Inicio', link: '#' },
            { name: 'Restaurantes', link: '#' },
            { name: restaurant.name, link: '#' },
        ]);
    }
    

    showCreateRestaurantModal() {
        this.formView.showCreateRestaurantModal();
    }
}

export default RestaurantController;
