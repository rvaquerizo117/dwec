// cookieConsent.js

document.addEventListener('DOMContentLoaded', () => {
    //console.log('Document loaded');
    if (!localStorage.getItem('cookiesAccepted')) {
        //console.log('Cookies not accepted yet');
        displayCookieBanner();
    } else {
        //console.log('Cookies already accepted');
    }
});

function displayCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    if (banner) {
        console.log('Displaying cookie banner');
        banner.style.display = 'block';
        
        const acceptButton = banner.querySelector('.btn-accept-cookies');
        console.log('Accept button:', acceptButton);  // Depuración para verificar el botón

        if (acceptButton) {
            acceptButton.addEventListener('click', () => {
                console.log('Accept button clicked');
                localStorage.setItem('cookiesAccepted', 'true');
                banner.style.display = 'none';
                console.log('Cookie banner hidden and preference saved in localStorage');
                
                // Verificar almacenamiento
                const cookiesAccepted = localStorage.getItem('cookiesAccepted');
                console.log('cookiesAccepted in localStorage:', cookiesAccepted);
            });
        } else {
            console.error('Accept button not found');
        }
    } else {
        console.error('Cookie banner not found');
    }
}
