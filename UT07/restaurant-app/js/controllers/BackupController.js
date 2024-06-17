// js/controllers/BackupController.js
import AdminBackupView from '../views/AdminBackupView.js';

class BackupController {
    constructor(manager) {
        this.manager = manager;
        this.view = new AdminBackupView(this);
        window.backupController = this; // Hacer backupController disponible globalmente
    }

    async generateBackup() {
        try {
            console.log('Iniciando generación de backup');
            const data = {
                categories: Array.from(this.manager.categories.values()),
                dishes: Array.from(this.manager.dishes.values()),
                allergens: Array.from(this.manager.allergens.values()),
                menus: Array.from(this.manager.menus.values()),
                restaurants: Array.from(this.manager.restaurants.values()),
                changeHistory: this.manager.changeHistory // Añadir esta línea
            };
            console.log('Datos a enviar:', data);
            const response = await fetch('writeJSONBackup.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ jsonObj: data })
            });
    
            console.log('Respuesta recibida:', response);
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.text();
            console.log('Resultado del backup:', result);
            this.view.showMessage(`Backup generado con éxito: ${result}`, 'is-success');
        } catch (error) {
            console.error('Error generando el backup:', error);
            this.view.showMessage('Error generando el backup', 'is-danger');
        }
    }
    
    
}

export default BackupController;
