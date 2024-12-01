<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GivingGrams - The Gram That Keeps on Giving</title>
    <script src="https://js.stripe.com/v3/"></script> <!-- Stripe Library -->
    <style>
        :root {
            --background-light: #ffffff;
            --background-dark: #121212;
            --text-light: #333;
            --text-dark: #ffffff;
            --primary-light: #5cb85c;
            --primary-dark: #4cae4c;
        }

        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            text-align: center;
            background-color: var(--background-light);
            color: var(--text-light);
        }

        header, footer, .info-section {
            background-color: var(--background-light);
            color: var(--text-light);
        }

        header {
            position: relative;
            background-image: url('your-image.jpg'); /* Replace with your image URL */
            background-size: cover;
            background-position: center;
            height: 350px;
            color: white;
        }

        .dark-mode {
            --background-light: #121212;
            --background-dark: #ffffff;
            --text-light: #ffffff;
            --text-dark: #333;
            --primary-light: #4cae4c;
            --primary-dark: #5cb85c;
        }

        header h1, header p {
            background: rgba(0, 0, 0, 0.5);
        }

        button {
            background-color: var(--primary-light);
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.2rem;
            cursor: pointer;
            margin-top: 20px;
            border-radius: 5px;
        }

        button:hover {
            background-color: var(--primary-dark);
        }

        .toggle-container {
            position: fixed;
            top: 10px;
            right: 10px;
        }

        .toggle-container input {
            display: none;
        }

        .toggle-container label {
            cursor: pointer;
            display: inline-block;
            background-color: var(--primary-light);
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
        }

        .toggle-container label:hover {
            background-color: var(--primary-dark);
        }
    </style>
</head>

<body>
    <!-- Light/Dark Mode Toggle -->
    <div class="toggle-container">
        <input type="checkbox" id="theme-toggle" />
        <label for="theme-toggle">Toggle Light/Dark</label>
    </div>

    <header>
        <h1>GivingGrams.com</h1>
        <p>The Gram that keeps on Giving!</p>
    </header>

    <main>
        <!-- Letter Counter -->
        <div class="letter-counter">
            <p><strong>Letter Counter</strong></p>
            <p id="letterCount">0</p>
        </div>

        <!-- Start Giving Button -->
        <button onclick="openPaymentForm()">Start Giving</button>

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
                <textarea id="optionalMessage" name="optionalMessage" rows="4" cols="50" placeholder="Write your message here..."></textarea>

                <!-- Payment Information -->
                <label for="card-element">Payment Details:</label>
                <div id="card-element"></div> <!-- Stripe Card Element -->
                <div id="card-errors" role="alert"></div><br>

                <button type="submit">Submit Payment</button>
            </form>
        </div>

        <!-- Info Section -->
        <section class="info-section">
            <h2>What We Do</h2>
            <p>GivingGrams is all about spreading positivity. You can send a heartfelt letter to anyone in the world with just a few clicks. 
                Choose a recipient, add a personal message (if you'd like), and we'll take care of the rest.</p>
            <p>Our goal is to make the world a better place, one letter at a time. Whether it’s to a friend, family member, or even a stranger, your GivingGram will bring joy and kindness to someone’s day.</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 GivingGrams.com</p>
        <p>Spread kindness, one letter at a time.</p>
    </footer>

    <script>
        // Light/Dark Mode Toggle
        const themeToggle = document.getElementById('theme-toggle');
        const userPref = localStorage.getItem('theme') || 'light';

        // Apply saved theme
        if (userPref === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.checked = true;
        }

        // Toggle theme and save preference
        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    </script>
</body>

</html>
