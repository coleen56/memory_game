export class Card {

    constructor(number, real_image) {
        this.number = number;
        this.real_image = real_image;
        this.display_image = "resources/images/blank.png";
        this.isFlipped = false;
    }

    // "retourne" la carte
    flip() {
        // inverse le statut
        this.isFlipped = !this.isFlipped;

        if (this.isFlipped) {
            this.display_image = this.real_image;
        } else {
            this.display_image = "resources/images/blank.png";
        }

    }

    // affichage de la carte dans le dom
    render(index) {
        let dom = document.createElement("div");
        dom.classList.add("carte", "col-3", "mb-2");
        dom.setAttribute("data-rank", index)

        let img = document.createElement("img");
        img.src = this.display_image;

        dom.appendChild(img);
        return dom;
    }
}
