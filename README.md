<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hero 10</title>    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav class="navbar">
        <div class="left">
            <div class="logo">
                <h2>IT Support</h2>
                <p class="detail sm-hidden">24/7 IT Support All day Everyday</p>
            </div>
        </div>
        <div class="right">
            <div class="detail sm-hidden">081 200 4000 | help@itupport.com</div>
            <div class="menu">
                
             <ul class="menu-li">
                    <li>
                        <a href="" class="menu-link">Home</a>
                    </li>
                    <li>
                        <a href="" class="menu-link">Features</a>
                    </li>
                    <li>
                        <a href="" class="menu-link">Price</a>
                    </li>
                    <li>
                        <a href="" class="menu-link">Contact</a>
                    </li>
                    <li>
                        <a href="" class="menu-linkv lg-hidden">Book Appointment</a>
                    </li>
                    <li>
                        <a href="" class="menu-link btn-link sm-hidden">Book Appointment</a>
                    </li>
                </ul>                
                <button onclick="toggleMenu()" class="btn-menubar lg-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                        <path
                            d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                    </svg>
                </button>
            </div>
        </div>
    </nav>
    <header class="header"></header>
    <div class="row">
        <div class="col">
            <img src="./images/GivingGramWebsitePictures.jpg" alt="">
            <h3>Maintenance</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit, recusandae architecto repellat mollitia unde dolor!</p>
        </div>
        <div class="col">
            <img src="./images/img-2.jpg" alt="">
            <h3>Software</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit, recusandae architecto repellat mollitia unde dolor!</p>
        </div>
        <div class="col">
            <img src="./images/img-3.jpg" alt="">
            <h3>Hardware</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit, recusandae architecto repellat mollitia unde dolor!</p>
        </div>
    </div>
    <div class="call-now">
    <button class="btn-link">call now</button>

    </div>
    <script>
        function toggleMenu() {
            const menu_box = document.querySelector(".menu-li");
            const navbar = document.querySelector(".navbar");
            navbar.classList.toggle('active');
            menu_box.classList.toggle('active');
        }
    </script>
</body>
</html>
