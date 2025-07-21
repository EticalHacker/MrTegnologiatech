document.addEventListener('DOMContentLoaded', () => {
    // Código para el carrusel de destacados
    const carousel = document.querySelector('.carousel');
    const productCards = document.querySelectorAll('.product-card');

    if (carousel && productCards.length > 0) {
        // Clonamos los primeros 2 productos para crear un bucle infinito en el carrusel
        for (let i = 0; i < 2; i++) {
            const clone = productCards[i].cloneNode(true);
            carousel.appendChild(clone);
        }
    }
});