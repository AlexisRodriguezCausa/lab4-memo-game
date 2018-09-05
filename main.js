const cards = document.querySelectorAll('.memo-card');
const maxAttempts = 10

var card1, card2;
var hasFirstCardClicked = false
var lockBoard = false
var countOfAttemps = 0

function hideCard(){
    if (countOfAttemps == maxAttempts) return;
    if (lockBoard) return;
    if (this === card1) return;

    this.children[0].children[1].classList.add("transparent")

    if(!hasFirstCardClicked){
        hasFirstCardClicked = true
        card1 = this

        return
    }

    card2 = this

    checkCardsMatch()
}

function checkCardsMatch(){

    isMatch = card1.dataset.value == card2.dataset.value

    isMatch ? disableClick() : showDefaultCards()
}

function showDefaultCards() {
    lockBoard = true;

    setTimeout(() => {
        card1.children[0].children[1].classList.remove("transparent")
        card2.children[0].children[1].classList.remove("transparent")
        resetBoard();

        countOfAttemps++
        showNumberOfIntents(maxAttempts - countOfAttemps)
    }, 1500);
}

function disableClick() {
    card1.removeEventListener('click', hideCard);
    card2.removeEventListener('click', hideCard);

    setTimeout(() => { 
        card1.classList.add("match")
        card2.classList.add("match")

        resetBoard();
    }, 800);
}

function resetBoard() {
    card1 = null
    card2 = null
    hasFirstCardClicked = false
    lockBoard = false
}

function restartGame(){
    window.location.reload()
}

function showNumberOfIntents(count = maxAttempts){
    document.getElementById("numberOfAttempts").innerHTML = count
}

showNumberOfIntents()

document.getElementsByClassName("footer-button")[0].addEventListener('click', restartGame)
cards.forEach(card => card.addEventListener('click', hideCard));