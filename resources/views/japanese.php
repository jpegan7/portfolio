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
    <link rel="stylesheet" href="css/japanese.css">


</head>

<body class="default-body">
    
    <a href="/" class="home_button"> <img class="home_button_image" src="images/home1.png" alt="home" style="background-color: transparent;"/></a>
    
    <div class="container" id="options_main_container">
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

    <div class="container" id="study_main_container" style="opacity:0;display:none;">
        
        <a href="/japanese" id="back_button"> <img id="back_button_image" src="images/left_arrow.png" alt="back" style="background-color: transparent;"/></a>

        <h1>0/46</h1>
        <div class="card" id="study_card">
            <div class="card-body" id="study_card_body">あ</div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col"><button class="btn btn-light guess" id="guess1">a</button></div>
                <div class="col"><button class="btn btn-light guess" id="guess2">b</button></div>
                <div class="col"><button class="btn btn-light guess" id="guess3">c</button></div>
            </div>
            <div class="row">
                <div class="col"><button class="btn btn-light guess" id="guess4">d</button></div>
                <div class="col"><button class="btn btn-light guess" id="guess5">e</button></div>
                <div class="col"><button class="btn btn-light guess" id="guess6">f</button></div>
            </div>
        </div>
    </div>


    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous">
    </script>

    <script src="js/japanese.js"></script>
</body>

</html>