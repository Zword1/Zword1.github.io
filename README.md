<!DOCTYPE html>
<html lang="en">

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
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        /* General Styles */
        body {
            font-family: 'Roboto', sans-serif;
            margin: 0;
            padding: 0;
            text-align: center;
            color: #333;
            background: linear-gradient(135deg, #e8f6ef, #a9dfbf);
        }

        header {
            background: linear-gradient(135deg, #58d68d, #2ecc71);
            color: white;
            padding: 40px 20px;
        }

        header h1 {
            margin: 0;
            font-size: 2.5rem;
            font-weight: 700;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        header p {
            margin-top: 10px;
            font-size: 1.2rem;
            font-weight: 300;
        }

        main {
            padding: 20px;
        }

        /* Letter Counter */
        .letter-counter {
            margin: 40px 0;
        }

        .letter-counter p {
            margin: 5px 0;
            font-size: 1.5rem;
            font-weight: 700;
        }

        #letterCount {
            font-size: 2.5rem;
            color: #2ecc71;
        }

        /* Button */
        button {
            background: #58d68d;
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.2rem;
            cursor: pointer;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s, background-color 0.3s;
        }

        button:hover {
            background: #2ecc71;
            transform: translateY(-3px);
        }

        /* Payment Form */
        #payment-container {
            display: none;
            background: white;
            padding: 30px;
            margin: 30px auto;
            width: 90%;
            max-width: 500px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        label {
            display: block;
            margin: 10px 0 5px;
            font-weight: bold;
            color: #333;
        }

        input, textarea {
            width: 100%;
            padding: 10px;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-bottom: 15px;
        }

        input:focus, textarea:focus {
            border-color: #2ecc71;
            outline: none;
            box-shadow: 0 0 5px rgba(46, 204, 113, 0.5);
        }

        #card-errors {
            color: red;
            margin-top: 10px;
        }

        /* Info Section */
        .info-section {
            background: #f9f9f9;
            padding: 30px;
            margin-top: 30px;
            border-radius: 10px;
            text-align: left;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .info-section h2 {
            color: #2ecc71;
            font-weight: 700;
            margin-bottom: 10px;
        }

        .info-section p {
            font-size: 1rem;
            color: #555;
            line-height: 1.6;
        }

        /* Footer */
        footer {
            background: #333;
            color: white;
            padding: 20px;
            margin-top: 30px;
        }

        footer p {
            margin: 5px 0;
            font-size: 0.9rem;
        }
    </style>
</head>

<body>
    <header>
        <h1>GivingGrams.com</h1>
        <p>The Gram that Keeps on Giving</p>
    </header>

    <main>
        <!-- Letter Counter -->
        <div class="letter-counter">
            <p><strong>Letters Sent</strong></p>
            <p id="letterCount">0</p>
        </div>

        <!-- Start Giving Button -->
        <button onclick="openPaymentForm()">Start Giving</button>

        <!-- Payment Form -->
        <div id="payment-container">
            <h2>Complete Your GivingGram</h2>
            <form id="paymentForm">
                <label for="recipientName">Recipient's Name:</label>
                <input type="text" id="recipientName" name="recipientName" required>

                <label for="recipientAddress">Recipient's Address:</label>
                <input type="text" id="recipientAddress" name="recipientAddress" required>

                <label for="email">Your Email Address:</label>
                <input type="email" id="email" name="email" required>

                <label for="optionalMessage">Your Personal Message (optional):</label>
                <textarea id="optionalMessage" name="optionalMessage" rows="4" placeholder="Write your message here..."></textarea>

                <label for="card-element">Payment Details:</label>
                <div id="card-element"></div> 
                <div id="card-errors" role="alert"></div><br>

                <button type="submit">Submit Payment</button>
            </form>
        </div>

        <!-- Info Section -->
        <section class="info-section">
            <h2>What We Do</h2>
            <p>GivingGrams is all about spreading positivity. You can send a heartfelt letter to anyone in the world with just a few clicks.</p>
            <p>Choose a recipient, add a personal message (if you'd like), and we'll take care of the rest. Make someone's day brighter today!</p>
        </section>
    </main>

    <footer>
        <p>Spread kindness, one letter at a time.</p>
    </footer>

    <script>
        // Script functionality remains unchanged
    </script>
</body>
</html>
