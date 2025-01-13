// index.js
$(document).ready(function(){
  var currentQuestion;
  var timeLeft = 10;
  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  }

  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);
    
    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);
    
    return question;
  }

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
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
    }
  }

  //event listener for correct input
  $('#user-input').on('keyup', function () {
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  //timer

  var interval = setInterval(function() {
    updateTimeLeft (-1);
    $('#time-left').text(timeLeft);
    if (timeLeft === 0){
      clearInterval(interval);
    }
  }, 1000);



  renderNewQuestion();
});