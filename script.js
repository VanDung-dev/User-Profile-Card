const cards = document.querySelectorAll(".card");
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({ target: clickedCard }) {
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            cardOne = clickedCard;
            return;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        const cardOneImg = cardOne.querySelector(".back-view img")?.src;
        const cardTwoImg = cardTwo.querySelector(".back-view img")?.src;
        if (cardOneImg && cardTwoImg) {
            matchCards(cardOneImg, cardTwoImg);
        } else {
            console.error("Image source missing for one or both cards");
            resetCards();
        }
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        if (matched === 8) {
            setTimeout(() => {
                alert("Congratulations! You've matched all cards!");
                shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        resetCards(true);
    } else {
        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 400);
        setTimeout(() => {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");
            resetCards();
        }, 1200); // Matches total animation duration (400ms + 800ms)
    }
}

function resetCards(isMatch = false) {
    cardOne = null;
    cardTwo = null;
    disableDeck = false;
}

function shuffleCard() {
    matched = 0;
    cardOne = cardTwo = null;
    disableDeck = false;
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

    cards.forEach((card, i) => {
        card.classList.remove("flip", "shake");
        card.removeEventListener("click", flipCard);
        card.addEventListener("click", flipCard);
        const imgTag = card.querySelector(".back-view img");
        if (imgTag) {
            imgTag.src = `images/img-${arr[i]}.png`;
        } else {
            console.error(`Image tag not found for card ${i}`);
        }
    });
}


shuffleCard();

new Swiper('.card-wrapper', {
    loop: true,
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
    }
});