/*const gifSection = document.querySelector('.gif-section');
const subpageSection = document.querySelector('.subpage-section');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const gifSectionOffset = gifSection.offsetTop;
    const windowHeight = window.innerHeight;
    const gifElement = gifSection.querySelector('img');

    const scaleFactor = 0.2; // scale factor
    const scale = 1 + (scrollPosition - gifSectionOffset) / (windowHeight * scaleFactor); // Adjust divisor for scaling speed

    if (scrollPosition > gifSectionOffset) {
        gifElement.style.transform = `scale(${scale})`;
    } else {
        gifElement.style.transform = 'scale(1)';
    }

    if (scrollPosition > gifSectionOffset + windowHeight) {
        subpageSection.classList.add('active');
    } else {
        subpageSection.classList.remove('active');
    }
}); */
const gifSection = document.querySelector('.gif-section');
const subpageSection = document.querySelector('.subpage-section');
const gifElement = gifSection.querySelector('img');

let gifZoomed = false;
let currentScale = 0.1;
const maxScale = 2; // Define the maximum scale value

function animate() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const gifSectionOffset = gifSection.offsetTop;
    const windowHeight = window.innerHeight;

    const scaleFactor = 0.2; // scale factor
    const targetScale = 1 + (scrollPosition - gifSectionOffset) / (windowHeight * scaleFactor);

    //console.log(targetScale);
    //console.log(((scrollPosition/1250)*100)+1);

    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    //console.log(clamp(((scrollPosition / 1250) * 100) , 1, 50));

    gifElement.style.transform = `scale(${clamp(((scrollPosition / 1250) * 100), 1, 25)}) translate(${clamp(((scrollPosition / 1250) * 100), 1, 13)}px, ${clamp(((scrollPosition / 1250) * 100), 1, 8)}px)`;
    //console.log(scrollPosition);
    requestAnimationFrame(animate);
}

animate();

const imagePosition = { x: 100, y: 100 }; // Position of the image
const imageRadius = 50; // Radius of the image
const circleRadius = 80; // Radius of the circle around the image
let angle = 0; // Initial angle

setInterval(() => {
  // Calculate the coordinates for the object in front (z-index 3)
  const xInFront = imagePosition.x + (imageRadius + circleRadius) * Math.cos(angle);
  const yInFront = imagePosition.y + (imageRadius + circleRadius) * Math.sin(angle);

  // Calculate the coordinates for the object behind (z-index 1)
  const xBehind = imagePosition.x + (imageRadius - circleRadius) * Math.cos(angle);
  const yBehind = imagePosition.y + (imageRadius - circleRadius) * Math.sin(angle);

  //console.log('In front:', xInFront, yInFront);
  //console.log('Behind:', xBehind, yBehind);

  // Increment the angle for the next iteration
  angle += 0.01; // Adjust the speed of the rotation by changing the increment value
}, 16);