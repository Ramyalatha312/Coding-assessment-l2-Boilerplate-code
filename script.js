document.addEventListener("DOMContentLoaded", function() {
    var clickableImage = document.getElementById("ClickableImage");
    var message = document.getElementById("message");

    clickableImage.addEventListener("click", function() {
        // Perform your add-to-cart functionality here

        // Show the message
        message.style.display = "block";

        // Hide the message after 3 seconds (optional)
        //setTimeout(function() {
           // message.style.display = "none";
        //}, 90000);
    });
});