import {Card} from "./Card.js"
import {Pair} from "./Pair.js"

export class Game {
    cards;
    pairsMade;
    count

    constructor() {
        this.cards = new Array;
        this.pairsMade = new Array;
        this.count = 0
    }

    // crée les cartes et les ajoute au jeu
    createCards() {
        for(let i = 1; i <= 8; i++) {
            let c = new Card(i, "resources/images/lego" + i + ".png")
            this.cards.push(c)
            this.cards.push(c)
        }
    }

    // mélange les cartes au debut du jeu
    randomizeCards() {
        for(let i = 0; i < 50; i++) {
            let i1 = randInt(this.cards.length-1)
            let i2 = randInt(this.cards.length-1)
            let temp = this.cards[i1]
            this.cards[i1] = this.cards[i2]
            this.cards[i2] = temp
        }
    }

    // incrémentation du nombre de coups
    incCount() {
        this.count++
    }

    // ajoute une paire a la liste des paires trouvées par l'utilisateur
    addCorrectPair(pair) {
        this.pairsMade.push(pair)
    }
}

// fonction random pour le mélange des cartes
function randInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

