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
        /* Reset and General Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Roboto', sans-serif;
            color: #fff;
            text-align: center;
        }

        /* Full-Width Hero Section */
        .hero {
            position: relative;
            width: 100vw;
            height: 100vh;
            background: url('images/GivingGramWebsitePicture.JPG') no-repeat center center/cover;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
        }

        .hero h1 {
            font-size: 3rem;
            font-weight: 700;
            margin: 0;
        }

        .hero p {
            font-size: 1.5rem;
            font-style: italic;
            margin-top: 10px;
        }

        .cta-button {
            background-color: #58d68d;
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.2rem;
            cursor: pointer;
            margin-top: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transition: transform 0.2s, background-color 0.3s;
        }

        .cta-button:hover {
            background-color: #4cae4c;
            transform: translateY(-3px);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }

            .hero p {
                font-size: 1.2rem;
            }

            .cta-button {
                font-size: 1rem;
                padding: 12px 25px;
            }
        }
    </style>
</head>

<body>

    <!-- Hero Section -->
    <header class="hero">
        <h1>GivingGrams</h1>
        <p>The Gram that keeps on Giving</p>
        <button class="cta-button" onclick="openPaymentForm()">Start Giving</button>
    </header>

    <script>
        function openPaymentForm() {
            alert("Redirecting to the payment form...");
        }
    </script>

</body>
</html>
