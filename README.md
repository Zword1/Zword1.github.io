<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GivingGrams.com</title>
  <link rel="stylesheet" href="styles.css">
  <script src="https://js.stripe.com/v3/"></script>
</head>
<body>
  <header>
    <h1>GivingGrams.com</h1>
    <h2>The Gram that keeps on Giving!</h2>
  </header>
  
  <main>
    <!-- Banner Section -->
    <section>
      <img src="your-image.jpg" alt="GivingGrams Banner" id="banner">
    </section>

    <!-- Main Action Section -->
    <section>
      <button id="start-giving-btn">Start Giving</button>
      <div id="letter-counter">
        <h3>Letters Sent</h3>
        <p id="counter-value">Loading...</p>
      </div>
    </section>

    <!-- Form Section -->
    <section id="giving-form" style="display: none;">
      <h3>Send a GivingGram</h3>
      <form id="paymentForm" onsubmit="handleCheckout(event)">
        <label for="recipient">Recipient's Name:</label>
        <input type="text" id="recipient" name="recipient" required><br><br>

        <label for="address">Recipient's Address:</label>
        <input type="text" id="address" name="address" required><br><br>

        <label for="message">Message (optional):</label>
        <textarea id="message" name="message" rows="4" cols="50"></textarea><br><br>

        <label for="email">Your Email:</label>
        <input type="email" id="email" name="email" required><br><br>

        <div id="card-element"></div><br>

        <button type="submit">Pay $5.00 and Send</button>
      </form>
    </section>

    <!-- About Section -->
    <section>
      <h3>About GivingGrams</h3>
      <p>We aim to spread joy through thoughtful letters delivered to your loved ones. Every letter helps support our mission of kindness.</p>
      <p>How it works: Fill out the form, write a message, and we’ll take care of the rest!</p>
    </section>
  </main>

  <script>
    // Initialize Stripe
    const stripe = Stripe('YOUR_PUBLISHABLE_KEY'); // Replace with your Stripe publishable key
    const API_URL = 'https://your-backend-url.com'; // Replace with your backend URL

    // Show the form when "Start Giving" is clicked
    document.getElementById('start-giving-btn').addEventListener('click', () => {
      document.getElementById('giving-form').style.display = 'block';
    });

    // Fetch the letter counter from the backend
    async function fetchLetterCounter() {
      try {
        const response = await fetch(`${API_URL}/api/letter-counter`);
        const data = await response.json();
        document.getElementById('counter-value').innerText = data.count;
      } catch (error) {
        console.error('Error fetching letter counter:', error);
      }
    }

    // Handle checkout process
    async function handleCheckout(event) {
      event.preventDefault();

      const name = document.getElementById('recipient').value;
      const address = document.getElementById('address').value;
      const message = document.getElementById('message').value;
      const email = document.getElementById('email').value;

      // Create Stripe payment token
      const { token, error } = await stripe.createToken(document.getElementById('card-element'));
      if (error) {
        alert('Payment failed: ' + error.message);
        return;
      }

      // Send data to the backend
      const response = await fetch(`${API_URL}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, address, message, email, stripeToken: token.id, amount: 500 }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Thank you! Your GivingGram has been sent.');
        fetchLetterCounter(); // Update the counter
      } else {
        alert('Payment failed: ' + result.error);
      }
    }

    // Load the initial counter value
    fetchLetterCounter();
  </script>
</body>
</html>
