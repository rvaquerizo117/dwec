import Menu from './Menu.js';

class MenuCollection {
    constructor() {
        this.menus = new Map();
    }

    add(menu) {
        if (!menu || !(menu instanceof Menu)) {
            throw new Error("Invalid or missing Menu object.");
        }
        if (this.menus.has(menu.name)) {
            throw new Error("Menu already exists.");
        }
        this.menus.set(menu.name, menu);
    }

    remove(menu) {
        if (!menu || !this.menus.delete(menu.name)) {
            throw new Error("Menu not found.");
        }
    }

    get(name) {
        return this.menus.get(name) || null;
    }

    getAll() {
        return Array.from(this.menus.values());
    }
}

export default MenuCollection;
