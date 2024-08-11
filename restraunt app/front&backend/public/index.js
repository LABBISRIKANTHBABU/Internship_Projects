// Script to toggle the navigation menu on smaller screens
function toggleNav() {
    var x = document.getElementById("navMenu");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// JavaScript for form validation and dynamic content updates

document.addEventListener('DOMContentLoaded', () => {
  const reservationForm = document.getElementById('reservation-form');
  const orderForm = document.getElementById('order-form');
  const dishSelect = document.getElementById('dish');
  const quantityInput = document.getElementById('quantity');
  const totalPriceDisplay = document.getElementById('totalPrice');

  if (reservationForm) {
      reservationForm.addEventListener('submit', validateReservationForm);
  }

  if (orderForm) {
      orderForm.addEventListener('submit', validateOrderForm);
      dishSelect.addEventListener('change', updateTotalPrice);
      quantityInput.addEventListener('input', updateTotalPrice);
  }
});

function validateReservationForm(event) {
  event.preventDefault();
  const form = event.target;
  let valid = true;

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const date = form.date.value;
  const time = form.time.value;
  const guests = form.guests.value;

  if (name === '') {
      alert('Name is required.');
      valid = false;
  }

  if (email === '') {
      alert('Email is required.');
      valid = false;
  } else if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      valid = false;
  }

  if (date === '') {
      alert('Date is required.');
      valid = false;
  }

  if (time === '') {
      alert('Time is required.');
      valid = false;
  }

  if (guests === '' || guests <= 0) {
      alert('Number of guests must be a positive number.');
      valid = false;
  }

  if (valid) {
      submitReservation(event);
  }
}

function validateOrderForm(event) {
  event.preventDefault();
  const form = event.target;
  let valid = true;

  const dish = form.dish.value;
  const quantity = form.quantity.value;
  const address = form.address.value.trim();

  if (quantity === '' || quantity <= 0) {
      alert('Quantity must be a positive number.');
      valid = false;
  }

  if (address === '') {
      alert('Delivery address is required.');
      valid = false;
  }

  if (valid) {
      submitOrder(event);
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function updateTotalPrice() {
  const dishSelect = document.getElementById('dish');
  const quantityInput = document.getElementById('quantity');
  const totalPriceDisplay = document.getElementById('totalPrice');

  const prices = {
      samosa: 20,
      butter_chicken: 400,
      palak_paneer: 350,
      lamb_vindaloo: 550,
      gulab_jamun: 150,
      rasgulla: 150,
      kulfi: 100,
  };

  const selectedDish = dishSelect.value;
  const quantity = parseInt(quantityInput.value) || 0;
  const price = prices[selectedDish] || 0;

  const totalPrice = price * quantity;
  totalPriceDisplay.textContent = `Total Price: ₹${totalPrice}`;
}





async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        if (response.ok) {
            localStorage.setItem('authToken', result.token);
            alert("Login successful!");
            // Redirect or show user profile
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
