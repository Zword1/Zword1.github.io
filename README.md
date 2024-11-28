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
            background-image: url('your-image.jpg'); /* Placeholder for a header image */
            background-size: cover;
            background-position: center;
            height: 300px;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        header h1 {
            margin: 0;
            font-size: 2.5rem;
        }

        header p {
            margin: 0;
            font-size: 1.2rem;
            font-style: italic;
        }

        main {
            padding: 20px;
        }

        button {
            background-color: #5cb85c;
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.2rem;
            cursor: pointer;
            margin-top: 20px;
            border-radius: 5px;
        }

        button:hover {
            background-color: #4cae4c;
        }

        .letter-counter {
            margin: 30px 0;
            font-size: 1.5rem;
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
        <h1>GivingGrams.com</h1>
        <p>The Gram that keeps on Giving.</p>
    </header>

    <main>
        <button onclick="openForm()">Start Giving</button>

        <div id="form-container" style="display:none; margin-top:30px;">
            <h2>Send a GivingGram</h2>
            <form id="givingForm">
                <label for="recipient">Recipient's Name:</label><br>
                <input type="text" id="recipient" name="recipient" required><br><br>

                <label for="address">Recipient's Address:</label><br>
                <input type="text" id="address" name="address" required><br><br>

                <label for="message">Your Message (optional):</label><br>
                <textarea id="message" name="message" rows="4" cols="50" placeholder="Write your message here..."></textarea><br><br>

                <label for="payment">Payment Information:</label><br>
                <input type="text" id="payment" name="payment" placeholder="Card Number" required><br><br>

                <button type="submit">Submit</button>
            </form>
        </div>

        <div class="letter-counter">
            <p><strong>Letter Counter</strong></p>
            <p id="letterCount">0</p>
        </div>

        <section class="info-section">
            <h2>What We Do</h2>
            <p>GivingGrams is all about spreading positivity. You can send a heartfelt letter to anyone in the world with just a few clicks. 
                Choose a recipient, add a personal message (if you'd like), and we'll take care of the rest.</p>
            <p>Our goal is to make the world a better place, one letter at a time. Whether it’s to a friend, family member, or even a stranger, your GivingGram will bring joy and kindness to someone’s day.</p>
        </section>
    </main>

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
