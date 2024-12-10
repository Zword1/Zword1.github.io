<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GivingGrams - The Gram That Keeps on Giving</title>
    <script src="https://js.stripe.com/v3/"></script> <!-- Stripe Library -->
    <style>
        :root {
            /* Light Mode Variables */
            --bg-color: #ffffff;
            --text-color: #333333;
            --header-bg: url('images/ZePrint3DLogo.png.jpg');
            --header-text-color: white;
            --button-bg: #5cb85c;
            --button-bg-hover: #4cae4c;
            --input-bg: #ffffff;
            --footer-bg: #f1f1f1;
        }

        [data-theme="dark"] {
            /* Dark Mode Variables */
            --bg-color: #1a1a1a;
            --text-color: #e0e0e0;
            --header-bg: url('images/ZePrint3DLogo-dark.png'); /* Optional: Add a dark version of the image */
            --header-text-color: #cccccc;
            --button-bg: #444444;
            --button-bg-hover: #555555;
            --input-bg: #333333;
            --footer-bg: #2c2c2c;
        }

        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            text-align: center;
            color: var(--text-color);
            background-color: var(--bg-color);
        }

        header {
            position: relative;
            background-image: var(--header-bg);
            background-size: cover;
            background-position: center;
            height: 400px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: var(--header-text-color);
        }

        button {
            background-color: var(--button-bg);
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.2rem;
            cursor: pointer;
            margin-top: 20px;
            border-radius: 5px;
        }

        button:hover {
            background-color: var(--button-bg-hover);
        }

        input, textarea {
            background-color: var(--input-bg);
            color: var(--text-color);
        }

        footer {
            background-color: var(--footer-bg);
        }

        #theme-toggle {
            position: absolute;
            top: 20px;
            right: 20px;
            background-color: transparent;
            border: 2px solid var(--text-color);
            color: var(--text-color);
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
        }

        #theme-toggle:hover {
            background-color: var(--text-color);
            color: var(--bg-color);
        }
    </style>
</head>

<body>
    <header>
        <h1>GivingGrams.com</h1>
        <p>The Gram that keeps on Giving!</p>
        <!-- Theme Toggle Button -->
        <button id="theme-toggle">Switch to Dark Mode</button>
    </header>

    <main>
        <!-- Existing content remains unchanged -->
    </main>

    <footer>
        <p>Spread kindness, one letter at a time.</p>
    </footer>

    <script>
        const themeToggle = document.getElementById('theme-toggle');
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);

        // Update button text based on the current theme
        themeToggle.textContent = currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';

        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme); // Save theme preference
            themeToggle.textContent = newTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        });
    </script>
</body>

</html>
