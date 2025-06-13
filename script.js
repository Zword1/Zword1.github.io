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

let countAnimationFrame;

function animateLetterCounter(element, endValue, duration = 1000) {
    if (countAnimationFrame) cancelAnimationFrame(countAnimationFrame);

    const startValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
    const startTime = performance.now();

    element.parentElement.classList.add('pulse'); // Add pulse class for visual effect

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(startValue + (endValue - startValue) * progress);
        element.textContent = value.toLocaleString();

        if (progress < 1) {
            countAnimationFrame = requestAnimationFrame(update);
        } else {
            // Remove the glow effect after a brief delay
            setTimeout(() => {
                element.parentElement.classList.remove('pulse');
            }, 300);
        }
    }

    countAnimationFrame = requestAnimationFrame(update);
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
            // Update counter with animation instead of static fetch
            const counterEl = document.getElementById('letterCount');
            const currentCount = parseInt(counterEl.textContent.replace(/,/g, '')) || 0;
            const newCount = currentCount + 1; // or whatever you get from the server
            animateLetterCounter(counterEl, newCount);

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
    const start = parseInt(el.textContent.replace(/,/g, '')) || 0;
    animateLetterCounter(el, start + 1);
});
