const $testArea	   = $('#test-area');
const $myButton	   = $('#myButton');

const MAX_ATTEMPTS  = 7;
const MAX_DICTIONARY = 431; //obtained from xivapi.com
const $mainContent  = $('#main-content');

let dictionary
let currentWord = new Word("","","");
let attempts = 0;

drawKeyboard();
startNewGame();

function startNewGame(){
    attempts = 0;
    $("#hangmanImg").attr("src", `images/hangman0.png`);
    let randomIndex = Math.floor(Math.random() * MAX_DICTIONARY);
    let getAPI = `https://xivapi.com/companion/${randomIndex}`;
    $.getJSON(getAPI).done(function( data ) {
        currentWord = new Word(data.Name.toUpperCase(),
            data.Description.replace(`Summon your ${data.Name} minion. `,""),
            data.IconHD);
        currentWord.printHint("#hint");    
        currentWord.printBlanks("#phrase");
    });

    $("#keyboard button").each(function(){
        $(this).removeAttr('disabled')
    });
}


$("#keyboard button").click(function(e){
    let $buttonID = $("#"+e.target.id);
    $buttonID.attr("disabled", "true");
    let selectedLetter = $buttonID.text().trim();
    if(currentWord.key.includes(selectedLetter)){
        currentWord.reveal(selectedLetter, "#phrase");
    }else{
        attempts++;
        $("#hangmanImg").attr("src", `images/hangman${attempts}.png`);
        $("#hint img").css("opacity", (attempts/MAX_ATTEMPTS*.4));
    }
    //call function to check attempts/etc
    if(attempts < MAX_ATTEMPTS){
        if( currentWord.isCompleted()){
            gameOverScreen("win")
        }
    }else{
        gameOverScreen("lose");
    }
});

$("#reset").click(function(){    
    startNewGame();
});

function drawKeyboard(){
    let keyboard = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];
    keyboard.forEach(row => {        
        $("#keyboard").append("")
            row.forEach(letter => {
                $("#keyboard").append(`<button class="keyboard" id=key-${letter}> ${letter}</button>`);
            });
        $("#keyboard").append("<br />")
    });
}

function gameOverScreen(status){
    if(status === "win"){
        $("#gameOverMsg").html(
            `
            <h3>Congratulations</h3>
            <p>You have won! Great job. Try again?</p>
            `)
    }else{
        $("#gameOverMsg").html(
            `
            <h3>Game Over.</h3>
            <p>Sorry, You have lost. </p>
            <p>The correct answer is <strong>${currentWord.key}</strong> </p><p>Try again?</p>
            `)
    }
    $('#gameOver').fadeIn(600);
}

//button for testing things
$myButton.click(function(){
    gameOverScreen("win")
});
