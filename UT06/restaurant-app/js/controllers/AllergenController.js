import Allergen from '../models/Allergen.js';
import AllergenView from '../views/AllergenView.js';

class AllergenController {
    constructor(manager, dishController) {
        this.restaurantsManager = manager;
        this.view = new AllergenView(this);
        this.dishController = dishController;
    }

    addAllergen(name, description) {
        try {
            const allergen = new Allergen(name, description);
            this.restaurantsManager.addAllergen(allergen);
            this.view.renderAllergens([allergen]);
        } catch (error) {
            console.error("Error adding allergen:", error.message);
            this.view.renderError(error.message);
        }
    }

    removeAllergen(name) {
        try {
            const allergen = this.restaurantsManager.findAllergenByName(name);
            this.restaurantsManager.removeAllergen(allergen);
            this.view.removeAllergen(allergen);
        } catch (error) {
            console.error("Error removing allergen:", error.message);
            this.view.renderError(error.message);
        }
    }

    showAllAllergens() {
        try {
            const allergens = this.restaurantsManager.allergensIterator;
            this.view.renderAllergens(allergens);
            AllergenView.updateBreadcrumb([{ name: 'Inicio', link: '#' }, { name: 'Alérgenos', link: '#' }]);
        } catch (error) {
            console.error("Error showing all allergens:", error.message);
            this.view.renderError(error.message);
        }
    }

    showAllergenDetails(name) {
        try {
            const allergen = this.restaurantsManager.findAllergenByName(name);
            this.view.renderAllergenDetails(allergen);
            AllergenView.updateBreadcrumb([{ name: 'Inicio', link: '#' }, { name: 'Alérgenos', link: '#' }, { name: allergen.name, link: '#' }]);
        } catch (error) {
            console.error("Error showing allergen details:", error.message);
            this.view.renderError(error.message);
        }
    }

    showDishDetails(name) {
        this.dishController.showDishDetails(name);
    }
}

export default AllergenController;
