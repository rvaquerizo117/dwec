import Category from './Category.js';

class CategoryCollection {
    constructor() {
        this.categories = new Map();
    }

    add(category) {
        if (!category || !(category instanceof Category)) {
            throw new Error("Invalid or missing Category object.");
        }
        if (this.categories.has(category.name)) {
            throw new Error("Category already exists.");
        }
        this.categories.set(category.name, category);
    }

    remove(category) {
        if (!category || !this.categories.delete(category.name)) {
            throw new Error("Category not found.");
        }
    }

    get(name) {
        return this.categories.get(name) || null;
    }

    getAll() {
        return Array.from(this.categories.values());
    }

}

export default CategoryCollection;
