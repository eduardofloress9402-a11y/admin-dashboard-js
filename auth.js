// Capturamos el formulario y el mensaje de error del HTML
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

// Credenciales fijas para probar (luego las podés cambiar)
const ADMIN_USER = "admin";
const ADMIN_PASS = "123456";

loginForm.addEventListener('submit', function(event) {
    // Evitamos que la página se recargue al enviar el formulario
    event.preventDefault();

    // Obtenemos los valores que ingresó el usuario
    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value.trim();

    // Validamos credenciales
    if (usernameInput === ADMIN_USER && passwordInput === ADMIN_PASS) {
        // Guardamos una sesión simple en el navegador
        localStorage.setItem('admin_session', 'active');
        
        // Redirigimos al panel principal (que crearemos en el paso 3)
        window.location.href = 'dashboard.html';
    } else {
        // Mostramos el mensaje de error
        errorMessage.hidden = false;
    }
});