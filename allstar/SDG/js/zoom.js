const gifSection = document.querySelector('.gif-section');
const subpageSection = document.querySelector('.subpage-section');
const gifElement = gifSection.querySelector('img');
const animatedElement = document.querySelector("#image4");
//console.log(gifElement);

let gifZoomed = false;
let currentScale = 0.1;
const maxScale = 2; // Define the maximum scale value

function animate() {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  console.log(scrollPosition);
  //console.log(targetScale);
  //console.log(((scrollPosition/1250)*100)+1);

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  //console.log(clamp(((scrollPosition / 1250) * 100) , 1, 50));
  gifElement.style.transform = `scale(${clamp(((scrollPosition / 1250) * 100) , 1, 25)})`;
  //console.log(scrollPosition);
  requestAnimationFrame(animate);
}


animate()



function removeAnimationOnScroll() {
  animatedElement.classList.remove("orbit2");
}

window.addEventListener("scroll", removeAnimationOnScroll);


