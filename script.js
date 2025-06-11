console.log("Script Loaded");

const API_BASE = "https://your-secure-api.com/api"; 
let stripe = Stripe("your-publishable-key"); 
let elements = stripe.elements();
let card = elements.create('card');
card.mount('#card-element');

// Load letter count
async function fetchLetterCount() {
    try {
        const response = await fetch(`${API_BASE}/letters/count`);
        const data = await response.json();
        const counterElement = document.getElementById('letterCount');
        const currentCount = parseInt(counterElement.textContent) || 0;
        animateCount(counterElement, currentCount, data.count);

    } catch (error) {
        console.error("Failed to fetch letter count", error);
    }
}

function animateCount(element, start, end, duration = 1000) {
    let startTime = null;

    function updateCount(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(updateCount);
        } else {
            // Add pulse effect on complete
            const parent = element.parentElement;
            parent.classList.add('pulse');
            setTimeout(() => parent.classList.remove('pulse'), 300);
        }

        document.getElementById('testCountUpdate').addEventListener('click', () => {
            const counterElement = document.getElementById('letterCount');
            const currentCount = parseInt(counterElement.textContent) || 0;
            const newCount = currentCount + 1;

            animateCount(counterElement, currentCount, newCount);
        });

// Show payment form
function openPaymentForm() {
    document.getElementById('payment-container').style.display = 'block';
}

// Attach event listener instead of inline `onclick`
document.getElementById('startGiving').addEventListener('click', openPaymentForm);

// Handle Payment Submission
document.getElementById('paymentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;

    try {
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
            alert("Thank you for your GivingGram! Your letter will be delivered soon.");
            fetchLetterCount();
            document.getElementById('payment-container').style.display = 'none';
        }
    } catch (error) {
        console.error("Payment failed", error);
    }
});

// Fetch count on page load
fetchLetterCount();
