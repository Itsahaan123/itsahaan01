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

// Call updateCartCount on page load to initialize the cart count
document.addEventListener('DOMContentLoaded', updateCartCount);
