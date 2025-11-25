export class Card {
    number;
    real_image;
    display_image;

    constructor(number, real_image) {
        this.number = number
        this.real_image = real_image
        this.display_image = "resources/images/blank.png"
    }

    // méthode a retravailler car fonctionne mal

    // flip() {
    //     if(this.display_image == "resources/images/blank.png") {
    //         this.display_image = this.real_image
    //         console.log("yeah")
    //     } else {
    //         this.display_image = "resources/images/blank.png"
    //     }
    // }
}