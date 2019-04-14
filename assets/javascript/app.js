$(document).ready(function () {

    var gameData = {
        triviaData: null,
        userAnswers: [],
        correct: 0,
        incorrect: 0
    }

    // Variables to control 
    // game countdown timers

    // Variables that will hold the
    // setInterval that runs main and score
    // clocks
    var mainIntervalObj;
    var scoreIntervalObj;

    // prevents the clock from being sped up unnecessarily
    var mainClockRunning = false;
    var mainTimeHold = 6;
    var mainTime = mainTimeHold;
    var scoreClockRunning = false;
    var scoreTimeHold = 3;
    var scoreTime = scoreTimeHold;

    // This will run the display image function as soon as the page loads.
    startSlideshow();

    // Start game timer
    startGameTimer();

    initGame();

    $("body").on("click", "#meClick", function () {
        console.log("Here 1" + $(this));
        console.log(this);
        console.log($(this));
    });


    function initGame() {
        console.log("In init game");
        $('#empty-div').empty();
        loadJSON();
    }

    function initScore() {
        console.log("In init score");
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
        $("#display").text(converted);

    }

    // Reset score timer
    function scoreReset() {

        scoreClockRunning = false;
        scoreTime = scoreTimeHold;

        // Compute the start time
        var converted = timeConverter(mainTime);

        // Change the "display" div to current time
        $("#display").text(converted);

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

        // increment time by 1, remember we cant use "this" here.
        mainTime--;

        // Reset when zero
        if (mainTime === 0) {
            mainStop();
            scoreReset();
            initScore();
            startScoreTimer();
        }

        // Get the current time, pass that into the timeConverter function,
        // and save the result in a variable.
        var converted = timeConverter(mainTime);
        console.log("In main count down timer" + converted);

        // Use the variable we just created to show the converted time in the "display" div.
        $("#display").text(converted);

    }

    // Count down function for score display timer
    function countdownScoreTimer() {

        // increment time by 1, remember we cant use "this" here.
        scoreTime--;

        // Reset when zero
        if (scoreTime === 0) {
            scoreStop();
            mainReset();
            initGame();
            startGameTimer();
        }

        // Get the current time, pass that into the timeConverter function,
        //       and save the result in a variable.
        var converted = timeConverter(scoreTime);
        console.log("In score count down timer" + converted);

        // Use the variable we just created to show the converted time in the "display" div.
        $("#display").text(converted);

    }

    // Convert time to minutes and seconds
    function timeConverter(t) {

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
            console.log(gameData.triviaData);

            createTriviaHTML();

        });
    };

    // Dynamically create the HTML 
    // for the questions and answers
    function createTriviaHTML() {

        // Process all of the questions and answers read from the JSON file
        // Dynamically build the form for each question
        for (var i = 0; i < gameData.triviaData.qa.length; i++) {

            console.log(gameData.triviaData.qa[i].question);

            var currentQuestion = gameData.triviaData.qa[i];

            var questionWrap = $('<div>').addClass('q-wrap').data('index', i);

            var question = $('<h3>').text(currentQuestion.question).addClass('question')
            var divForm = $("<div>").addClass("form-check form-check-inline");
            var radioButton1 = $("<input>").addClass("form-check-input").attr("type", "radio").attr("name", "inlineRadioOptions" + i).data('ans-index', 0).data('q-index', i);
            var labelForm1 = $("<label>").addClass("form-check-label").text(currentQuestion.ans[0]);
            var radioButton2 = $("<input>").addClass("form-check-input").attr("type", "radio").attr("name", "inlineRadioOptions" + i).data('ans-index', 1).data('q-index', i);
            var labelForm2 = $("<label>").addClass("form-check-label").text(currentQuestion.ans[1]);
            var radioButton3 = $("<input>").addClass("form-check-input").attr("type", "radio").attr("name", "inlineRadioOptions" + i).data('ans-index', 2).data('q-index', i);
            var labelForm3 = $("<label>").addClass("form-check-label").text(currentQuestion.ans[2]);
            var radioButton4 = $("<input>").addClass("form-check-input").attr("type", "radio").attr("name", "inlineRadioOptions" + i).data('ans-index', 3).data('q-index', i);
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

        var scoreWrap = $('<div>');

        var corrAns = $('<h3>').text("Correct Answers: ");
        var wrongAns = $('<h3>').text("Incorrect Answers: ");
        var unAns = $('<h3>').text("Unanswered: ");

        $(scoreWrap).append(corrAns, wrongAns, unAns);

        $('#empty-div').append(scoreWrap);

    };


    $('#empty-div').on('click', '.ans-option', function () {
        var selectedOption = $(this).text();
        var questionIndex = $(this).data('q-index');
        gameData[questionIndex] = selectedOption;
        console.log("Click " + gameData[questionIndex]);
    });


    function validateAnswers() {
        if (response.qa.length === gameData.userAnswers.length) {
            // user completed the game
            response.qa.forEach(function (elem, i) {
                elem.corrAns
                if (elem.corrAns === gameData.userAnswers[i]) {
                    gameData.correct++;
                } else {
                    gameData.incorrect++;
                }
            });
        } else {
            // user did not complete the game
        }

    }

    function endGame() {
        // empty '#empty-div
        $('#empty-div').empty();
        // display the end scores
        // add a button to play again
    }



});