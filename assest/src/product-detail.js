window.onload = function() {
    const product = JSON.parse(localStorage.getItem('productDetails'));

    // Product Info
    document.getElementById('productImage').src = product.image;
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productPrice').textContent = `$${product.price}`;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productSpecifications').textContent = product.specifications;

    // Rating as Stars
    let ratingDiv = document.getElementById('productRating');
    ratingDiv.innerHTML = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);

    // Show reviews
    const reviewsDiv = document.getElementById('productReviews');
    reviewsDiv.innerHTML = product.reviews.length > 0 
        ? product.reviews.map(review => `<p>${review}</p>`).join('') 
        : '<p>No reviews yet.</p>';

    // Increment/Decrement buttons
    const quantityInput = document.getElementById('quantity');
    document.getElementById('increment').addEventListener('click', function() {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    document.getElementById('decrement').addEventListener('click', function() {
        if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });

    // Add to Cart button
    document.getElementById('addToCart').addEventListener('click', function() {
        const quantity = parseInt(quantityInput.value);
        const cartItem = { ...product, quantity };

        // Save to local storage (if cart already exists, append item)
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));

        alert('Product added to cart!');
    });
}