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

function animateDigitCounter(newNumber) {
    const container = document.getElementById('letterCount');
    const newStr = String(newNumber).padStart(container.childElementCount, '0');

    // Clear if necessary
    container.innerHTML = '';

    for (let i = 0; i < newStr.length; i++) {
        const digitContainer = document.createElement('span');
        digitContainer.className = 'digit-container';

        const digitSpan = document.createElement('span');
        digitSpan.className = 'digit';
        digitSpan.textContent = newStr[i];

        // Start slightly below and animate up
        digitSpan.style.transform = 'translateY(100%)';
        digitContainer.appendChild(digitSpan);
        container.appendChild(digitContainer);

        requestAnimationFrame(() => {
            digitSpan.style.transform = 'translateY(0%)';
        });
    }
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
         // Simulate new letter count (you can get this from API)
        const el = document.getElementById('letterCount');
        const current = parseInt(el.textContent.replace(/,/g, '')) || 0;
        const updated = current + 1;

        animateDigitCounter(updated);

        document.getElementById('payment-container').style.display = 'none';
        }
    } catch (error) {
        console.error("Payment failed", error);
    }
});

// Fetch count on page load
fetchLetterCount();

document.getElementById('testCountUpdate').addEventListener('click', () => {
    const el = document.getElementById('letterCount');
    const current = parseInt(el.textContent.replace(/,/g, '')) || 0;
    animateDigitCounter(current + 1);
});
