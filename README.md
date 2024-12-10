<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GivingGrams - The Gram That Keeps on Giving</title>
    <meta http-equiv="Content-Security-Policy" 
        content="default-src 'self'; script-src 'self' https://js.stripe.com; 
                 style-src 'self' 'unsafe-inline'; 
                 img-src 'self' data:; 
                 connect-src 'self' https://api.givinggrams.com;">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
    <meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains">
    <script src="https://js.stripe.com/v3/"></script>
    <style>
        /* Styles unchanged */
    </style>
</head>

<body>
    <header>
        <h1>GivingGrams.com</h1>
        <p>The Gram that keeps on Giving!</p>
    </header>

    <main>
        <!-- Unchanged HTML Structure -->
        <div id="payment-container">
            <form id="paymentForm">
                <input type="hidden" id="csrf-token" value="fetch-from-server">
                <label for="recipientName">Recipient's Name:</label>
                <input type="text" id="recipientName" name="recipientName" required>

                <label for="recipientAddress">Recipient's Address:</label>
                <input type="text" id="recipientAddress" name="recipientAddress" required>

                <label for="email">Your Email Address:</label>
                <input type="email" id="email" name="email" required>

                <label for="optionalMessage">Your Personal Message (optional):</label>
                <textarea id="optionalMessage" name="optionalMessage" rows="4" cols="50" placeholder="Write your message here..."></textarea>

                <label for="card-element">Payment Details:</label>
                <div id="card-element"></div> 
                <div id="card-errors" role="alert"></div><br>

                <button type="submit">Submit Payment</button>
            </form>
        </div>
    </main>

    <footer>
        <p>Spread kindness, one letter at a time.</p>
    </footer>

    <script>
        const API_BASE = "https://api.givinggrams.com"; // Updated to HTTPS

        // Sanitize Input Function
        function sanitizeInput(input) {
            const div = document.createElement('div');
            div.textContent = input;
            return div.innerHTML;
        }

        // Fetch letter count securely
        async function fetchLetterCount() {
            try {
                const response = await fetch(`${API_BASE}/letters/count`);
                const data = await response.json();
                document.getElementById('letterCount').textContent = sanitizeInput(data.count.toString());
            } catch (error) {
                console.error("Error fetching letter count:", error);
            }
        }

        // Secure client secret handling
        async function getClientSecret() {
            try {
                const response = await fetch(`${API_BASE}/payment/intent`, {
                    method: 'POST',
                    headers: { 
                        "Content-Type": "application/json",
                        "X-CSRF-Token": document.getElementById('csrf-token').value,
                    },
                });
                const data = await response.json();
                return data.clientSecret;
            } catch (error) {
                console.error("Error fetching client secret:", error);
                return null;
            }
        }

        // Handle payment submission securely
        document.getElementById('paymentForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const sanitizedEmail = sanitizeInput(document.getElementById('email').value);
            const clientSecret = await getClientSecret();

            if (!clientSecret) {
                alert("Unable to process payment. Please try again.");
                return;
            }

            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: { email: sanitizedEmail },
                }
            });

            if (error) {
                document.getElementById('card-errors').textContent = sanitizeInput(error.message);
            } else if (paymentIntent && paymentIntent.status === "succeeded") {
                try {
                    const response = await fetch(`${API_BASE}/letters`, {
                        method: "POST",
                        headers: { 
                            "Content-Type": "application/json",
                            "X-CSRF-Token": document.getElementById('csrf-token').value,
                        },
                        body: JSON.stringify({ email: sanitizedEmail }),
                    });

                    if (response.ok) {
                        alert("Thank you for your GivingGram! Your letter will be delivered soon.");
                        fetchLetterCount();
                    } else {
                        alert("Something went wrong while updating the letter count.");
                    }
                } catch (error) {
                    console.error("Error submitting letter data:", error);
                }
            }
        });

        // Initialize counter securely on page load
        fetchLetterCount();
    </script>
</body>
