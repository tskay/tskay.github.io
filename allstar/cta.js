const imageContainer = document.querySelector('.circle-button');
const staticImage = document.querySelector('.static-image');
const gifImage = document.querySelector('.gif-image');
const main_image = document.querySelector('.main-image');

imageContainer.addEventListener('mouseenter', () => {
    main_image.src = "shakehand.gif";
});

imageContainer.addEventListener('mouseleave', () => {
    main_image.src = "shakehand.png";
});