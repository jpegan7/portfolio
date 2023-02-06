<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Weather Forecast</title>
    
    <link rel="stylesheet" href="css/styles.css">
    <link href="css/weather.css" rel="stylesheet" type="text/css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
</head>

<body class="default-body">
<a href="/" class="home_button"> <img class="home_button_image" src="images/home1.png" alt="home"
            style="background-color: transparent;" /></a>
    <div class="container" id="main_container">

        <input type="radio" id="city" name="inputType" checked />
        <label for="city">City Name</label></br>

        <input type="radio" id="zip" name="inputType" />
        <label for="zip">Zip Code</label></br>

        <input type="radio" id="coordinates" name="inputType" />
        <label for="coordinates">Coordinates (latitude longitude)</label></br>

        </br>
        <input type="text" id="input" />
        <button id="submit">Submit</button>


        <div id="err"></div>

        <div class="container" id="result"></div>
    </div>
    <script src="https://code.jquery.com/jquery-3.4.1.js"
        integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous">
    </script>
    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous">
    </script>
    <script src="js/weather.js"></script>
</body>

</html>