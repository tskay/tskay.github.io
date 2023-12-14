const cards = document.querySelectorAll(".card"),
    timeTag = document.querySelector(".time b"),
    flipsTag = document.querySelector(".flips b"),
    marksTag = document.querySelector(".marks b"),
    refreshBtn = document.querySelector(".details button");
const failureSound = new Audio("failure.mp3");
const fuiyohSound = new Audio("uncle-roger-fuiyoh.mp3");

let maxTime = 50;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

function initTimer() {
    if (timeLeft <= 0) {
        setTimeout(() => {
            document.getElementById("gameover").style.display = "block";
            failureSound.play();


        }, 500);
        return clearInterval(timer);

    }

    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard({ target: clickedCard }) {
    if (!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matchedCard++;
        marksTag.innerText = matchedCard;

        if (matchedCard == 8 && timeLeft > 0) {
            setTimeout(() => {
                document.getElementById("winbox").style.display = "block";
                fuiyohSound.play();

            }, 1000);

            return clearInterval(timer);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}





function shuffleCard() {


    timeLeft = maxTime;
    flips = matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    marksTag.innerText = matchedCard;
    disableDeck = isPlaying = false;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `images/sdg${arr[index]}.png`;
        }, 500);
        card.addEventListener("click", flipCard);
    });


}

shuffleCard();

refreshBtn.addEventListener("click", shuffleCard);

function hidebox() {
    document.getElementById("gameover").style.display = "none";
    document.getElementById("winbox").style.display = "none";

}
document.getElementById("refresh-button").addEventListener("click", hidebox);
window.addEventListener("beforeunload", hideGameOver);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
card.addEventListener("click", flipCard);