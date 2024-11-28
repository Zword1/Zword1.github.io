<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GivingGrams - The Gram That Keeps on Giving</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            text-align: center;
            color: #333;
        }

        header {
            position: relative;
            background-image: url('images/ZePrint3DLogo.png.jpg'); /* Placeholder for a header image */
            background-size: cover;
            background-position: center;
            height: 500px;
            color: white;
        }

        header .site-title {
            position: absolute;
            top: 20px;
            left: 20px;
            font-size: 1.8rem;
            font-weight: bold;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 5px 10px;
            border-radius: 5px;
        }

        header .slogan {
            position: absolute;
            bottom: 20px;
            width: 100%;
            font-size: 1.2rem;
            font-style: italic;
            text-align: center;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 10px 0;
        }

        main {
            padding: 20px;
        }

        .letter-counter {
            font-size: 1.5rem;
            margin: 20px 0;
        }

        button {
            background-color: #5cb85c;
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.2rem;
            cursor: pointer;
            border-radius: 5px;
            margin-top: 20px;
        }

        button:hover {
            background-color: #4cae4c;
        }

        #form-container {
            margin-top: 30px;
        }

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }

        input, textarea {
            width: 90%;
            max-width: 400px;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        footer {
            background: #f1f1f1;
            padding: 20px;
            margin-top: 30px;
        }

        footer p {
            margin: 5px;
            font-size: 0.9rem;
            color: #666;
        }

        .info-section {
            padding: 20px;
            background-color: #f9f9f9;
            text-align: left;
            margin-top: 30px;
        }
    </style>
</head>

<body>
    <header>
        <div class="site-title">GivingGrams.com</div>
        <div class="slogan">The Gram that keeps on Giving!</div>
    </header>

    <main>
        <div class="letter-counter">
            <p><strong>Letter Counter</strong></p>
            <p id="letterCount">0</p>
        </div>

        <button onclick="openForm()">Start Giving</button>

        <div id="form-container" style="display:none;">
            <h2>Send a GivingGram</h2>
            <form id="givingForm">
                <label for="recipient">Recipient's Name:</label>
                <input type="text" id="recipient" name="recipient" required>

                <label for="address">Recipient's Address:</label>
                <input type="text" id="address" name="address" required>

                <label for="message">Your Message (optional):</label>
                <textarea id="message" name="message" rows="4" cols="50" placeholder="Write your message here..."></textarea>

                <label for="payment">Payment Information:</label>
                <input type="text" id="payment" name="payment" placeholder="Card Number" required>

                <button type="submit">Submit</button>
            </form>
        </div>

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
        let letterCount = 0;

        function openForm() {
            document.getElementById('form-container').style.display = 'block';
        }

        document.getElementById('givingForm').addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent form submission
            alert("Thank you for your GivingGram! Your letter will be delivered soon.");
            letterCount++;
            document.getElementById('letterCount').textContent = letterCount;
            document.getElementById('form-container').style.display = 'none'; // Hide the form
        });
    </script>
</body>

</html>
