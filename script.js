

// Load cart from storage or create empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to cart
function addToCart(name, price, img) {
    let item = cart.find(p => p.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            img: img,
            quantity: 1
        });
    }
    saveCart();
    alert(name + " added to cart!");
}

// Remove item completely
function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
    saveCart();
    displayCart();
}

// Decrease quantity
function decreaseQuantity(name) {
    let item = cart.find(p => p.name === name);
    if (item) {
        item.quantity--;
        if (item.quantity <= 0) removeItem(name);
        saveCart();
    }
    displayCart();
}

// Increase quantity
function increaseQuantity(name) {
    let item = cart.find(p => p.name === name);
    if (item) {
        item.quantity++;
        saveCart();
    }
    displayCart();
}

// Display cart on cart.html
function displayCart() {
    let container = document.getElementById("cart-items");
    let totalContainer = document.getElementById("cart-total");

    if (!container) return; // Page not cart.html

    container.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p>₹${item.price}</p>

                    <div class="qty-box">
                        <button onclick="decreaseQuantity('${item.name}')">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQuantity('${item.name}')">+</button>
                    </div>

                    <button class="remove-btn" onclick="removeItem('${item.name}')">Remove</button>
                </div>
            </div>
        `;
    });

    totalContainer.innerHTML = `<h2>Total: ₹${total}</h2>`;
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order placed successfully!");
    cart = []; // Empty cart
    saveCart();
    displayCart();
}




function login() {
    let email = document.querySelector('.login-box input[type="text"]').value;
    let password = document.querySelector('.login-box input[type="password"]').value;

    // Dummy login (you can change these)
    let correctEmail = "prince1@gmail.com";
    let correctPassword = "12345";

    if (email === correctEmail && password === correctPassword) {

        alert("Login Successful!");
        localStorage.setItem("loggedIn", "true");

        window.location.href = "index.html"; // redirect to home page
    } 
    else {
        alert("Incorrect Email or Password!");
    }
}







window.onload = function () {
    displayCart();
};
