<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GivingGrams - The Gram That Keeps on Giving</title>
    <script src="https://js.stripe.com/v3/"></script>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
    <meta http-equiv="Content-Security-Policy" 
        content="default-src 'self'; script-src 'self' https://js.stripe.com; 
                 style-src 'self' 'unsafe-inline'; 
                 img-src 'self' data:; 
                 connect-src 'self' https://your-secure-api.com;">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
    <meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains">
    <style>
        /* General Styles */
        body {
            font-family: 'Roboto', sans-serif;
            margin: 0;
            padding: 0;
            text-align: center;
            color: #333;
            background: linear-gradient(135deg, #e8f6ef, #a9dfbf);
        }

        /* Hero Section */
        .hero {
            position: relative;
            width: 100vw;
            height: 100vh;
            background: url('images/GivingGramWebsitePicture.JPG') no-repeat center center;
            background-size: cover;
            background-attachment: fixed;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
            color: white;
        }

        .hero h1 {
            font-size: 3rem;
            font-weight: 700;
        }

        .hero p {
            font-size: 1.5rem;
            font-style: italic;
            margin-top: 10px;
        }

        .cta-button {
            background-color: #58d68d;
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.2rem;
            cursor: pointer;
            margin-top: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transition: transform 0.2s, background-color 0.3s;
        }

        .cta-button:hover {
            background-color: #4cae4c;
            transform: translateY(-3px);
        }

        /* Letter Counter */
        .letter-counter {
            margin: 30px 0;
            font-size: 1.5rem;
        }

        /* Payment Form */
        #payment-container {
            display: none;
            margin-top: 30px;
            background: white;
            padding: 30px;
            margin: 30px auto;
            width: 90%;
            max-width: 500px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
    </style>
</head>
<body>
    <!-- Hero Section -->
    <header class="hero">
        <h1>GivingGrams</h1>
        <p>The Gram that keeps on Giving</p>
        <button class="cta-button" onclick="openPaymentForm()">Start Giving</button>
    </header>

    <main>
        <!-- Letter Counter -->
        <div class="letter-counter">
            <p><strong>Letters Sent</strong></p>
            <p id="letterCount">0</p>
        </div>

        <!-- Payment Form -->
        <div id="payment-container">
            <h2>Complete Your GivingGram</h2>
            <form id="paymentForm">
                <label for="recipientName">Recipient's Name:</label>
                <input type="text" id="recipientName" required>

                <label for="recipientAddress">Recipient's Address:</label>
                <input type="text" id="recipientAddress" required>

                <label for="email">Your Email Address:</label>
                <input type="email" id="email" required>

                <label for="card-element">Payment Details:</label>
                <div id="card-element"></div>
                <div id="card-errors"></div>
                
                <button type="submit">Submit Payment</button>
            </form>
        </div>
    </main>

    <script>
        const API_BASE = "https://your-secure-api.com/api";
        let stripe = Stripe("your-publishable-key");
        let elements = stripe.elements();
        let card = elements.create('card');
        card.mount('#card-element');

        async function fetchLetterCount() {
            const response = await fetch(`${API_BASE}/letters/count`);
            const data = await response.json();
            document.getElementById('letterCount').textContent = data.count;
        }

        function openPaymentForm() {
            document.getElementById('payment-container').style.display = 'block';
        }

        document.getElementById('paymentForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;

            const response = await fetch(`${API_BASE}/create-payment-intent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const { clientSecret } = await response.json();
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card, billing_details: { email } }
            });

            if (error) {
                document.getElementById('card-errors').textContent = "There was an issue with your payment.";
            } else if (paymentIntent.status === "succeeded") {
                alert("Thank you for your GivingGram! Your letter will be delivered soon.");
                fetchLetterCount();
                document.getElementById('payment-container').style.display = 'none';
            }
        });

        fetchLetterCount();
    </script>
</body>
</html>
