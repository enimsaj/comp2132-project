let popup = setTimeout(function(){ 
    $('#instructions').fadeIn(1200);
}, 500);

$('#closeInstructions').click ( function() {
    $('#instructions').fadeOut(600);
});

$('#showInstructions').click ( function() {
    $('#instructions').fadeIn(600);
});

$('#closeGameOver').click ( function() {
    $('#gameOver').fadeOut(300);
    startNewGame();
});


