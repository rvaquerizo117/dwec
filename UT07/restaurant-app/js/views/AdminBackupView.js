// js/views/AdminBackupView.js

class AdminBackupView {
    constructor(controller) {
        this.controller = controller;
        this.init();
    }

    init() {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) {
            console.error("No se encontró el elemento 'main-content'");
            return;
        }
        mainContent.innerHTML = this.getBackupViewHTML();
        this.attachEventListeners();
        console.log("Vista de backup renderizada.");
    }

    getBackupViewHTML() {
        return `
            <div class="backup-container">
                <button id="generate-backup-button" class="button is-primary">Generar Backup</button>
                <div id="backup-message-container" class="message-container"></div>
            </div>
        `;
    }

    attachEventListeners() {
        document.getElementById('generate-backup-button').addEventListener('click', () => {
            this.controller.generateBackup();
        });
    }

    showMessage(message, type = 'is-info') {
        const messageContainer = document.getElementById('backup-message-container');
        messageContainer.innerHTML = `<div class="notification ${type}">${message}</div>`;
    }
}

export default AdminBackupView;
