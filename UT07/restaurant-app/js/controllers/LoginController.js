import LoginView from '../views/LoginView.js';
import User from '../models/User.js';

class LoginController {
    constructor() {
        console.log("Inicializando LoginController...");
        this.userModel = new User();
        this.view = new LoginView(this);
    }

    async handleLogin(username, password) {
        try {
            const isValid = await this.userModel.validateCredentials(username, password);
            console.log("Credenciales válidas:", isValid);
            if (isValid) {
                document.cookie = "authenticated=true; path=/";
                document.cookie = `username=${username}; path=/`; // Añadir cookie de username
                console.log("Cookies establecidas: authenticated=true y username=" + username); // Depuración
                this.redirectToHome();
            } else {
                this.view.showError('Nombre de usuario o contraseña incorrectos.');
            }
        } catch (error) {
            this.view.showError('Error al intentar iniciar sesión.');
        }
    }

    redirectToHome() {
        window.location.href = 'index.html';  // Redirigir a la página principal de la aplicación
    }
}

export default LoginController;
