<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GivingGrams - The Gram That Keeps on Giving</title>
    <script src="https://js.stripe.com/v3/"></script> <!-- Stripe Library -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
    <meta http-equiv="Content-Security-Policy" 
        content="default-src 'self'; script-src 'self' https://js.stripe.com; 
                 style-src 'self' 'unsafe-inline'; 
                 img-src 'self' data:; 
                 connect-src 'self' https://your-secure-api.com;">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
    <meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            margin: 0;
            padding: 0;
            text-align: center;
            color: #333;
            background: linear-gradient(135deg, #e8f6ef, #a9dfbf);
        }

        header {
            position: relative;
            background-image: url('images/GvingGramWebsitePicture.JPG');
            background-size: 100% 100%; /* Ensure the background image covers the header dimensions */
            background-position: center;
            width: 100%; /* Responsive width */
            max-width: 1200px;
            height: 400px; /* Explicit height control */
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: white;
        }

        header h1 {
            position: absolute;
            top: 20px;
            left: 20px;
            margin: 0;
            font-size: 1.5rem;
            text-shadow: 1px 1px 2px black;
        }

        header p {
            position: absolute;
            bottom: 20px;
            margin: 0;
            font-size: 1.2rem;
            font-style: italic;
            text-shadow: 1px 1px 2px black;
        }

        main {
            padding: 20px;
        }

        button {
            background-color: #58d68d;
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.2rem;
            cursor: pointer;
            margin-top: 20px;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s, background-color 0.3s;
        }

        button:hover {
            background-color: #4cae4c;
            transform: translateY(-3px);
        }

        #payment-container {
            display: none;
            margin-top: 30px;
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
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
        }

        input, textarea {
            width: 90%;
            max-width: 500px;
            margin-bottom: 15px;
            padding: 10px;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 5px;
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
    </style>
</head>
<body>
    <header>
        <h1>GivingGrams.com</h1>
        <p>The Gram that keeps on Giving!</p>
    </header>
    <main>
        <div class="letter-counter">
            <p><strong>Letters Sent</strong></p>
            <p id="letterCount">0</p>
        </div>
        <button onclick="openPaymentForm()">Start Giving</button>
        <div id="payment-container">
            <h2>Complete Your GivingGram</h2>
            <form id="paymentForm">
                <label for="recipientName">Recipient's Name:</label>
                <input type="text" id="recipientName" name="recipientName" required>
                <label for="email">Your Email Address:</label>
                <input type="email" id="email" name="email" required>
                <div id="card-element"></div>
                <div id="card-errors" role="alert"></div><br>
                <button type="submit">Submit Payment</button>
            </form>
        </div>
    </main>
</body>
</html>
