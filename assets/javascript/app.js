// JavaScript for Bootcamp Homework #5
// Paul Raab
// Raab Enterprises LLC
// 4/13/2019
// Building a Trivia game
// ToDo 
// Look at the harder assignment and do that
// Add buttons to override timers
// Usse animate to fade backgrounnd grapahics in and out
$(document).ready(function () {

    var gameData = {
        isFirstTime: true,
        triviaData: null,
        userAnswers: [-1, -1, -1, -1],
        correct: 0,
        incorrect: 0,
        noAns: 0
    }

    // Variables to control 
    // game countdown timers

    // Variables that will hold the
    // setInterval that runs main and score
    // clocks
    var mainIntervalObj;
    var scoreIntervalObj;

    // Prevents the clock from being sped up unnecessarily
    var mainClockRunning = false;
    var mainTimeHold = 30;
    var mainTime = mainTimeHold;
    var scoreClockRunning = false;
    var scoreTimeHold = 8;
    var scoreTime = scoreTimeHold;

    // This will run the display image function as soon as the page loads.
    startSlideshow();

    // Start game timer
    startGameTimer();

    initGame();

    // Initialize game to start conditions
    function initGame() {
        $('#empty-div').empty();
        gameData.userAnswers = [-1, -1, -1, -1];
        gameData.correct = 0;
        gameData.incorrect = 0;
        gameData.noAns = 0;

        // First time through read JSON file with questions and answers
        if (gameData.isFirstTime) {
            loadJSON();
            isFirstTime = false;
        }
        // Other times through create HTML with questions and answers
        else {
            createTriviaHTML();
        }
    }

    // Initialize score to start conditions
    function initScore() {
        $('#empty-div').empty();
        loadScore();
    }

    // Functions to control 
    // game countdown timers

    // Start the main game timer
    function startGameTimer() {

        // Use setInterval to start the count here and set the clock to running.
        if (!mainClockRunning) {
            mainIntervalObj = setInterval(countdownGameTimer, 1000);
            mainClockRunning = true;
        }

    }

    // Start the score display timer
    function startScoreTimer() {

        // Use setInterval to start the count here and set the clock to running.
        if (!scoreClockRunning) {
            scoreIntervalObj = setInterval(countdownScoreTimer, 1000);
            scoreClockRunning = true;
        }
    }

    // Reset main timer
    function mainReset() {

        mainClockRunning = false;
        mainTime = mainTimeHold;

        // Compute the start time
        var converted = timeConverter(mainTime);

        // Change the "display" div to current time
        $("#display").text("Game Timer: " + converted);

    }

    // Reset score timer
    function scoreReset() {

        scoreClockRunning = false;
        scoreTime = scoreTimeHold;

        // Compute the start time
        var converted = timeConverter(mainTime);

        // Change the "display" div to current time
        $("#display").text("Score Timer: " + converted);

    }

    function mainStop() {

        // Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(mainIntervalObj);
        mainClockRunning = false;

    }

    function scoreStop() {

        // Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(scoreIntervalObj);
        scoreClockRunning = false;

    }

    // Count down function for main game timer
    function countdownGameTimer() {

        // Get the current time, pass that into the timeConverter function,
        // and save the result in a variable.
        var converted = timeConverter(mainTime);

        // Use the variable we just created to show the converted time in the "display" div.
        $("#display").text("Game Timer: " + converted);

        // Reset when zero
        if (mainTime === 0) {
            mainStop();
            scoreReset();
            initScore();
            startScoreTimer();
        }

        // Decrement time by 1
        mainTime--;

    }

    // Count down function for score display timer
    function countdownScoreTimer() {

        // Get the current time, pass that into the timeConverter function,
        // and save the result in a variable.
        var converted = timeConverter(scoreTime);

        // Use the variable we just created to show the converted time in the "display" div.
        $("#display").text("Score Timer: " + converted);

        // Reset when zero
        if (scoreTime === 0) {
            scoreStop();
            mainReset();
            initGame();
            startGameTimer();
        }

        // Decrement time by 1
        scoreTime--;
    }

    // Convert time to minutes and seconds
    function timeConverter(t) {

        console.log("Time = " + t);

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }

    // The function loadJSON will create a new instance of a 
    // JSON object read from a file using the AJAX Jquery 
    // method .getJSON()
    function loadJSON() {

        $("#questionsScore").html("Questions");


        // Load a JSON file with AJAX
        $.getJSON("./assets/json/triviaQuestions.json", function (result) {

            // Store result in global variable
            gameData.triviaData = result;

            // Create HTML
            createTriviaHTML();

        });
    };

    // Dynamically create the HTML 
    // for the questions and answers
    function createTriviaHTML() {

        // Process all of the questions and answers read from the JSON file
        // Dynamically build the form for each question
        for (var i = 0; i < gameData.triviaData.qa.length; i++) {

            var currentQuestion = gameData.triviaData.qa[i];

            var questionWrap = $('<div>').addClass('q-wrap').data('index', i);

            var question = $('<h3>').text(currentQuestion.question).addClass('question')
            var divForm = $("<div>").addClass("form-check form-check-inline");
            var radioButton1 = $("<input>").addClass("form-check-input ans-option")
            radioButton1.attr("type", "radio").attr("name", "inlineRadioOptions" + i)
            radioButton1.data('ans-index', 0).data('q-index', i);
            var labelForm1 = $("<label>").addClass("form-check-label").text(currentQuestion.ans[0]);
            var radioButton2 = $("<input>").addClass("form-check-input ans-option")
            radioButton2.attr("type", "radio").attr("name", "inlineRadioOptions" + i)
            radioButton2.data('ans-index', 1).data('q-index', i);
            var labelForm2 = $("<label>").addClass("form-check-label").text(currentQuestion.ans[1]);
            var radioButton3 = $("<input>").addClass("form-check-input ans-option")
            radioButton3.attr("type", "radio").attr("name", "inlineRadioOptions" + i).data('ans-index', 2)
            radioButton3.data('q-index', i);
            var labelForm3 = $("<label>").addClass("form-check-label").text(currentQuestion.ans[2]);
            var radioButton4 = $("<input>").addClass("form-check-input ans-option")
            radioButton4.attr("type", "radio").attr("name", "inlineRadioOptions" + i)
            radioButton4.data('ans-index', 3).data('q-index', i);
            var labelForm4 = $("<label>").addClass("form-check-label").text(currentQuestion.ans[3]);
            divForm.append(radioButton1, labelForm1, radioButton2, labelForm2, radioButton3, labelForm3, radioButton4, labelForm4, );

            $(questionWrap).append(question, divForm);

            // Write it to the HTML
            $('#empty-div').append(questionWrap);

        }
    };

    // Load score and display
    function loadScore() {

        $("#questionsScore").html("All Done!!!");

        // Check answers
        validateAnswers();

        var scoreWrap = $('<div>');

        var corrAns = $('<h3>').text("Correct Answers: " + gameData.correct);
        var wrongAns = $('<h3>').text("Incorrect Answers: " + gameData.incorrect);
        var unAns = $('<h3>').text("Unanswered: " + gameData.noAns);

        $(scoreWrap).append(corrAns, wrongAns, unAns);

        $('#empty-div').append(scoreWrap);

    };

    // Manage user answer selection
    $('#empty-div').on('click', '.ans-option', function () {
        var questionIndex = $(this).data('q-index');
        var ansIndex = $(this).data('ans-index');
        gameData.userAnswers[questionIndex] = ansIndex;

    });

    // Check answers against correct answer
    function validateAnswers() {

        // user completed the game
        gameData.triviaData.qa.forEach(function (elem, i) {
            if (gameData.userAnswers[i] === -1) {
                gameData.noAns++;
            } else if (elem.corrAns === elem.ans[gameData.userAnswers[i]]) {
                gameData.correct++;
            } else if (elem.corrAns !== elem.ans[gameData.userAnswers[i]]) {
                gameData.incorrect++;
            }
        });

    }

});