export class Pair {
    firstCard;
    secondCard;

    constructor(firstCard, secondCard) {
        this.firstCard = firstCard
        this.secondCard = secondCard
    }

    // verifie si la paire est "correcte" selon les règles du memory (les cartes sont identiques)
    isCorrect() {
        return(this.firstCard.number == this.secondCard.number)
    }
}