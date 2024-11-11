(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:3
            },
            768:{
                items:4
            },
            992:{
                items:5
            },
            1200:{
                items:6
            }
        }
    });


    // Related carousel
    $('.related-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            }
        }
    });


    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });

    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('tr').remove();
        });
    });
    
})(jQuery);


function addToCart() {
    const product = {
        name: "Colorful Stylish Shirt", // Replace with dynamic product name
        price: 150.00, // Replace with dynamic price
        quantity: parseInt(document.querySelector(".quantity input").value),
        size: document.querySelector("input[name='size']:checked")?.nextElementSibling.textContent,
        color: document.querySelector("input[name='color']:checked")?.nextElementSibling.textContent
    };

    // Get existing cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.name === product.name && item.size === product.size && item.color === product.color);

    if (existingProductIndex > -1) {
        // Update quantity if the product is already in the cart
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        // Add new product to the cart
        cart.push(product);
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count badge
    updateCartCount();

    alert("Product added to cart!");
}
// cart.js

// Function to update cart count badge
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Function to update the cart summary with subtotal, shipping, and total
function updateCartSummary(subtotal) {
    const shipping = 10.00; // Flat rate for shipping
    const total = subtotal + shipping;

    // Update the HTML elements for subtotal, shipping, and total
    document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cartShipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
}
// Call updateCartCount on page load to initialize the cart count
document.addEventListener('DOMContentLoaded', updateCartCount);

// Function to load the cart from localStorage
function loadCart() {
    // Get the cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Get the table body to append the cart items
    const cartTableBody = document.querySelector("tbody");

    // Clear any existing content in the table
    cartTableBody.innerHTML = '';

    let subtotal = 0;

    // Loop through the cart and create table rows dynamically
    cart.forEach((item, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="align-middle">
                <img src="img/product-1.jpg" alt="" style="width: 50px;"> ${item.name}<br>
            </td>
            <td class="align-middle">$${item.price}</td>
            <td class="align-middle">
                <div class="input-group quantity mx-auto" style="width: 100px;">
                    <div class="input-group-btn">
                        <button class="btn btn-sm btn-primary btn-minus" onclick="updateQuantity(${index}, -1)">
                            <i class="fa fa-minus"></i>
                        </button>
                    </div>
                    <input type="text" class="form-control form-control-sm bg-secondary text-center" value="${item.quantity}">
                    <div class="input-group-btn">
                        <button class="btn btn-sm btn-primary btn-plus" onclick="updateQuantity(${index}, 1)">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
            </td>
            <td class="align-middle">${item.color}</td>
            <td class="align-middle">${item.size}</td>
            <td class="align-middle">$${(item.price * item.quantity).toFixed(2)}</td>
            <td class="align-middle"><button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})"><i class="fa fa-times"></i></button></td>
        `;
        cartTableBody.appendChild(row);

        // Update the total amount
        subtotal += item.price * item.quantity;
    });
    updateCartSummary(subtotal);

    // Update the total price displayed on the page
    document.getElementById('cartTotal').textContent = `Total: $${total.toFixed(2)}`;
}


// Function to update quantity of a product in the cart
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart[index].quantity = 1; // Prevent negative or zero quantity
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Reload the cart to reflect changes
}

// Function to remove product from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove the product at the given index

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Reload the cart to reflect changes
}

// Call the function to load the cart when the page loads
document.addEventListener('DOMContentLoaded', loadCart);

// Proceed to checkout button functionality (for now, it's just an alert)
document.getElementById('checkoutBtn').addEventListener('click', function() {
    alert("Proceeding to Checkout...");
});

function addToCart() {
    // Get size, color, and quantity values
    const size = document.querySelector("input[name='size']:checked")?.nextElementSibling.textContent;
    const color = document.querySelector("input[name='color']:checked")?.nextElementSibling.textContent;
    const quantityInput = document.querySelector(".quantity input");
    const quantity = parseInt(quantityInput.value);

    // Validation: Check if size and color are selected
    if (!size || !color) {
        alert("Please select both size and color.");
        return;
    }

    // Validation: Ensure quantity is at least one
    if (isNaN(quantity) || quantity < 1) {
        alert("Quantity must be at least 1.");
        quantityInput.value = 1; // Reset quantity to 1 if it's less than 1
        return;
    }

    // Define the product with validated properties
    const product = {
        name: "Colorful Stylish Shirt", // Replace with dynamic product name
        price: 150.00, // Replace with dynamic price
        quantity: quantity,
        size: size,
        color: color
    };

    // Get existing cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product with the same name, size, and color is already in the cart
    const existingProductIndex = cart.findIndex(item => 
        item.name === product.name && item.size === product.size && item.color === product.color
    );

    if (existingProductIndex > -1) {
        // If product exists, increase its quantity
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        // Otherwise, add the new product to the cart
        cart.push(product);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Product added to cart!");
}

