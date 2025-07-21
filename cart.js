document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const addToCartButtons = document.querySelectorAll('.product-item button');
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const checkoutBtn = document.getElementById('checkout-btn');
    const paymentForm = document.getElementById('payment-form');
    const backToCartBtn = document.querySelector('.back-to-cart-btn');
    const checkoutForm = document.getElementById('checkout-form');
    const cartSummary = document.querySelector('.cart-summary');

    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    function saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="item-price">${item.price}</p>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += parseFloat(item.price.replace('$', ''));
        });
        cartTotalPrice.textContent = `$${total.toFixed(2)}`;
        saveCart();
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productItem = event.target.closest('.product-item');
            const name = productItem.querySelector('h3').textContent;
            const price = productItem.querySelector('.price').textContent;
            const imgSrc = productItem.querySelector('img').src;

            const newItem = {
                name,
                price,
                imgSrc
            };

            cart.push(newItem);
            renderCart();
            alert(`${name} ha sido añadido al carrito.`);
        });
    });

    cartIcon.addEventListener('click', (event) => {
        event.preventDefault();
        cartSidebar.classList.add('open');
        cartSummary.style.display = 'block';
        paymentForm.style.display = 'none';
    });

    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });

    checkoutBtn.addEventListener('click', () => {
        cartSummary.style.display = 'none';
        paymentForm.style.display = 'block';
        cartItemsContainer.style.display = 'none';
    });

    backToCartBtn.addEventListener('click', () => {
        cartSummary.style.display = 'block';
        paymentForm.style.display = 'none';
        cartItemsContainer.style.display = 'block';
    });

    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const fullName = document.getElementById('full-name').value;
        const address = document.getElementById('address').value;
        const paymentMethod = document.getElementById('payment-method').value;

        if (cart.length === 0) {
            alert('Tu carrito está vacío. Por favor, añade productos antes de pagar.');
            return;
        }

        alert(`
            Procesando pago...
            Nombre: ${fullName}
            Dirección: ${address}
            Método de Pago: ${paymentMethod}
            Total a Pagar: ${cartTotalPrice.textContent}
        `);

        // Limpiar el carrito y el formulario
        cart = [];
        saveCart();
        renderCart();
        checkoutForm.reset();
        cartSidebar.classList.remove('open');
        cartSummary.style.display = 'block';
        paymentForm.style.display = 'none';
        cartItemsContainer.style.display = 'block';
    });

    renderCart();
});