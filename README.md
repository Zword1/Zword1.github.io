<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GivingGrams - The Gram That Keeps on Giving</title>
    <script src="https://js.stripe.com/v3/"></script> <!-- Stripe Library -->
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
            text-align: center;
            color: #333;
            background: linear-gradient(135deg, #e8f6ef, #a9dfbf);
        }

        header {
            position: relative;
            background-image: url('images/GivingGramWebsitePicture.JPG');
            background-size: initial;
            background-position: center;
            background-repeat: no-repeat;
            width: 100%;
            height: 400px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: white;
            margin: 0; /* Ensures no unexpected spacing */
            padding: 0; /* Ensures no unexpected padding */
            box-sizing: border-box; /* Prevents unwanted width calculation issues */
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

        /* Button Styles */
        button {
            background-color: #58d68d;
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.2rem;
            cursor: pointer;
            margin-top: 20px;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s, background-color 0.3s;
        }

        button:hover {
            background-color: #4cae4c;
            transform: translateY(-3px);
        }

        /* Letter Counter */
        .letter-counter {
            margin: 30px 0;
            font-size: 1.5rem;
        }

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

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
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

        input:focus, textarea:focus {
            border-color: #2ecc71;
            outline: none;
            box-shadow: 0 0 5px rgba(46, 204, 113, 0.5);
        }

        #card-errors {
            color: red;
            margin-top: 10px;
        }

        /* Info Section */
        .info-section {
            padding: 20px;
            background-color: #f9f9f9;
            text-align: left;
            margin-top: 30px;
            border-radius: 10px;
        }

        footer {
            background: #333;
            color: white;
            padding: 20px;
            margin-top: 30px;
        }

        footer p {
            margin: 5px;
            font-size: 0.9rem;
            color: #fff;
        }
    </style>
</head>

<body>
    <header>
        <h1>GivingGrams</h1>
        <p>The Gram that keeps on Giving</p>
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
                <textarea id="optionalMessage" name="optionalMessage" rows="4" 
                          placeholder="Write your message here..."
                          oninput="validateMessage(this, 50, 250)"></textarea>
                <p id="messageFeedback">You can write up to 50 words and 250 letters.</p>

                <!-- Payment Information -->
                <label for="card-element">Payment Details:</label>
                <div id="card-element"></div> 
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
        const API_BASE = "https://your-secure-api.com/api"; // Replace with your production backend URL
        let stripe = Stripe("your-publishable-key"); // Replace with your Stripe publishable key
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

            // Securely fetch the client secret from the server
            const response = await fetch(`${API_BASE}/create-payment-intent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            });

            const { clientSecret } = await response.json();

            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: card, billing_details: { email: email } }
            });

            if (error) {
                document.getElementById('card-errors').textContent = "There was an issue with your payment.";
            } else if (paymentIntent.status === "succeeded") {
                const response = await fetch(`${API_BASE}/letters`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: email }),
                });

                if (response.ok) {
                    alert("Thank you for your GivingGram! Your letter will be delivered soon.");
                    fetchLetterCount();
                    document.getElementById('payment-container').style.display = 'none';
                }
            }
        });

        function validateMessage(textarea, maxWords, maxLetters) {
            const words = textarea.value.split(/\s+/).filter(w => w.length > 0);
            const letters = textarea.value.replace(/\s/g, '').length;
            const feedback = document.getElementById("messageFeedback");

            if (words.length > maxWords || letters > maxLetters) {
                feedback.textContent = `Maximum reached: ${maxWords} words, ${maxLetters} letters allowed.`;
                feedback.style.color = "red";
                textarea.addEventListener('keydown', (e) => {
                    if ((words.length >= maxWords && e.key !== "Backspace") || (letters >= maxLetters && e.key !== "Backspace")) {
                        e.preventDefault();
                    }
                });
            } else {
                feedback.textContent = `${maxWords - words.length} words, ${maxLetters - letters} letters left.`;
                feedback.style.color = "black";
            }
        }

        fetchLetterCount();
    </script>
</body>
</html>
