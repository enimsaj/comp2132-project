let popup = setTimeout(function(){ 
    $('#instructions').fadeIn(1200);
}, 500);

let confirm = setTimeout(function(){ 
    $('#closeInstructions').removeAttr("disabled");
}, 1000);


$('#showInstructions').click ( function() {
    $('#instructions').fadeIn(600);
});

$('#closeInstructions').click ( function() {
    $("#audioClose").get(0).play();
    $('#instructions').fadeOut(100);
});
$('#closeGameOver').click ( function() {
    $('#gameOver').fadeOut(100);
    startNewGame();
});


