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
    container.setAttribute("data-count", newCount); // track the current count

    const newDigits = String(newCount).padStart(3, '0').split('');
    container.innerHTML = ''; // Clear existing content

    newDigits.forEach((digit, i) => {
        const digitWrapper = document.createElement('div');
        digitWrapper.className = 'digit-column';

        for (let n = 0; n <= 9; n++) {
            const span = document.createElement('span');
            span.textContent = n;
            digitWrapper.appendChild(span);
        }

        container.appendChild(digitWrapper);

        // Animate scroll to the new digit
        requestAnimationFrame(() => {
            digitWrapper.style.transform = `translateY(-${digit * 10}%)`;
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
                   // Option 1: increment manually
                   const current = parseInt(document.getElementById("letterCount").getAttribute("data-count")) || 0;
                   animateRollingCounter(current + 1);

                   // Option 2 (preferred): re-fetch from backend
                   // fetchLetterCount();

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
