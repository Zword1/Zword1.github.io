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
        <textarea id="optionalMessage" name="optionalMessage" rows="4" cols="50" placeholder="Write your message here..."
                  oninput="validateMessage(this, 50, 250)"></textarea>
        <p id="messageFeedback">You can write up to 50 words and 250 letters.</p>

        <!-- Payment Information -->
        <label for="card-element">Payment Details:</label>
        <div id="card-element"></div>
        <!-- Stripe Card Element -->
        <div id="card-errors" role="alert"></div><br>

        <button type="submit">Submit Payment</button>
    </form>
</div>

<script>
    const API_BASE = "http://localhost:3000/api"; // Replace with your backend URL
    const stripe = Stripe("your-publishable-key"); // Replace with your Stripe publishable key
    const elements = stripe.elements();
    const card = elements.create('card');
    card.mount('#card-element');

    // Validate email and recipient address
    function validateForm() {
        const email = document.getElementById('email').value;
        const recipientAddress = document.getElementById('recipientAddress').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        if (recipientAddress.trim().length < 5) {
            alert("Please enter a valid recipient address.");
            return false;
        }

        return true;
    }

    // Validate word and letter limits in the optional message
    function validateMessage(textarea, maxWords, maxLetters) {
        const words = textarea.value.split(/\s+/).filter(word => word.length > 0);
        const letters = textarea.value.replace(/\s/g, '').length; // Count letters excluding spaces
        const feedback = document.getElementById("messageFeedback");

        if (words.length > maxWords || letters > maxLetters) {
            textarea.value = textarea.value.slice(0, maxLetters).split(/\s+/).slice(0, maxWords).join(" ");
            feedback.textContent = `Message adjusted: Max ${maxWords} words and ${maxLetters} letters allowed.`;
            feedback.style.color = "red";
        } else {
            feedback.textContent = `You can write up to ${maxWords - words.length} more words and ${maxLetters - letters} more letters.`;
            feedback.style.color = "black";
        }
    }

    // Handle form submission with validation and payment
    document.getElementById('paymentForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Stop submission if validation fails

        const email = document.getElementById('email').value;

        try {
            // Dynamically fetch the client secret from the backend
            const clientSecretResponse = await fetch(`${API_BASE}/payment/intent`, { method: "POST" });
            const { clientSecret } = await clientSecretResponse.json();

            // Confirm card payment
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
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
                    await fetchLetterCount(); // Update the letter counter
                    document.getElementById('payment-container').style.display = 'none';
                } else {
                    alert("Something went wrong while updating the letter count.");
                }
            }
        } catch (err) {
            alert("An error occurred: " + err.message);
        }
    });

    // Fetch the current letter count
    async function fetchLetterCount() {
        try {
            const response = await fetch(`${API_BASE}/letters/count`);
            const data = await response.json();
            document.getElementById('letterCount').textContent = data.count;
        } catch (err) {
            console.error("Error fetching letter count:", err);
        }
    }
</script>
