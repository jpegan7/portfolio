<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Learn Japanese!</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">


</head>

<body class="default-body">
    <div class="container" id="main_container">
        <div class="container" id="script_option" value="Hiragana">
            <p>Select which script you want to study</p>
            <div class="form-check form-check-inline">
                <input type="radio" name="script_select" id="hiragana" value="Hiragana" class="btn-check"
                    autocomplete="off" checked>
                <label for="hiragana" class="btn btn-outline-dark">Hiragana</label>


                <input type="radio" name="script_select" id="katakana" value="Katakana" class="btn-check"
                    autocomplete="off">
                <label for="katakana" class="btn btn-outline-dark">Katakana</label>
            </div>
        </div>

        <div class="container">
            <p>Select your studying style</p>

            <div class="form-check form-check-inline">
                <input type="radio" name="study_select" id="romanji" value="Romanji" class="btn-check"
                    autocomplete="off" checked>
                <label for="romanji" class="btn btn-outline-dark">Identify Romanji</label>

                <input type="radio" name="study_select" id="japanese" value="Japanese" class="btn-check"
                    autocomplete="off">
                <label for="japanese" id="japanese-lbl" class="btn btn-outline-dark">Identify Katakana</label>

                <input type="radio" name="study_select" id="type" value="Type" class="btn-check" autocomplete="off">
                <label for="type" class="btn btn-outline-dark">Manually Type</label>

            </div>

        </div>




        <div class="container">
            <button id="study" class="btn btn-primary btn-lg">Study</button>
        </div>
    </div>


    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous">
    </script>

    <script src="js/japanese.js"></script>
</body>

</html>