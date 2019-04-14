$(document).ready(function () {

    var gameData = {
        triviaData: null,
        userAnswers: [],
        correct: 0,
        incorrect: 0
    }

    // This will run the display image function as soon as the page loads.
    startSlideshow();

    // Start timer
    start();

    init();

    $("body").on("click", "#meClick", function () {
        console.log("Here 1" + $(this));
        console.log(this);
        console.log($(this));
    });


    function init() {
        console.log("In here");
        loadJSON();
    }

    // The function loadJSON will create a new instance of a 
    // JSON object read from a file using the AJAX Jquery 
    // method .getJSON()
    function loadJSON() {

        // Load a JSON file with AJAX
        $.getJSON("./assets/json/triviaQuestions.json", function (result) {

            // Store result in global variable
            gameData.triviaData = result;
            console.log(gameData.triviaData);

            createTriviaHTML();

        });
    };



    function createTriviaHTML() {

        // Parse JSON string into object
        // var actualJSON = JSON.parse(gameData.triviaData);
        // console.log("Hi there " + actualJSON);
        // var targetDiv = document.getElementById("empty-div");
        // var newDiv = null;
        // var ansDiv = null;

        // $.each(triviaData, function (i, field) {
        //    console.log(field + " ");
        // });

        for (var i = 0; i < gameData.triviaData.qa.length; i++) {

            console.log(gameData.triviaData.qa[i].question);

            var currentQuestion = gameData.triviaData.qa[i];

            var questionWrap = $('<div>').addClass('q-wrap').data('index', i);

            var question = $('<h3>').text(currentQuestion.question).addClass('question')

            var ansWrap = $('<div>').addClass('ans-wrap');

            var option1 = $('<button>').text(currentQuestion.ans[0]).addClass('ans-option btn btn-primary').data('ans-index', 0).data('q-index', i);
            var option2 = $('<button>').text(currentQuestion.ans[1]).addClass('ans-option btn btn-primary').data('ans-index', 1).data('q-index', i);
            var option3 = $('<button>').text(currentQuestion.ans[2]).addClass('ans-option btn btn-primary').data('ans-index', 2).data('q-index', i);
            var option4 = $('<button>').text(currentQuestion.ans[3]).addClass('ans-option btn btn-primary').data('ans-index', 3).data('q-index', i);

            $(ansWrap).append(option1, option2, option3, option4);
            $(questionWrap).append(question, ansWrap);

            $('#empty-div').append(questionWrap);

        }
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