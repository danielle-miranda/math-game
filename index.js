// index.js
$(document).ready(function(){
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  var highscore = 0;
  var number_limit = 10;
  
//timer
  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  }

//Update Score
  var updateScore = function (amount){
    score += amount;
    $('#score').text(score);
  };

//New Rounds timer + Scores
  var startGame = function() {
    if (!interval) {
      if (timeLeft === 0){
        updateTimeLeft (10);
        updateScore(-score);
      }
      interval = setInterval(function (){
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval (interval);
          interval = undefined;

          //update high score
          if (score > highscore) {
            highscore = score;
            $('#high-score').text(highscore);
          }
        }
      }, 1000);
    }
  }

//Number limit for equation
var updateNumberLimit = function(limit){
  number_limit = limit;
  $('#range-text').text(number_limit);
}
//equation generator
  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  }
  
  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(number_limit);
    var num2 = randomNumberGenerator(number_limit);
    
    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);
    
    return question;
  }

  

  var renderNewQuestion = function(){
    currentQuestion = questionGenerator();
      //inject math equation
    $('#equation').text(currentQuestion.equation);
  }

  
  var checkAnswer = function (userInput, answer) {
    if(userInput === answer){
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  }
  
  

  //event listener for input
  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  $('#question-range').on('change', function () {
    limit = Number($(this).val());
    updateNumberLimit(limit);
    renderNewQuestion();
  });

  renderNewQuestion();
});