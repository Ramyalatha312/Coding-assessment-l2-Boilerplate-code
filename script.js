document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

   
    fetch('https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889')
        .then(response => response.json())
        .then(data => {
            let subtotal = 0;

            data.items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <img src="${item.featured_image.url}" alt="${item.title}">
                    <div>
                        <h3>${item.title}</h3>
                        <p>Price: ₹${(item.presentment_price).toLocaleString()}</p>
                        <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input">
                        <span>Subtotal: ₹${(item.presentment_price * item.quantity).toLocaleString()}</span>
                        <button class="remove-item" data-id="${item.id}">Remove</button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
                subtotal += item.presentment_price * item.quantity;

               
                subtotalElement.innerText = `₹${subtotal.toLocaleString()}`;
                totalElement.innerText = `₹${subtotal.toLocaleString()}`;
            });

           
            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('input', (e) => {
                    const quantity = parseInt(e.target.value);
                    const id = e.target.getAttribute('data-id');
                    const item = data.items.find(i => i.id === id);
                    const newSubtotal = item.presentment_price * quantity;
                    subtotal += (newSubtotal - (item.presentment_price * item.quantity));
                    subtotalElement.innerText = `₹${subtotal.toLocaleString()}`;
                    totalElement.innerText = `₹${subtotal.toLocaleString()}`;
                });
            });

           
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = e.target.getAttribute('data-id');
                    const itemToRemove = data.items.find(item => item.id == id);
                    subtotal -= itemToRemove.presentment_price * itemToRemove.quantity;
                    subtotalElement.innerText = `₹${subtotal.toLocaleString()}`;
                    totalElement.innerText = `₹${subtotal.toLocaleString()}`;
                    e.target.closest('.cart-item').remove(); // Remove item from cart
                });
            });
        })
        .catch(error => {
            console.error('Error fetching cart data:', error);
        });

   
    document.getElementById('checkout-btn').addEventListener('click', () => {
        alert('Proceeding to Checkout!');
    });
});
