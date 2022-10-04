let firstCard = 10
let secondCard = 4

let sum = firstCard + secondCard

let hasBlackJack = false
let isAlive = true

let message = ""

let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")

function startGame() {
    cardsEl.textContent = "Cards: " + firstCard + " " + secondCard
    sumEl.textContent = "Sum: " + sum
    if (sum < 21) {
        message = "New card?"
    } else if (sum===21) {
        message = "Blackjack!"
        hasBlackJack = true
    }else if (sum > 21) {
        message = "You lose!"
        isAlive = false
    }
    messageEl.textContent = message
}

function newCard() {
    let card = 7
    sum += card
    startGame()
}
