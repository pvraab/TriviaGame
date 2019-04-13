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

        // TODO: Use a setTimeout to run displayImage
        setTimeout(displayImage, 5000);

        // TODO: If the count is the same as the length of the image array, reset the count to 0.
        count++;
        if (count === images.length) {
            count = 0;
        }
    }

    function startSlideshow() {

        // TODO: Use showImage to hold the setInterval to run nextImage.
        showImage = setInterval(nextImage, 5000);

    }

    // Timer code here
    // This code will run as soon as the page loads
    // window.onload = function () {
    //     start();
        // $("#stop").on("click", stop);
        // $("#reset").on("click", reset);
        // $("#start").on("click", start);
    // };

    //  Variable that will hold our setInterval that runs the stopwatch
    var intervalId;

    // prevents the clock from being sped up unnecessarily
    var clockRunning = false;
    var time = 30;

    function reset() {

        clockRunning = false;
        time = 30;

        // DONE: Change the "display" div to "00:30."
        $("#display").text("00:30");

        start();

    }

    function start() {

        console.log("In start");

        // DONE: Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            intervalId = setInterval(countIt, 1000);
            clockRunning = true;
        }
    }

    function stop() {

        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(intervalId);
        clockRunning = false;
    }

    function countIt() {

        // DONE: increment time by 1, remember we cant use "this" here.
        time--;

        // Reset when zero
        if (time === 0) {
            stop();
            reset();
        }

        // DONE: Get the current time, pass that into the timeConverter function,
        //       and save the result in a variable.
        var converted = timeConverter(time);
        console.log(converted);

        // DONE: Use the variable we just created to show the converted time in the "display" div.
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

});