var gamePattern=[];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var toggle =false;
var count=-1;

$(document).keypress(function(){
    if(!toggle){
    nextSequence();
    toggle=true;
}
})

function nextSequence(){
    level++;
    $("h1").text("Level "+level);
    var randomNumber;
    randomNumber = Math.floor(Math.random() * (4 - 0) + 0);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    animatePress($(this));
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
})

function playSound(key) {
    var sound = `./sounds/${key}.mp3`;
    var audio = new Audio(sound);
    audio.play();
}
function animatePress(key) {
    key.addClass("pressed");
    setTimeout(function() { 
    key.removeClass("pressed");
    }, 100);
}
function checkAnswer(count){
    if(gamePattern[count]===userClickedPattern[count]){
        console.log("suc")
        if (gamePattern.length===userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
            userClickedPattern=[];
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() { 
            $("body").removeClass("game-over");
        }, 100);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    
}
function startOver() {
    gamePattern=[];
    toggle=false;
    level=0;
    userClickedPattern=[];
}
