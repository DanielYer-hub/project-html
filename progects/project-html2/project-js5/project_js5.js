const GAME_NODE = document.querySelector('#game-place');
const VICTORY_TEXT = document.querySelector('#messege');
const START_GAME_BUTTON = document.querySelector('#new-game');
const VISIBLE_CARD_CLASSNAME = 'visible';
const CARD_FLIP_MS =500;
const CARD_ELEMENTS = ["🍓", "🍉", "🍌", "🍏", "🥝", "🍇"];
const CARDS_AMOUNT = 12;

let VISIBLE_CARDS = [];

START_GAME_BUTTON.addEventListener("click" , startGame);

function startGame(){
[GAME_NODE, VICTORY_TEXT].forEach((node) => (node.innerHTML = ""));

const CARD_VALUES = generateArray(CARD_ELEMENTS, CARDS_AMOUNT);
console.log(CARD_VALUES);

CARD_VALUES.forEach(viewCard);        
}

function generateArray(emojis, cardAmount){
 const randomArray = [];
 const elementCounts ={};

 for (const emoji of emojis){
    elementCounts[emoji] = 0;
 }
 while (randomArray.length < cardAmount){
    const randomIndex = Math.floor(Math.random() * emojis.length);
    const randomElement = emojis[randomIndex];
 
 if (elementCounts[randomElement] < 2){
    randomArray.push(randomElement);
    elementCounts[randomElement]++;
 }
}
return randomArray;
}

function viewCard(emoji){
const card = document.createElement("div");
card.classList.add('card');

const cardInner = document.createElement("div");
cardInner.classList.add("card-in");

const cardFront = document.createElement("div");
cardFront.classList.add("card-front");

const cardBack = document.createElement("div");
cardBack.classList.add("card-back");

cardFront.textContent = '?';
cardBack.textContent = emoji;

cardInner.appendChild(cardFront);
cardInner.appendChild(cardBack);

card.appendChild(cardInner);

card.addEventListener("click", () => {
    cardClick(card);
});

GAME_NODE.appendChild(card);
}

function cardClick(card){
    const cardInner = card.querySelector('.card-in');
    if(cardInner.classList.contains(VISIBLE_CARD_CLASSNAME)){
        return;
    }
    const checkVictory = () => {
        const visibleCardNodes = document.querySelectorAll('.visible');
        const isVictory = visibleCardNodes.length === CARDS_AMOUNT;
        const victoryMessege = 'You win!';

        if(isVictory){
            VICTORY_TEXT.textContent = victoryMessege;
        }
    }

    cardInner.addEventListener('transitionend',checkVictory);

    cardInner.classList.add(VISIBLE_CARD_CLASSNAME);

    VISIBLE_CARDS.push(card);

    if(VISIBLE_CARDS.length % 2 !== 0){
        return;
    }
    const [prelastCard, lastCard] = VISIBLE_CARDS.slice(-2);

    if(lastCard.querySelector('.card-back').textContent !== prelastCard.querySelector('.card-back').textContent){
        VISIBLE_CARDS = VISIBLE_CARDS.slice(0, VISIBLE_CARDS.length - 2);

        setTimeout(() => {
            lastCard.querySelector('.card-in').classList.remove(VISIBLE_CARD_CLASSNAME);
            prelastCard.querySelector('.card-in').classList.remove(VISIBLE_CARD_CLASSNAME);
        }, CARD_FLIP_MS * 2);
    }
}

startGame();