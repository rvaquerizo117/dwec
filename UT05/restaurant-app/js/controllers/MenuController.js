class MenuController {
    static showAllMenus() {
        const menus = RestaurantsManager.getInstance().menus.values();
        menuView.renderMenus(menus);
        menuView.updateBreadcrumb([{ name: 'Inicio', link: '#' }, { name: 'Menús', link: '#' }]);
    }

    static showMenuDetails(menuName) {
        const menu = RestaurantsManager.getInstance().findMenuByName(menuName);
        if (menu) {
            menuView.renderMenuDetails(menu);
            dishView.renderDishes(menu.dishes); // Mostrar los platos del menú
            menuView.updateBreadcrumb([
                { name: 'Inicio', link: '#' },
                { name: 'Menús', link: '#' },
                { name: menu.name, link: '#' }
            ]);
        }
    }
}
