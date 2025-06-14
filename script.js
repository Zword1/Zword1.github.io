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


function animateRollingCounter(newNumber) {
    const container = document.getElementById('letterCount');
    const newStr = String(newNumber);
    const oldCols = container.children;

    // If we need to add columns
    while (oldCols.length < newStr.length) {
        const column = document.createElement('div');
        column.className = 'digit-column';

        const strip = document.createElement('div');
        strip.className = 'digit-strip';

        for (let i = 0; i <= 9; i++) {
            const digitSpan = document.createElement('span');
            digitSpan.textContent = i;
            strip.appendChild(digitSpan);
        }

        column.appendChild(strip);
        container.appendChild(column);
    }

    // Update each digit column
    newStr.padStart(container.children.length, '0').split('').forEach((digit, idx) => {
        const column = container.children[idx];
        const strip = column.querySelector('.digit-strip');
        const target = parseInt(digit, 10);
        strip.style.transform = `translateY(-${target * 2.8}rem)`; // 2.8rem is the digit height
    });

    // If we need to remove extra columns
    while (container.children.length > newStr.length) {
        container.removeChild(container.lastChild);
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
