<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>John's Website</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/home.css">

</head>

<body class="default-body">


    <div class="container" id="main-container">
        <h1>John Egan Web Projects</h1>
        <h3>Welcome! Check out one of my projects:</h3>
        <div id="links">
            <div class="container" class="link-container">
                <a href="/japanese" class="link">Learn Japanese</a>
                <p class="link-description">Learn Japanese characters! Written Japanese consists of 3 writing systems:
                    Hiragana, Katakana, and Kanji. Those starting out learning Japanese should learn Hiragana and
                    Katakana first: that's what this tool is for! Hiragana and Katakana characters are sonically
                    identical to eachother, they only have different visual designs. Choose to study Hiragana or
                    Katakana in this fun app! Created with JavaScript, HTML, CSS, and Bootstrap.</p>
            </div>
            <div class="container" class="link-container">
                <a href="/gridsearch" class="link">Grid Search</a>
                <p class="link-description">Check out some heuristic algorithms! Set up a start node and a goal node,
                    throw
                    some walls in the way and watch these search algorithms try to find a path to the goal. Compare the
                    algorithm's to see which is more efficient. Make sure to check out the A* algorithm, and mess around
                    with the different settings. Implemented in JavaScript, HTML, and CSS.</p>
            </div>
            <div class="container" class="link-container">
                <a href="/weather" class="link">Weather Forecast</a>
                <p class="link-description">Get your weather forecast! This project uses openweathermap.org's API to
                    acquire
                    your forecast for the next few days based on a city name, zipcode, or coordinates. Implemented with
                    JavaScript, JQuery, HTML, CSS, and Bootstrap.</p>
            </div>
        </div>
    </div>

    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous">
    </script>
</body>

</html>