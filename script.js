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
        animateRollingCounter(data.count);
    } catch (error) {
        console.error("Failed to fetch letter count", error);
    }
}

function animateRollingCounter(newCount) {
    const container = document.getElementById('letterCount');
    const oldCount = parseInt(container.getAttribute("data-count")) || 0;
    container.setAttribute("data-count", newCount);

    const digits = String(newCount).padStart(3, '0').split('');
    container.innerHTML = ''; // Clear old content

    digits.forEach((digit, i) => {
        const column = document.createElement('div');
        column.className = 'digit-column';

        const inner = document.createElement('div');
        inner.style.transition = 'transform 0.5s ease-in-out';

        for (let d = 0; d <= 9; d++) {
            const span = document.createElement('span');
            span.textContent = d;
            inner.appendChild(span);
        }

        column.appendChild(inner);
        container.appendChild(column);

        // Animate to correct position
        requestAnimationFrame(() => {
            inner.style.transform = `translateY(-${digit * 100}%)`;
        });
    });
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
                   const current = parseInt(document.getElementById("letterCount").getAttribute("data-count")) || 0;
                   animateRollingCounter(current + 1); 
                   // or call fetchLetterCount()
                   document.getElementById('payment-container').style.display = 'none';
          }


        } catch (error) {
            console.error("Payment failed", error);
          }
});

// Fetch count on page load
fetchLetterCount();

document.getElementById('startGiving').addEventListener('dblclick', () => {
    const current = parseInt(document.getElementById("letterCount").getAttribute("data-count")) || 0;
    animateRollingCounter(current + 1);
});
