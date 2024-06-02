class AllergenController {
    static showAllAllergens() {
        const allergens = RestaurantsManager.getInstance().allergens.values();
        allergenView.renderAllergens(allergens);
        allergenView.updateBreadcrumb([{ name: 'Inicio', link: '#' }, { name: 'Alérgenos', link: '#' }]);
    }

    static showAllergenDetails(allergenName) {
        const allergen = RestaurantsManager.getInstance().findAllergenByName(allergenName);
        if (allergen) {
            allergenView.renderAllergenDetails(allergen);
            const dishes = RestaurantsManager.getInstance().dishes.values();
            const allergenDishes = Array.from(dishes).filter(dish => dish.allergens.has(allergen));
            dishView.renderDishes(allergenDishes); // Mostrar los platos que contienen este alérgeno
            allergenView.updateBreadcrumb([
                { name: 'Inicio', link: '#' },
                { name: 'Alérgenos', link: '#' },
                { name: allergen.name, link: '#' }
            ]);
        }
    }
}
