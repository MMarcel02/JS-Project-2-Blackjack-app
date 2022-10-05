let player = {
    Name: "Marcel",
    Chips: 100,
    cards: [],
    sum: ()=> player.cards.reduce((i1,i2)=>i1+i2)
}

let dealerCards = []
let dealerSum = 0
let hasBlackJack = false
let isAlive = false
let playerWins = false
let playerPush = false


let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let dealerEl = document.getElementById("dealer-el")
let dealerSumEl = document.getElementById("dealer-sum-el")


playerEl.textContent = player.Name + ": £" + player.Chips

function startGame() {
    player.Chips = player.Chips - 10
    isAlive = true
    hasBlackJack = false
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    player.cards = [firstCard, secondCard]
    playerEl.textContent = player.Name + ": £" + player.Chips
    renderDealer()
    renderGame()
}

function getRandomCard () {
    let cardGen = Math.floor(Math.random()*13) + 1
    if (cardGen > 10) {
        return 10
    } else if (cardGen === 1) {
        return 11
    } else {
        return cardGen
    }
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        player.cards.push(card)
        renderGame()
    } else {
        messageEl.textContent = "Start a new game"
    }
}

function renderGame() {
    
    cardsEl.textContent = "Cards: "
    for (let i=0; i<player.cards.length; i++) {
        cardsEl.textContent += player.cards[i] + " "
    }
    
    const sum = player.sum()
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

function renderDealer() {
    let dealerFirstCard = getRandomCard()
    dealerCards = [dealerFirstCard]
    dealerSum = dealerCards[0]
    dealerEl.textContent = "Dealer: " + dealerCards[0]
    dealerSumEl.textContent = "Dealer sum: " + dealerSum
}

function stand() {   
    if (dealerSum < 17 && isAlive === true) {
        do{
            let dealerCard = getRandomCard()
            dealerCards.push(dealerCard)
            dealerSum += dealerCard         
        } while (dealerSum < 17)

        for (let i=1 ; i<dealerCards.length; i++) {
            dealerEl.textContent += " " + dealerCards[i]
        }

    } else {
        messageEl.textContent = "Start a new game"
    }
    dealerSumEl.textContent = "Dealer sum: " + dealerSum

    if (dealerSum > 21 && isAlive === true) {
        playerWins = true
        isAlive = false
    } else if (dealerSum < player.sum() && isAlive === true) {
        playerWins = true
        isAlive = false
    } else if (dealerSum === player.sum() && isAlive === true){
        playerPush = true
        isAlive = false
    } else {
        playerWins= false
        isAlive = false
    }

    if (playerWins === true && hasBlackJack === true) {
        player.Chips += 25
    } else if (playerWins === true) {
        player.Chips += 20
    } else if (playerPush === true) {
        player.Chips +=10
    } else{}

    playerEl.textContent = player.Name + ": £" + player.Chips
}
