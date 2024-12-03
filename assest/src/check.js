window.onload = function () {
    const orderSummaryDiv = document.getElementById("orderSummary");
    const orderTotalDiv = document.getElementById("orderTotal");
    const confirmOrderButton = document.getElementById("confirmOrderButton");

    // Load cart details from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        orderSummaryDiv.innerHTML = "<p>Your cart is empty.</p>";
        orderTotalDiv.textContent = "";
    } else {
        let total = 0;
        cart.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("flex", "border-b", "pb-4");
            itemDiv.innerHTML = `
                <img src="${item.image}" class="w-16 h-16 object-cover mr-4" alt="${item.name}">
                <div>
                    <h3 class="text-lg font-semibold">${item.name}</h3>
                    <p>Price: $${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
            `;
            orderSummaryDiv.appendChild(itemDiv);
            total += item.price * item.quantity;
        });
        orderTotalDiv.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Confirm order button functionality
    confirmOrderButton.addEventListener("click", function () {
        const address = document.getElementById("address").value.trim();
        const city = document.getElementById("city").value.trim();
        const postalCode = document.getElementById("postalCode").value.trim();
        const country = document.getElementById("country").value.trim();
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

        // Client-side form validation
        if (!address || !city || !postalCode || !country) {
            alert("Please fill in all shipping details.");
            return;
        }

        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        // Store order details in localStorage for confirmation page
        const orderDetails = {
            shippingAddress: { address, city, postalCode, country },
            paymentMethod: paymentMethod.value,
            cart: cart
        };

        localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

        // Proceed to order confirmation
        localStorage.removeItem("cart"); // Clear the cart
        window.location.href = "confirm.html"
    });
};
  
  
  