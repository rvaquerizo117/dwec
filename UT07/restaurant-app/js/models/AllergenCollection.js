import Allergen from './Allergen.js';

class AllergenCollection {
    constructor() {
        this.allergens = new Map();
    }

    add(allergen) {
        if (!allergen || !(allergen instanceof Allergen)) {
            throw new Error("Invalid or missing Allergen object.");
        }
        if (this.allergens.has(allergen.name)) {
            throw new Error("Allergen already exists.");
        }
        this.allergens.set(allergen.name, allergen);
    }

    remove(allergen) {
        if (!allergen || !this.allergens.delete(allergen.name)) {
            throw new Error("Allergen not found.");
        }
    }

    get(name) {
        return this.allergens.get(name) || null;
    }

    getAll() {
        return Array.from(this.allergens.values());
    }
}

export default AllergenCollection;
