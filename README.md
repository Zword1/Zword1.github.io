<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GivingGrams - The Gram That Keeps on Giving</title>
    <script src="https://js.stripe.com/v3/"></script> <!-- Stripe Library -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://js.stripe.com; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.stripe.com; img-src 'self' data:; frame-src https://js.stripe.com;">
    <style>
        /* Styles remain unchanged */
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
                <label for="recipientName">Recipient's Name:</label>
                <input type="text" id="recipientName" name="recipientName" required pattern="[a-zA-Z\s]+" title="Only letters and spaces are allowed.">

                <label for="recipientAddress">Recipient's Address:</label>
                <input type="text" id="recipientAddress" name="recipientAddress" required>

                <label for="email">Your Email Address:</label>
                <input type="email" id="email" name="email" required>

                <label for="optionalMessage">Your Personal Message (optional):</label>
                <textarea id="optionalMessage" name="optionalMessage" rows="4" cols="50" 
                    placeholder="Write your message here..."
                    oninput="validateMessage(this, 50, 250)"></textarea>
                <p id="messageFeedback">You can write up to 50 words and 250 letters.</p>

                <label for="card-element">Payment Details:</label>
                <div id="card-element"></div> 
                <div id="card-errors" role="alert"></div><br>

                <button type="submit">Submit Payment</button>
            </form>
        </div>

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
        const API_BASE = "https://your-backend.com/api"; // Secure HTTPS endpoint
        const stripe = Stripe("{{STRIPE_PUBLIC_KEY}}"); // Load from environment variables
        const elements = stripe.elements();
        const card = elements.create('card', { hidePostalCode: true });
        card.mount('#card-element');

        async function fetchLetterCount() {
            try {
                const response = await fetch(`${API_BASE}/letters/count`, {
                    method: "GET",
                    mode: "cors",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await response.json();
                document.getElementById('letterCount').textContent = data.count;
            } catch (error) {
                console.error("Error fetching letter count:", error);
            }
        }

        function openPaymentForm() {
            document.getElementById('payment-container').style.display = 'block';
        }

        document.getElementById('paymentForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            if (!email) {
                alert("Please enter a valid email address.");
                return;
            }

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: card,
                billing_details: { email: email },
            });

            if (error) {
                document.getElementById('card-errors').textContent = error.message;
            } else {
                try {
                    const response = await fetch(`${API_BASE}/letters`, {
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            "CSRF-Token": "your-csrf-token", // Optional CSRF protection
                        },
                        body: JSON.stringify({
                            paymentMethodId: paymentMethod.id,
                            email: email,
                        }),
                    });

                    if (response.ok) {
                        alert("Thank you for your GivingGram! Your letter will be delivered soon.");
                        await fetchLetterCount();
                        document.getElementById('payment-container').style.display = 'none';
                    } else {
                        alert("Something went wrong while processing your payment.");
                    }
                } catch (error) {
                    console.error("Error submitting payment:", error);
                }
            }
        });

        fetchLetterCount();
    </script>
</body>
</html>
