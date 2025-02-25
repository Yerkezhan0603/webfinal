let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Функция добавления товара в корзину
function addToCart(id, title, price) {
    const product = cart.find(item => item.id === id);
    if (product) {
        product.quantity++;
    } else {
        cart.push({ id, title, quantity: 1, price });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
    alert("✅ Товар добавлен в корзину!");
}

// Функция загрузки и отображения корзины
async function loadCart() {
    const cartContainer = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");
    const cartTotalModal = document.getElementById("cartTotalModal");

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>🛒 Корзина пуста</p>";
        cartCount.innerText = "0";
        cartTotal.innerText = "0.00";
        cartTotalModal.innerText = "0.00";
        return;
    }

    let total = 0;

    cart.forEach(cartItem => {
        const itemTotal = cartItem.price * cartItem.quantity;
        total += itemTotal;

        cartContainer.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <strong>${cartItem.title}</strong> - $${cartItem.price} x ${cartItem.quantity}
                </div>
                <div>
                    <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity('${cartItem.id}', -1)">-</button>
                    <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity('${cartItem.id}', 1)">+</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart('${cartItem.id}')">❌</button>
                </div>
            </div>
        `;
    });

    cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartTotal.innerText = total.toFixed(2);
    cartTotalModal.innerText = total.toFixed(2);
}

// Изменение количества товара
function changeQuantity(id, change) {
    const product = cart.find(item => item.id === id);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
    }
}

// Удаление товара
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

// Обновление интерфейса корзины
function updateCartUI() {
    loadCart();
}

document.addEventListener("DOMContentLoaded", updateCartUI);
async function loadCart() {
    const cartContainer = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");
    const cartTotalModal = document.getElementById("cartTotalModal");

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>🛒 Корзина пуста</p>";
        if (cartCount) cartCount.innerText = "0";
        if (cartTotal) cartTotal.innerText = "0.00";
        if (cartTotalModal) cartTotalModal.innerText = "0.00";
        return;
    }

    let total = 0;

    cart.forEach(cartItem => {
        const itemTotal = cartItem.price * cartItem.quantity;
        total += itemTotal;

        cartContainer.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <strong>${cartItem.title}</strong> - $${cartItem.price} x ${cartItem.quantity}
                </div>
                <div>
                    <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity('${cartItem.id}', -1)">-</button>
                    <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity('${cartItem.id}', 1)">+</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart('${cartItem.id}')">❌</button>
                </div>
            </div>
        `;
    });

    if (cartCount) cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    if (cartTotal) cartTotal.innerText = total.toFixed(2);
    if (cartTotalModal) cartTotalModal.innerText = total.toFixed(2);
}