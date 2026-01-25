document.addEventListener("DOMContentLoaded", () => {
    console.log("Script Loaded");

    const API_BASE = "https://your-secure-api.com/api";
    const startButton = document.getElementById("startGiving");
    const paymentContainer = document.getElementById("payment-container");
    const paymentForm = document.getElementById("paymentForm");
    const emailInput = document.getElementById("email");
    const letterCountDisplay = document.getElementById("letterCount");
    const cardErrors = document.getElementById("card-errors");
    
    // Light and Dark themes
    const themeToggleBtn = document.getElementById("themeToggle");

    const toggleTheme = () => {
        const current = document.documentElement.getAttribute("data-theme") || "Light";
        const next = current === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    };

    // Update icon
    themeToggleBtn.textContent = next === "dark" ? "☀️" : "🌙";
    };

    themeToggleBtn.addEventListener("click", toggleTheme);

    // Load saved theme
    const savedTheme = localStorage.getItem("theme") || "Light";
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    }

    // Set correct icon on load
    themeToggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";

    
    let stripe = Stripe("your-publishable-key");
    let elements = stripe.elements();
    let card = elements.create("card");
    card.mount("#card-element");

    // Show payment form
    startButton.addEventListener("click", () => {
        paymentContainer.style.display = "block";
        paymentContainer.scrollIntoView({ behavior: "smooth" });
    });

    // Fetch letter count
    async function fetchLetterCount() {
        try {
            const response = await fetch(`${API_BASE}/letters/count`);
            const data = await response.json();
            letterCountDisplay.textContent = data.count;
        } catch (error) {
            console.error("Failed to fetch letter count", error);
        }
    }

    // Submit payment form
    paymentForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = emailInput.value;

        try {
            const response = await fetch(`${API_BASE}/create-payment-intent`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const { clientSecret } = await response.json();

            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: { email }
                }
            });

            if (error) {
                cardErrors.textContent = "There was an issue with your payment.";
            } else if (paymentIntent.status === "succeeded") {
                alert("Thank you for your GivingGram! Your letter will be delivered soon.");
                fetchLetterCount();
                paymentContainer.style.display = "none";
            }
        } catch (error) {
            console.error("Payment failed", error);
        }
    });

    // Load on page ready
    fetchLetterCount();
});
