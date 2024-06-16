class ToastUtility {
    static createToast(message, type = 'info', duration = 3000) {
        console.log(`Creating toast: ${message} [${type}]`); // Agregar log
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.style.position = 'fixed';
            toastContainer.style.top = '20px'; 
            toastContainer.style.right = '20px';
            toastContainer.style.zIndex = '10000';
            toastContainer.style.display = 'flex';
            toastContainer.style.flexDirection = 'column';
            toastContainer.style.gap = '10px'; 
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade');
            setTimeout(() => {
                if (toast && toast.parentElement) {
                    toast.parentElement.removeChild(toast);
                }
            }, 500);
        }, duration);
    }

    static showSuccess(message, duration = 3000) {
        this.createToast(message, 'success', duration);
    }

    static showError(message, duration = 3000) {
        this.createToast(message, 'danger', duration);
    }
}

export default ToastUtility;
