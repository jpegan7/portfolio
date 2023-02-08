//  Relevant elements to manipulate
let optionsMainContainer = document.getElementById("options_main_container");
let studyMainContainer = document.getElementById("study_main_container");
let winMainContainer = document.getElementById("win_main_container");
let mainCardElem = document.getElementById("study_card_body");
let guessesContainer = document.getElementById("guesses_container");
let guessesElems = [document.getElementById("guess1"), document.getElementById("guess2"), document.getElementById("guess3"), document.getElementById("guess4"), document.getElementById("guess5"), document.getElementById("guess6")];
let textBoxContainer = document.getElementById("text_box_container");
let counterElem = document.getElementById("counter");

//  Character sets
let hiragana = ['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','を','ん','が','ぎ','ぐ','げ','ご','ざ','じ','ず','ぜ','ぞ','だ','ぢ','づ','で','ど','ば','び','ぶ','べ','ぼ','ぱ','ぴ','ぷ','ぺ','ぽ'];
let katakana = ['ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ','タ','チ','ツ','テ','ト','ナ','ニ','ヌ','ネ','ノ','ハ','ヒ','フ','ヘ','ホ','マ','ミ','ム','メ','モ','ヤ','ユ','ヨ','ラ','リ','ル','レ','ロ','ワ','ヲ','ン','ガ','ギ','グ','ゲ','ゴ','ザ','ジ','ズ','ゼ','ゾ','ダ','ヂ','ヅ','デ','ド','バ','ビ','ブ','ベ','ボ','パ','ピ','プ','ペ','ポ'];
let romanji = ['a','i','u','e','o','ka','ki','ku','ke','ko','sa','shi','su','se','so','ta','chi','tsu','te','to','na','ni','nu','ne','no','ha','hi','fu','he','ho','ma','mi','mu','me','mo','ya','yu','yo','ra','ri','ru','re','ro','wa','wo','n','ga','gi','gu','ge','go','za','ji','zu','ze','zo','da','di','dzu','de','do','ba','bi','bu','be','bo','pa','pi','pu','pe','po'];

//  Variables to keep track of the random order we will study the characters
let studyOrder;
let currentCharacterIndex;

//  Option variables
let studyScript = hiragana; //main script to show on main card
let oppositeScript = katakana;  //opposite japanese script of main script
let guessScript = romanji;  //script to show on guess buttons
let studyStyle = "Romanji"; 

//  Study counter
let count;

// Fade speed option
let fadeSpeed = 0.3;


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



function setButtonStudyBoard(studyCharacterSet, guessCharacterSet, newCharacterIndex, mainCard, guesses){
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

        if(studyStyle == "Japanese"){
            guessScript = oppositeScript;
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
    
    //let studyHTML = generateStudyScreenHTML();
    //fadeToNewHTML(mainContainer,studyHTML,0.1);
    await fade(optionsMainContainer, fadeSpeed);

    //set mainContainer to hidden
    optionsMainContainer.style.display = "none";

    studyOrder = [];
    for(let i=0; i<hiragana.length;i++)
        studyOrder.push(i);

    
    shuffle(studyOrder);
    currentCharacterIndex = studyOrder.pop();

    if(studyStyle == "Type"){
        //TODO
        textBoxContainer.style.display = "block";
        guessesContainer.style.display = "none";
        document.getElementById("back_button_study_text").style.display = "block";
        document.getElementById("back_button_study_buttons").style.display = "none";
        mainCardElem.innerHTML = studyScript[currentCharacterIndex];
        
    }else{

        guessesContainer.style.display = "block";
        textBoxContainer.style.display = "none";
        document.getElementById("back_button_study_buttons").style.display = "block";
        document.getElementById("back_button_study_text").style.display = "none";
        setButtonStudyBoard(studyScript, guessScript, currentCharacterIndex, mainCardElem, guessesElems);
    }
    
    count = 0;
    counterElem.innerHTML = count + "/" + studyScript.length;

    studyMainContainer.style.display = "block";

    await unfade(studyMainContainer, fadeSpeed);
    //mainContainer.style.display = "initial";
});


//  Handle back buttons
document.querySelectorAll(".back_button").forEach((back_btn) => {
    back_btn.addEventListener("click", async function(){

        let container;
        if(back_btn.id == "back_button_study_buttons" || back_btn.id == "back_button_study_text"){
            container = studyMainContainer;
        }else if(back_btn.id == "back_button_win"){
            container = winMainContainer;
        }

        await fade(container, fadeSpeed);
        
        container.style.display = "none";
        optionsMainContainer.style.display = "block";

        await unfade(optionsMainContainer, fadeSpeed);

    });
});


//  Handle guess buttons
document.querySelectorAll(".guess").forEach((btn) => {
    btn.addEventListener("click", function(){  

        let guessIndex = guessScript.indexOf(btn.innerHTML);

        if(guessIndex == currentCharacterIndex){    //Correct guess!

            //btn.style.animation="correct-button 0.3s";

            count++;
            if(count<studyScript.length){
                currentCharacterIndex = studyOrder.pop();
                setButtonStudyBoard(studyScript, guessScript, currentCharacterIndex, mainCardElem, guessesElems);
                counterElem.innerHTML = count + "/" + studyScript.length;
            }else{  //End of study session
                studyMainContainer.style.display = "none";
                winMainContainer.style.display = "block";

            }

        }else{  //Incorrect...
            btn.style.animation="incorrect-button 0.3s";
            
        }
    });
    btn.addEventListener("animationend", function() {
        btn.style.animation = "";
      });
});


function updateTextStudyBoard(textBox){

    if(textBox.value.toLowerCase() == romanji[currentCharacterIndex]){    //Correct
        count++;
        if(count<studyScript.length){
            currentCharacterIndex = studyOrder.pop();
            mainCardElem.innerHTML = studyScript[currentCharacterIndex];
            counterElem.innerHTML = count + "/" + studyScript.length;
            
        }else{   //End of study session
            studyMainContainer.style.display = "none";
            winMainContainer.style.display = "block";
        }

    }else{  //Incorrect
        textBox.style.animation = "incorrect-text 0.3s";
    }

    textBox.value='';
    
}

//  Handle guess text box
document.getElementById("guess_text_box").addEventListener("keydown", function(event){
    if(event.key=="Enter"){ 
        updateTextStudyBoard(this);
        
    }
});

document.getElementById("guess_text_box").addEventListener("animationend", function() {
    this.style.animation = "";
  });


document.getElementById("enter_button").addEventListener("click", function(){
    updateTextStudyBoard(document.getElementById("guess_text_box"));

});


