<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GivingGrams - The Gram That Keeps on Giving</title>
    <script src="https://js.stripe.com/v3/"></script> <!-- Stripe Library -->
    <style>
        /* Existing styles... */

        /* Error message style */
        .error-message {
            color: red;
            font-size: 0.9rem;
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
                <label for="recipientName">Recipient's Name:</label>
                <input type="text" id="recipientName" name="recipientName" required>

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

        <!-- Info Section -->
        <section class="info-section">
            <h2>What We Do</h2>
            <p>GivingGrams is all about spreading positivity...</p>
        </section>
    </main>

    <footer>
        <p>Spread kindness, one letter at a time.</p>
    </footer>

    <script>
        const API_BASE = "http://localhost:3000/api"; // Replace with your backend URL
        let csrfToken; // Variable to store CSRF token
        let stripe = Stripe("your-publishable-key"); // Replace with your Stripe publishable key
        let elements = stripe.elements();
        let card = elements.create('card');
        card.mount('#card-element');

        // Fetch the CSRF token
        async function fetchCsrfToken() {
            try {
                const response = await fetch(`${API_BASE}/csrf-token`);
                const data = await response.json();
                csrfToken = data.csrfToken;
            } catch (error) {
                console.error("Error fetching CSRF token:", error);
            }
        }

        // Fetch the current letter count
        async function fetchLetterCount() {
            try {
                const response = await fetch(`${API_BASE}/letters/count`);
                const data = await response.json();
                document.getElementById('letterCount').textContent = data.count;
            } catch (error) {
                console.error("Error fetching letter count:", error);
            }
        }

        // Open the payment form
        function openPaymentForm() {
            document.getElementById('payment-container').style.display = 'block';
        }

        // Handle payment submission
        document.getElementById('paymentForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const recipientName = document.getElementById('recipientName').value;
            const recipientAddress = document.getElementById('recipientAddress').value;
            const optionalMessage = document.getElementById('optionalMessage').value;

            try {
                // Confirm card payment
                const paymentIntentResponse = await fetch(`${API_BASE}/create-payment-intent`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "CSRF-Token": csrfToken, // Include CSRF token
                    },
                    body: JSON.stringify({ email }),
                });

                const paymentIntentData = await paymentIntentResponse.json();
                const { error } = await stripe.confirmCardPayment(paymentIntentData.clientSecret, {
                    payment_method: {
                        card: card,
                        billing_details: { email: email },
                    },
                });

                if (error) {
                    document.getElementById('card-errors').textContent = error.message;
                } else {
                    // Notify backend
                    const response = await fetch(`${API_BASE}/letters`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "CSRF-Token": csrfToken,
                        },
                        body: JSON.stringify({
                            email,
                            recipientName,
                            recipientAddress,
                            optionalMessage,
                        }),
                    });

                    if (response.ok) {
                        alert("Thank you for your GivingGram! Your letter will be delivered soon.");
                        await fetchLetterCount();
                        document.getElementById('payment-container').style.display = 'none';
                    } else {
                        throw new Error("Failed to update letter count.");
                    }
                }
            } catch (error) {
                document.getElementById('card-errors').textContent = error.message || "Something went wrong.";
            }
        });

        // Initialize CSRF token and letter count on page load
        window.onload = async () => {
            await fetchCsrfToken();
            await fetchLetterCount();
        };

        // Word and letter limit validation for optional message
        function validateMessage(textarea, maxWords, maxLetters) {
            const words = textarea.value.split(/\s+/).filter(word => word.length > 0);
            const letters = textarea.value.replace(/\s/g, '').length;
            const feedback = document.getElementById("messageFeedback");

            if (words.length > maxWords || letters > maxLetters) {
                feedback.textContent = `Maximum allowed: ${maxWords} words, ${maxLetters} letters.`;
                feedback.style.color = "red";
            } else {
                feedback.textContent = `You have ${maxWords - words.length} words and ${maxLetters - letters} letters left.`;
                feedback.style.color = "black";
            }
        }
    </script>
</body>

</html>
