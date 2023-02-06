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

</head>

<body class="default-body">


    <div class="container" style="    position: absolute;top: 45%;left: 50%;transform: translate(-50%, -50%);">
        <h1>Welcome to my website!</h1>
        <h3>Check out one of my projects:</h3>
        <div class="links" style="margin-top:20px;text-decoration:none;">
            
            <a href="/japanese" style="text-decoration:none;">Learn Japanese</a>
            <br/>
            <a href="/gridsearch" style="text-decoration:none;">Grid Search</a>
            <br/>
            <a href="/weather" style="text-decoration:none;">Weather Forecast</a>

        </div>
    </div>

    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous">
    </script>
</body>

</html>