import { Game } from "./Game.js";
import { Pair } from "./Pair.js"

let g = new Game();

// lancement du jeu
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startBtn").addEventListener("click", function () {
        g = new Game();
        g.createCards();
        // mélange les cartes
        g.randomizeCards();

        startGame()
    })
})

// affichage des cartes initial dans l'ihm
function displayCards(cards) {
    let container = document.getElementById("jeu");
    container.innerHTML = "";

    cards.forEach(card => {
        container.appendChild(card.render(g.cards.indexOf(card)));
    });
}

function startGame() {
    let firstCard;
    let compteur = 0
    // va stocker la paire de cartes selectionnées
    let p;
    // flag qui permet de désactiver les reactions du listener sur les cartes si deux cartes sont retournées, pour éviter de retourner une troisième carte
    let canClick = true;

    // réinitialisation du champ d'affichage des coups et d'alerte de fin de partie
    document.getElementById("win").innerText = ""
    updateCounts()

    // affichage des cartes
    displayCards(g.cards)

    const cardElements = document.querySelectorAll(".carte");

    cardElements.forEach(element => {
        element.addEventListener("click", function () {
            // ignore la reaction
            if (!canClick) return;

            // compteur verifie si la carte cliquée est la n°1 ou n°2
            compteur++;
            // recupère le numero de la carte 
            let id = element.getAttribute("data-rank");
            const card = g.cards[id]

            // on ignore si la carte est déjà retournée
            if(card.isFlipped) return;

            card.flip()
            element.querySelector("img").src = card.display_image;

            if (!firstCard) {
                firstCard = card
                p = new Pair();
                p.firstCard = firstCard
            } else {
                // si deux cartes retournées, on désactive la reaction
                canClick = false
                const secondCard = card

                // recupération des index des div pour recup les img et changer leur src
                const firstIndex = g.cards.indexOf(firstCard);
                const secondIndex = g.cards.indexOf(secondCard);

                const firstImg = cardElements[firstIndex].querySelector("img");
                const secondImg = cardElements[secondIndex].querySelector("img");

                // ajout de la deuxieme carte a la paire temporaire
                p.secondCard = secondCard

                // si les deux cartes de la paire son correctes, on l'ajout à la liste des paires faites par l'utilisateur
                if (p.isCorrect()) {
                    g.addCorrectPair(p)
                    canClick = true
                } else {
                    // sinon on retourne les cartes après 1.5sec et le jeu continue
                    setTimeout(() => {
                        // on retourne les deux cartes
                        p.firstCard.flip()
                        firstImg.src = p.firstCard.display_image
                        p.secondCard.flip()
                        secondImg.src = p.secondCard.display_image
                        // reactivation des réactions
                        canClick = true
                    }, 1500);
                }
                g.incCount()
                // affichage du nombre d'essai
                updateCounts()

                if (g.pairsMade.length == g.cards.length/2) {
                    stopGame()
                }

                firstCard = null
            }
        })
    });
}

// fonction qui affiche le nombre d'essais et le score dans l'ihm
function updateCounts() {
    document.getElementById("count").innerText = g.count
    document.getElementById("score").innerText = g.pairsMade.length
}

function stopGame() {
    document.getElementById("win").innerText = "Bravo ! Vous avez gagné la partie avec " + g.count + " coups."
}