let mainContainer = document.getElementById("main_container");
let fadeStep = 0.05;
let fadeInterval = 12;

let hiragana = ['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','を','ん','が','ぎ','ぐ','げ','ご','ざ','じ','ず','ぜ','ぞ','だ','ぢ','づ','で','ど','ば','び','ぶ','べ','ぼ','ぱ','ぴ','ぷ','ぺ','ぽ'];
let katakana = ['ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ','タ','チ','ツ','テ','ト','ナ','ニ','ヌ','ネ','ノ','ハ','ヒ','フ','ヘ','ホ','マ','ミ','ム','メ','モ','ヤ','ユ','ヨ','ラ','リ','ル','レ','ロ','ワ','ヲ','ン','ガ','ギ','グ','ゲ','ゴ','ザ','ジ','ズ','ゼ','ゾ','ダ','ヂ','ヅ','デ','ド','バ','ビ','ブ','ベ','ボ','パ','ピ','プ','ペ','ポ'];
let romanji = ['a','i','u','e','o','ka','ki','ku','ke','ko','sa','shi','su','se','so','ta','chi','tsu','te','to','na','ni','nu','ne','no','ha','hi','fu','he','ho','ma','mi','mu','me','mo','ya','yu','yo','ra','ri','ru','re','ro','wa','wo','n','ga','gi','gu','ge','go','za','ji','zu','ze','zo','da','ji','dzu','de','do','ba','bi','bu','be','bo','pa','pi','pu','pe','po'];

let script = "Hiragana";
let studyStyle = "Romanji";


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

//Generates the study screen //TODO
function generateStudyScreenHTML(){
    mainContainer.innerHTML = "";
    //TODO  "Go Back" arrow to return to option select

    //TODO big main card container -> this is the symbol the user is studying

    //TODO 6 small cards under (2 rows, 3 columns) -> these are the options to guess from (indentify script options)
    
    //TODO text box (manual typing option)
    

}

//Logic of the study game
function study(){

}

//Update which script is selected
document.querySelectorAll('input[name="script_select"]').forEach((elem) => {
    elem.addEventListener("change", function(event) {
        var scriptOption = event.target.value;
        script = scriptOption;
        if(scriptOption=="Hiragana"){
            document.getElementById("japanese-lbl").innerHTML = "Identify Katakana";
        }else{
            document.getElementById("japanese-lbl").innerHTML = "Identify Hiragana";
        }

    });
});



//Update which study stype is selected
document.querySelectorAll('input[name="study_select"]').forEach((elem) => {
    elem.addEventListener("change", function(event) {
        var style = event.target.value;
        studyStyle = style;
    });
});


document.getElementById("study").addEventListener("click", async function(){
    
   // let studyHTML = generateStudyScreenHTML();
    //fadeToNewHTML(mainContainer,studyHTML,0.1);
    await fade(mainContainer, 1);
    //set mainContainer to hidden
    mainContainer.innerHTML = "UHHHHHHHH I THINK SOO";
    await unfade(mainContainer, 10);


});


