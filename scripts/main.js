const $myButton	   = $('#myButton');

const MAX_ATTEMPTS  = 7;
const MAX_DICTIONARY = 419; //obtained from xivapi.com

let currentWord;
let attempts = 0;

drawKeyboard();
startNewGame();

function startNewGame(){
    attempts = 0;
    $("#hangmanImg").attr("src", `images/hangman0.png`);
    let randomIndex = Math.floor(Math.random() * MAX_DICTIONARY);
    let getAPI = `https://xivapi.com/companion/${randomIndex}`;
    $.getJSON(getAPI).done(function( data ) {
        let description =  data.Description.replace(`Summon your ${data.Name} minion. `,``);
        description =  description.replace(`${data.Name}`," _____ ");
        currentWord = new Word(data.Name.toUpperCase(), description, data.Tooltip, data.IconHD);
        currentWord.printHint("#hint");    
        currentWord.printBlanks("#phrase");
    }).done(function() {
        if(currentWord.Name==="") {
            startNewGame();
            console.log("Blank data");
        }
    });
    $("#keyboard button").each(function(){
        $(this).removeAttr('disabled') 
        $(this).removeClass("strikethrough")
    });

}

$("#keyboard button").click(function(e){
    let $selfID = $("#"+e.target.id);
    $selfID.attr("disabled", "true");
    let selectedLetter = $selfID.text().trim();
    if(currentWord.key.includes(selectedLetter)){
        currentWord.reveal(selectedLetter, "#phrase");
        $("#audioConfirm").get(0).play();
    }else{
        attempts++;
        $("#hangmanImg").attr("src", `images/hangman${attempts}.png`);
        $("#hint img").css("opacity", (attempts/MAX_ATTEMPTS*.4));
        $selfID.addClass("strikethrough")
    }
    if(attempts < MAX_ATTEMPTS){
        currentWord.isCompleted() ? gameOver(true): "";
    }else{
        gameOver(false);
    }
});


$("#reset").click(function(e){   
    let $selfID = $("#"+e.target.id);
    $selfID.prop("disabled", true);
    startNewGame();
    setTimeout(function(){ 
        $selfID.removeAttr("disabled");
    }, 1500);
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

function gameOver(playerWon){
    if(playerWon){
        $("#gameOverMsg").html(
            `<h3>Congratulations!</h3>
            <p>You have won! Great job. Try again?</p>
            <p class="quote"><em>${currentWord.tooltip} </em></p>`)
    }else{
        $("#gameOverMsg").html(
            `<h3>Game Over.</h3>
            <p>Sorry, You have lost. </p>
            <p>The correct answer is <strong>${currentWord.key}</strong> </p>
            <p>Try again?</p>`)
        $("#audioError").get(0).play();
    }
    $('#gameOver').fadeIn(600);
}

$myButton.click(function(){
    
});
