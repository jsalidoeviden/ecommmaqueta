// Lista de usuarios ficticios
const users = [
    { email: "john.doe@example.com", password: "Password123" },
    { email: "jane.doe@example.com", password: "SecurePass456" }
];

// Variables de productos y carrito
const products = [
    { id: 1, name: "Pikachu", price: 100, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" },
    { id: 2, name: "Bulbasaur", price: 200, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" },
    { id: 3, name: "Charmander", price: 150, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" }
];

const cart = [];

// Elementos del DOM
const loginSection = document.getElementById('login-section');
const productsSection = document.getElementById('products-section');
const cartSection = document.getElementById('cart-section');
const productsList = document.getElementById('products-list');
const cartItems = document.getElementById('cart-items');
const goToCartBtn = document.getElementById('go-to-cart-btn');
const backToProductsBtn = document.getElementById('back-to-products-btn');
const checkoutBtn = document.getElementById('checkout-btn');
const logoutBtn = document.getElementById('logout-btn');
const logoutBtnCart = document.getElementById('logout-btn-cart');
const errorMessage = document.getElementById('error-message');
const cartCount = document.getElementById('cart-count'); // Contador de productos en el carrito

// Función para mostrar productos
function displayProducts() {
    productsList.innerHTML = ''; // Limpiar productos previos
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Agregar al carrito</button>
        `;
        productsList.appendChild(productCard);
    });
}

// Función para agregar producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
    updateCartCount();
}

// Función para actualizar el carrito
function updateCart() {
    cartItems.innerHTML = ''; // Limpiar carrito anterior
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price}</p>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Función de Login
function handleLogin(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    return user !== undefined; // Si encuentra el usuario, retorna true
}

// Manejar el Login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtener email y contraseña ingresados
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validar si el login es correcto
    if (handleLogin(email, password)) {
        // Si el login es exitoso, ocultar la sección de login y mostrar productos
        loginSection.style.display = 'none';
        productsSection.style.display = 'block';
        displayProducts();
    } else {
        // Si el login falla, mostrar un mensaje de error
        errorMessage.textContent = "Correo o contraseña incorrectos.";
    }
});

// Navegar al carrito
goToCartBtn.addEventListener('click', function() {
    productsSection.style.display = 'none';
    cartSection.style.display = 'block';
});

// Volver a la lista de productos
backToProductsBtn.addEventListener('click', function() {
    cartSection.style.display = 'none';
    productsSection.style.display = 'block';
});

// Simular el checkout
checkoutBtn.addEventListener('click', function() {
    alert('Compra completada con éxito');
    cart.length = 0; // Vaciar carrito
    updateCart(); // Actualizar carrito vacío
    updateCartCount(); // Actualizar contador
    cartSection.style.display = 'none';
    productsSection.style.display = 'block';
});

// Función de logout
function logout() {
    // Limpiar el carrito y otros estados
    cart.length = 0;
    updateCart();
    updateCartCount();

    // Volver a mostrar el formulario de login
    productsSection.style.display = 'none';
    cartSection.style.display = 'none';
    loginSection.style.display = 'block';
}

// Event listeners para logout
logoutBtn.addEventListener('click', logout);
logoutBtnCart.addEventListener('click', logout);
