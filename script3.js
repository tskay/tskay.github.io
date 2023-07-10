function revealImages() {
    var imageContainer = document.getElementById("image-container");
    var containerTop = imageContainer.getBoundingClientRect().top;
    var windowHeight = window.innerHeight;

    if (containerTop <= windowHeight) {
        var images = Array.from(imageContainer.getElementsByClassName("image"));
        images.forEach(function(image, index) {
            setTimeout(function() {
                image.classList.add("reveal");
            }, index * 200); // Adjust the delay between each image reveal
        });
        window.removeEventListener("scroll", revealImages);
    }
}

window.addEventListener("scroll", revealImages);

// Initial reveal check
window.addEventListener("DOMContentLoaded", revealImages);
