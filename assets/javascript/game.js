$(document).ready(function () {

    // TODO: Put links to our images in this image array.
    var images = ["./assets/images/MyFairLady.jpg", "./assets/images/Oklahoma.jpg",
        "./assets/images/SingingInTheRain.jpg", "./assets/images/SoundOfMusic.jpg"
    ];

    // Variable showImage will hold the setInterval when we start the slideshow
    var showImage;

    // Count will keep track of the index of the currently displaying picture.
    var count = 0;

    // This will run the display image function as soon as the page loads.
    startSlideshow();

    // Start timer
    start();

    // This function will replace display whatever image it's given
    // in the 'src' attribute of the img tag.
    function displayImage() {
        $("#wrapper").css('background-image', 'url("' + images[count] + '")');
    }

    function nextImage() {
        //  TODO: Increment the count by 1.

        $("#wrapper").css('background-image', 'url("' + images[count] + '")');

        // TODO: Use a setTimeout to run displayImage after 1 second.
        setTimeout(displayImage, 5000);

        // TODO: If the count is the same as the length of the image array, reset the count to 0.
        count++;
        if (count === images.length) {
            count = 0;
        }
    }

    function startSlideshow() {

        // TODO: Use showImage to hold the setInterval to run nextImage.
        showImage = setInterval(nextImage, 3000);

    }

    // Timer code here
    // This code will run as soon as the page loads
    window.onload = function () {
        start();
        // $("#stop").on("click", stop);
        // $("#reset").on("click", reset);
        // $("#start").on("click", start);
    };

    //  Variable that will hold our setInterval that runs the stopwatch
    var intervalId;

    // prevents the clock from being sped up unnecessarily
    var clockRunning = false;
    var time = 0;
    var lap = 1;

    function reset() {

        time = 0;
        lap = 1;

        // DONE: Change the "display" div to "00:00."
        $("#display").text("00:00");

        // DONE: Empty the "laps" div.
        $("#laps").text("");
    }

    function start() {

        // DONE: Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            intervalId = setInterval(count, 1000);
            clockRunning = true;
        }
    }

    function stop() {

        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(intervalId);
        clockRunning = false;
    }

    function count() {

        // DONE: increment time by 1, remember we cant use "this" here.
        time++;

        // DONE: Get the current time, pass that into the timeConverter function,
        //       and save the result in a variable.
        var converted = timeConverter(time);
        console.log(converted);

        // DONE: Use the variable we just created to show the converted time in the "display" div.
        $("#display").text(converted);
    }

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


    // Solution if you would like to put it in an object

    // window.onload = function() {
    //   $("#lap").on("click", stopwatch.recordLap);
    //   $("#stop").on("click", stopwatch.stop);
    //   $("#reset").on("click", stopwatch.reset);
    //   $("#start").on("click", stopwatch.start);
    // };

    // //  Variable that will hold our setInterval that runs the stopwatch
    // var intervalId;

    // // prevents the clock from being sped up unnecessarily
    // var clockRunning = false;

    // // Our stopwatch object
    // var stopwatch = {

    //   time: 0,
    //   lap: 1,

    //   reset: function() {

    //     stopwatch.time = 0;
    //     stopwatch.lap = 1;

    //     // DONE: Change the "display" div to "00:00."
    //     $("#display").text("00:00");

    //     // DONE: Empty the "laps" div.
    //     $("#laps").text("");
    //   },
    //   start: function() {

    //     // DONE: Use setInterval to start the count here and set the clock to running.
    //     if (!clockRunning) {
    //       intervalId = setInterval(stopwatch.count, 1000);
    //       clockRunning = true;
    //     }
    //   },
    //   stop: function() {

    //     // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    //     clearInterval(intervalId);
    //     clockRunning = false;
    //   },
    //   recordLap: function() {

    //     // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //     //       and save the result in a variable.
    //     var converted = stopwatch.timeConverter(stopwatch.time);

    //     // DONE: Add the current lap and time to the "laps" div.
    //     $("#laps").append("<p>Lap " + stopwatch.lap + " : " + converted + "</p>");

    //     // DONE: Increment lap by 1. Remember, we can't use "this" here.
    //     stopwatch.lap++;
    //   },
    //   count: function() {

    //     // DONE: increment time by 1, remember we cant use "this" here.
    //     stopwatch.time++;

    //     // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //     //       and save the result in a variable.
    //     var converted = stopwatch.timeConverter(stopwatch.time);
    //     console.log(converted);

    //     // DONE: Use the variable we just created to show the converted time in the "display" div.
    //     $("#display").text(converted);
    //   },
    //   timeConverter: function(t) {

    //     var minutes = Math.floor(t / 60);
    //     var seconds = t - (minutes * 60);

    //     if (seconds < 10) {
    //       seconds = "0" + seconds;
    //     }

    //     if (minutes === 0) {
    //       minutes = "00";
    //     }
    //     else if (minutes < 10) {
    //       minutes = "0" + minutes;
    //     }

    //     return minutes + ":" + seconds;
    //   }
    // };
});