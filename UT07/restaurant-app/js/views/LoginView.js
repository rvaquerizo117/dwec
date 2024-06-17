// js/views/LoginView.js

class LoginView {
    constructor(controller) {
        console.log("Inicializando LoginView...");
        this.controller = controller;
        this.init();
    }

    init() {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) {
            console.error("No se encontró el elemento 'main-content'");
            return;
        }
        mainContent.innerHTML = this.getLoginFormHTML();
        this.attachEventListeners();
        console.log("Vista de login renderizada.");
    }

    getLoginFormHTML() {
        return `
            <div class="login-container">
                <form id="login-form" class="box">
                    <h1 class="title">Iniciar Sesión</h1>
                    <div class="field">
                        <label class="label">Nombre de Usuario >> (admin)</label>
                        <div class="control">
                            <input class="input" type="text" id="username" required>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Contraseña >> (admin)</label>
                        <div class="control">
                            <input class="input" type="password" id="password" required>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button class="button is-primary" type="submit">Login</button>
                        </div>
                    </div>
                    <div id="login-error" class="notification is-danger is-hidden"></div>
                </form>
            </div>
        `;
    }

    attachEventListeners() {
        document.getElementById('login-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            this.controller.handleLogin(username, password);
        });
    }

    showError(message) {
        const errorDiv = document.getElementById('login-error');
        errorDiv.textContent = message;
        errorDiv.classList.remove('is-hidden');
    }

    hideError() {
        const errorDiv = document.getElementById('login-error');
        errorDiv.classList.add('is-hidden');
    }
}

export default LoginView;
