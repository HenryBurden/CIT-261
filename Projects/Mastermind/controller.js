import Model from './model.js';
import View from './view.js';

export default class Controller {
    constructor() {
        this.model = new Model();
        this.view = new View(this.model.getSettings());
        this.addEventListeners();
        this.rowNum = 0;
    }

    addEventListeners() {
        //check guess button
        let check = document.getElementsByClassName("check");
        check[0].addEventListener("touchend", this.checkGuess);

        //settings button
        let settings = document.getElementById("settings");
        settings.addEventListener("touchend", this.view.displaySettings);

        //save settings
        let save = document.getElementById("save");
        save.addEventListener("touchend", this.saveNewSettings);
    }

    update(settings) {
        this.model.updateSettings(settings);
    }

    nextRow(rowNum) {
        this.view.nextRow(rowNum);
    }

    saveNewSettings = () => {
        const settings = {
            numGuesses: document.getElementById("guessSelect").value,
            numColors: document.getElementById("colorSelect").value
        }
        this.update(settings);
        location.reload();
    }

    checkGuess = (event) => {
        //clone the winning pattern
        let winningGuess = this.model.winningPattern.slice(0);
        let checkColorList = [];

        //get guess
        let guess = this.getGuess();
        if (guess.length < 4)
        {
            alert("Circles not filled");
            return;
        }
        //find perfect matches
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] == winningGuess[i]) {
                checkColorList.push("Black");
                //take colors found out of equation
                winningGuess[i] = "";
                guess[i] = "found";
            }
        }

        //check if they won before continuing.
        if (checkColorList.length == 4) {
            this.view.displayEnd("YOU WIN!!!");
            this.view.updateCheck(checkColorList, this.rowNum);
            return;
        } else {
            //find colors in wrong order
            for (let i = 0; i < guess.length; i++) {
                if (winningGuess.indexOf(guess[i]) != -1) {
                    let index = winningGuess.indexOf(guess[i]);
                    winningGuess[index] = "";
                    checkColorList.push("brown");
                }
            }

            this.view.updateCheck(checkColorList, this.rowNum);

            //stop if all guesses are used.
            if (this.rowNum + 1 == this.model.settings.numGuesses) {
                this.view.displayEnd("You Lose...");
            }
            else {
                this.rowNum += 1;
                this.nextRow(this.rowNum);
            }
        }
    }

    getGuess() {
        //the circles in the current row
        const circleClass = `line${this.rowNum}`;
        let circles = document.getElementsByClassName(circleClass);

        //colors guessed stored here
        let guess = [];
        for (let i = 0; i < circles.length; i++) {
            if (circles[i].style.color != '') //only if there is a color
                guess.push(circles[i].style.color); //the colors guessed
        }
        return guess;
    }
}