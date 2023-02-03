//  Relevant elements to manipulate
let optionsMainContainer = document.getElementById("options_main_container");
let studyMainContainer = document.getElementById("study_main_container");
let mainCardElem = document.getElementById("study_card_body");
let guessesElems = [document.getElementById("guess1"), document.getElementById("guess2"), document.getElementById("guess3"), document.getElementById("guess4"), document.getElementById("guess5"), document.getElementById("guess6")];
let counterElem = document.getElementById("counter");

//  Fade options
let fadeStep = 0.05;
let fadeInterval = 12;

//  Character sets
let hiragana = ['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','を','ん','が','ぎ','ぐ','げ','ご','ざ','じ','ず','ぜ','ぞ','だ','ぢ','づ','で','ど','ば','び','ぶ','べ','ぼ','ぱ','ぴ','ぷ','ぺ','ぽ'];
let katakana = ['ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ','タ','チ','ツ','テ','ト','ナ','ニ','ヌ','ネ','ノ','ハ','ヒ','フ','ヘ','ホ','マ','ミ','ム','メ','モ','ヤ','ユ','ヨ','ラ','リ','ル','レ','ロ','ワ','ヲ','ン','ガ','ギ','グ','ゲ','ゴ','ザ','ジ','ズ','ゼ','ゾ','ダ','ヂ','ヅ','デ','ド','バ','ビ','ブ','ベ','ボ','パ','ピ','プ','ペ','ポ'];
let romanji = ['a','i','u','e','o','ka','ki','ku','ke','ko','sa','shi','su','se','so','ta','chi','tsu','te','to','na','ni','nu','ne','no','ha','hi','fu','he','ho','ma','mi','mu','me','mo','ya','yu','yo','ra','ri','ru','re','ro','wa','wo','n','ga','gi','gu','ge','go','za','ji','zu','ze','zo','da','ji','dzu','de','do','ba','bi','bu','be','bo','pa','pi','pu','pe','po'];

//  Variables to keep track of the random order we will study the characters
let studyOrder;
let currentCharacterIndex;

//  Option variables
let studyScript = hiragana; //main script to show on main card
let oppositeScript = katakana;  //opposite japanese script of main script
let guessScript = romanji;  //script to show on guess buttons
let studyStyle = "Romanji"; 

//  Study counter
let count = 1;


// Sleep for 'ms' microseconds
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fade(htmlElement, fadeTime){
    let fadeStep = 0.05;
    let fadeInterval = fadeTime/fadeStep;

    if (!htmlElement.style.opacity) {
        htmlElement.style.opacity = 1;
    }

    let currentOpacity = 1;
    //fade
    while(htmlElement.style.opacity > 0){
        currentOpacity-=fadeStep;
        htmlElement.style.opacity = currentOpacity;
        await sleep(fadeInterval);
    }

}

async function unfade(htmlElement, fadeTime){
    let fadeStep = 0.05;
    let fadeInterval = fadeTime/fadeStep;

    if (!htmlElement.style.opacity) {
        htmlElement.style.opacity = 0;
    }

    let currentOpacity = 0;

    while(htmlElement.style.opacity < 1){
        currentOpacity+=fadeStep;
        htmlElement.style.opacity = currentOpacity;
        await sleep(fadeInterval);
    }

}

//Randomly shuffles 'array'
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }



function setStudyBoard(studyCharacterSet, guessCharacterSet, newCharacterIndex, mainCard, guesses){
    //Set main card to new character
    mainCard.innerHTML = studyCharacterSet[newCharacterIndex];

    //Randomly pick a guess slot to put correct answer
    let correctGuessIndex = Math.floor(Math.random()*(guesses.length - 1));
    guesses[correctGuessIndex].innerHTML = guessCharacterSet[newCharacterIndex];

    //fill in other guess slots with random characters
    let thisCharacterIndex;
    let duplicate;
    for(let i=0; i<guesses.length; i++){
        if(i!=correctGuessIndex){
            do{
                //assume it's not a duplicate
                duplicate = false;

                //pick random character
                thisCharacterIndex = Math.floor(Math.random()*studyCharacterSet.length);

                //check if duplicate
                for(let j=0; j<i; j++){
                    if(guesses[j].innerHTML == guessCharacterSet[thisCharacterIndex])
                        duplicate = true;
                }

            // repeat if it's a duplicate
            }while(duplicate);//{
            
            guesses[i].innerHTML = guessCharacterSet[thisCharacterIndex];
        }
    }
}

//Update which script is selected
document.querySelectorAll('input[name="script_select"]').forEach((elem) => {
    elem.addEventListener("change", function(event) {

        var scriptOption = event.target.value;
        if(scriptOption=="Hiragana"){
            document.getElementById("japanese-lbl").innerHTML = "Identify Katakana";
            studyScript = hiragana;
            oppositeScript = katakana;
        }else{
            document.getElementById("japanese-lbl").innerHTML = "Identify Hiragana";
            studyScript = katakana;
            oppositeScript = hiragana;
        }

    });
});

//Update which study type is selected
document.querySelectorAll('input[name="study_select"]').forEach((elem) => {
    elem.addEventListener("change", function(event) {
        var style = event.target.value;
        if(style == "Romanji"){
            guessScript = romanji;    
        }else if(style == "Japanese"){
            guessScript = oppositeScript;
        }

        studyStyle = style;
    });
});

//  Start game if user presses "Study" button
document.getElementById("study").addEventListener("click", async function(){
    
   // let studyHTML = generateStudyScreenHTML();
    //fadeToNewHTML(mainContainer,studyHTML,0.1);
    await fade(optionsMainContainer, 1);

    //set mainContainer to hidden
    optionsMainContainer.style.display = "none";

    studyOrder = [];
    for(let i=0; i<hiragana.length;i++)
        studyOrder.push(i);

    
    shuffle(studyOrder);
    currentCharacterIndex = studyOrder.pop();

    if(studyStyle == "Type"){
        //TODO
    }else{
        setStudyBoard(studyScript, guessScript, currentCharacterIndex, mainCardElem, guessesElems);
    }
    

    studyMainContainer.style.display = "block";

    await unfade(studyMainContainer, 1);
    //mainContainer.style.display = "initial";
});


//  Handle guess buttons
document.querySelectorAll(".guess").forEach((btn) => {
    btn.addEventListener("click", function(){  
        let guessIndex = guessScript.indexOf(btn.innerHTML);

        if(guessIndex == currentCharacterIndex){    //Correct guess!
            currentCharacterIndex = studyOrder.pop();
            setStudyBoard(studyScript, guessScript, currentCharacterIndex, mainCardElem, guessesElems);
            counterElem.innerHTML = count++ + "/" + studyScript.length;

        }else{  //Incorrect...
            
        }

        

    });
});


