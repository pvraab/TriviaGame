    // TODO: Put links to our images in this image array.
    var images = ["./assets/images/MyFairLady.jpg", "./assets/images/Oklahoma.jpg",
        "./assets/images/SingingInTheRain.jpg", "./assets/images/SoundOfMusic.jpg"
    ];

    // Variable showImage will hold the setInterval when we start the slideshow
    var showImage;

    // Count will keep track of the index of the currently displaying picture.
    var count = 0;

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