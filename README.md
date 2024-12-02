<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GivingGrams - The Gram That Keeps on Giving</title>
    <script src="https://js.stripe.com/v3/"></script> <!-- Stripe Library -->
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            text-align: center;
            color: #333;
        }

        header {
            position: relative;
            background-image: url('images/ZePrint3DLogo.png.jpg'); /* Replace 'your-image.jpg' with the path to your image */
            background-size: cover;
            background-position: center;
            height: 400px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: white;
        }

        header h1 {
             position: absolute;
            top: 20px;
            left: 20px;
            margin: 0;
            font-size: 1.5rem;
            text-shadow: 1px 1px 2px black;
        }

        header p {
            position: absolute;
            bottom: 20px;
            margin: 0;
            font-size: 1.2rem;
            font-style: italic;
            text-shadow: 1px 1px 2px black;
        }

        main {
            padding: 20px;
        }

        button {
            background-color: #5cb85c;
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.2rem;
            cursor: pointer;
            margin-top: 20px;
            border-radius: 5px;
        }

        button:hover {
            background-color: #4cae4c;
        }

        .letter-counter {
            margin: 30px 0;
            font-size: 1.5rem;
        }

        #payment-container {
            display: none;
            margin-top: 30px;
        }

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }

        input, textarea {
            width: 90%;
            max-width: 500px;
            margin-bottom: 15px;
            padding: 10px;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        footer {
            background: #f1f1f1;
            padding: 20px;
            margin-top: 30px;
        }

        footer p {
            margin: 5px;
            font-size: 0.9rem;
            color: #666;
        }

        .info-section {
            padding: 20px;
            background-color: #f9f9f9;
            text-align: left;
            margin-top: 30px;
        }

        #card-errors {
            color: red;
        }
    </style>
</head>

<body>
    <header>
        <h1>GivingGrams.com</h1>
        <p>The Gram that keeps on Giving!</p>
    </header>

    <main>
        <!-- Letter Counter -->
        <div class="letter-counter">
            <p><strong>Letters Sent</strong></p>
            <p id="letterCount">0</p>
        </div>

        <!-- Start Giving Button -->
        <button onclick="openPaymentForm()">Start Giving</button>

        <!-- Payment Form -->
        <div id="payment-container">
            <h2>Complete Your GivingGram</h2>
            <form id="paymentForm">
                <!-- Recipient Information -->
                <label for="recipientName">Recipient's Name:</label>
                <input type="text" id="recipientName" name="recipientName" required>

                <label for="recipientAddress">Recipient's Address:</label>
                <input type="text" id="recipientAddress" name="recipientAddress" required>

                <!-- Email -->
                <label for="email">Your Email Address:</label>
                <input type="email" id="email" name="email" required>
                
                <!-- Optional Message -->
                <label for="optionalMessage">Your Personal Message (optional):</label>
                <textarea id="optionalMessage" name="optionalMessage" rows="4" cols="50" placeholder="Write your message here..."></textarea>

                <!-- Payment Information .1 -->
                <label for="card-element">Payment Details:</label>

                <!-- Email -->
                <label for="email">Your Email Address:</label>
                <input type="email" id="email" name="email" required>

                <!-- Payment Information .2 -->
                <div id="card-element"></div> <!-- Stripe Card Element -->
                <div id="card-errors" role="alert"></div><br>

                <button type="submit">Submit Payment</button>
            </form>
        </div>

        <!-- Info Section -->
        <section class="info-section">
            <h2>What We Do</h2>
            <p>GivingGrams is all about spreading positivity. You can send a heartfelt letter to anyone in the world with just a few clicks. 
                Choose a recipient, add a personal message (if you'd like), and we'll take care of the rest.</p>
            <p>Our goal is to make the world a better place, one letter at a time. Whether it’s to a friend, family member, or even a stranger, your GivingGram will bring joy and kindness to someone’s day.</p>
        </section>
    </main>

    <footer>
        <p>Spread kindness, one letter at a time.</p>
    </footer>

    <script>
        const API_BASE = "http://localhost:3000/api"; // Replace with your backend URL
        let stripe = Stripe("your-publishable-key"); // Replace with your Stripe publishable key
        let elements = stripe.elements();
        let card = elements.create('card');
        card.mount('#card-element');

        // Fetch the current letter count
        async function fetchLetterCount() {
            const response = await fetch(`${API_BASE}/letters/count`);
            const data = await response.json();
            document.getElementById('letterCount').textContent = data.count;
        }

        // Open the payment form
        function openPaymentForm() {
            document.getElementById('payment-container').style.display = 'block';
        }

        // Handle payment submission
        document.getElementById('paymentForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;

            // Confirm card payment
            const { paymentIntent, error } = await stripe.confirmCardPayment("your-client-secret", {
                payment_method: {
                    card: card,
                    billing_details: { email: email },
                }
            });

            if (error) {
                document.getElementById('card-errors').textContent = error.message;
            } else if (paymentIntent && paymentIntent.status === "succeeded") {
                // Notify the backend
                const response = await fetch(`${API_BASE}/letters`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: email }),
                });

                if (response.ok) {
                    alert("Thank you for your GivingGram! Your letter will be delivered soon.");
                    await fetchLetterCount();
                    document.getElementById('payment-container').style.display = 'none';
                } else {
                    alert("Something went wrong while updating the letter count.");
                }
            }
        });

        // Initialize counter on page load
        fetchLetterCount();
    </script>
</body>

</html>
