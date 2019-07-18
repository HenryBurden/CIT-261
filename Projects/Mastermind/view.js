export default class View {
    constructor({
        settings,
        colors
    }) {
        this.colors = colors;
        this.numGuesses = settings.numGuesses;
        this.numColors = settings.numColors;
        this.buildBoard(settings, colors);
    }

    nextRow(rowNum) {
        this.activateRow(rowNum, this.colors);
    }

    //for event listener. Used arrow function to stop this from changing
    addChangeColor = (event) => {
        changeColor(event.target, this.colors);
    }

    activateRow(rowNum, colors) {
        //clear highlight and touch events from last row.
        if (rowNum > 0) {
            const lastRow = document.getElementsByClassName(rowNum - 1);
            lastRow[0].style.backgroundColor = "#ffffff";

            let lastLineNum = "line" + (rowNum - 1);
            let circles = document.getElementsByClassName(lastLineNum);
            for (let i = 0; i < circles.length; i++) {
                circles[i].removeEventListener("touchend", this.addChangeColor)
            }
        }

        //highlight the selected row and activate touch events
        let lineNum = "line" + rowNum;
        let circles = document.getElementsByClassName(lineNum);
        const row = document.getElementsByClassName(rowNum);
        row[0].style.backgroundColor = "#F0B27A";
        for (let i = 0; i < circles.length; i++) {
            circles[i].addEventListener("touchend", this.addChangeColor);
        }
    }


    buildBoard(settings, colors) {
        const board = document.getElementById("gameBoard");
        let wrapperCircles = document.createElement("div");
        wrapperCircles.classList.add("top-wrapper");
        let possibleCircles = document.createElement("div");
        possibleCircles.classList.add("possible");
        
        //possible color circles
        for (let i = 0; i < colors.length; i++) {
            possibleCircles.innerHTML += `<i class="fas fa-circle" style="color: ${colors[i]};"></i>`;
        }
        wrapperCircles.appendChild(possibleCircles);
        board.appendChild(wrapperCircles);

        //build the rows
        for (let i = 0; i < settings.numGuesses; i++) {
            board.appendChild(addGameLine(i));
        }

        this.activateRow(0, colors);
    }

    updateCheck(colorList, rowNum) {
        const checkClass = `answer${rowNum}`;
        let checkCircles = document.getElementsByClassName(checkClass);
        for (let i = 0; i < checkCircles.length; i++) {
            if (i < colorList.length) {
                checkCircles[i].style.color = colorList[i];
            }
        }
    }

    displaySettings = () => {
        //exiting the modal
        let close = document.getElementsByClassName("close")[0];
        close.ontouchend = function() {
            settingsModal.style.display = "none";
        }
        window.ontouchend = function(event) {
            if (event.target == settingsModal) {
                settingsModal.style.display = "none";
            }
        }

        //displaying the modal
        let settingsModal = document.getElementById("settingsModal");
        settingsModal.style.display = "block";
        document.getElementById("colorSelect").value = this.numColors;
        document.getElementById("guessSelect").value = this.numGuesses;
    }

    displayEnd = (text) => {
        //display the modal
        document.getElementById("endModal").style.display = "block";
        //display appropriate text
        let modalText = document.getElementById("endText");
        modalText.innerText = text;
        //play again
        let playAgain = document.getElementById("playAgain");
        playAgain.ontouchend = function() {
            location.reload();
        }
    }
}

function addGameLine(i) {
    const line = document.createElement('div');
    line.classList.add("board-wrapper");
    line.classList.add(i);
    line.innerHTML = `
        <i class="fas fa-circle line${i} circle1"></i>
        <i class="fas fa-circle line${i} circle2"></i>
        <i class="fas fa-circle line${i} circle3"></i>
        <i class="fas fa-circle line${i} circle4"></i>

        <div class="answer">
            <i class="fas fa-circle answer${i}"></i>
            <i class="fas fa-circle answer${i}"></i>
            <i class="fas fa-circle answer${i}"></i>
            <i class="fas fa-circle answer${i}"></i>
        </div>
    `
    return line;
}

function changeColor(element, colors) {
    //if there is no color add the first color
    if (element.style.color == "") {
        element.style.color = colors[0];
    } else { //otherwise loop through the colors
        const currentColor = element.style.color;
        let index = (colors.findIndex(color => color == currentColor));
        if (index + 1 == colors.length)
            index = -1;
        element.style.color = colors[index + 1];
    }
}