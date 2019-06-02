//localStorage.clear();
/*
variables to save
*/
let buttonsPressed = {};
if (localStorage.buttonsPressed) {
    buttonsPressed = JSON.parse(localStorage.getItem('buttonsPressed'));
} else {
    let currentColor = 'r';
    for (let i = 0; i < 4; i++) {
        buttonsPressed["n" + (i + 1)] = false; //negative values initialized.
        switch (i) {
            case 1:
                currentColor = 'y';
                break;
            case 2:
                currentColor = 'g';
                break;
            case 3:
                currentColor = 'b';
                break;
        }
        for (let j = 2; j <= 13; j++) { //color values initialized
            buttonsPressed[currentColor + j] = false;
        }
    }
    localStorage.setItem('buttonsPressed', JSON.stringify(buttonsPressed));
}
console.log(buttonsPressed);

let highScores = [];
if (localStorage.highScores) {
    highScores = JSON.parse(localStorage.getItem('highScores'));
} else {
    for (let i = 0; i < 10; i++) {
        highScores[i] = "0";
    }
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

//load the game from the local storage
window.addEventListener('load', () => {
    loadSavedGame();
})

function loadSavedGame() {
    for (var key in buttonsPressed) {
        if (buttonsPressed[key] == true) {
            if (key[0] == 'r' || key[0] == 'y')
                change(key);
            else if (key[0] == 'n')
                xOut(key);
            else
                change2(key);
        }
    }
}

function startNewBoard() {
    //check for high score and save
    for (let i = 0; i < 10; i++) {
        let currentHigh = highScores[i].split(" ");
        if (totalScore > currentHigh[0]) {
            let today = new Date();
            let month = today.getMonth() + 1;
            let day = today.getDate();
            let year = today.getFullYear();
            let formattedDate = month + "/" + day + "/" + year;
            highScores.splice(i, 0, totalScore + ' ' + formattedDate);
            highScores.pop();
            localStorage.setItem('highScores', JSON.stringify(highScores));
            console.log(highScores);
            break;
        }
    }

    //clear saved data and reload page
    localStorage.removeItem('buttonsPressed');
    document.location.reload(true);
}

function showHighScores() {

}

let rScore = 0;
let yScore = 0;
let gScore = 0;
let bScore = 0;
let negatives = 0;
let totalScore = 0;



function calculateScore(color) {
    //save the pressed buttons everytime
    localStorage.setItem('buttonsPressed', JSON.stringify(buttonsPressed));

    switch (color) {
        case 'r':
            rScore = 0;
            document.getElementById('r').innerHTML = rScore;
            break;
        case 'y':
            yScore = 0;
            document.getElementById('y').innerHTML = yScore;
            break;
        case 'g':
            gScore = 0;
            document.getElementById('g').innerHTML = gScore;
            break;
        case 'b':
            bScore = 0;
            document.getElementById('b').innerHTML = bScore;
            break;
        case 'n':
            negatives = 0;
            document.getElementById('n').innerHTML = negatives;
            break;
    }

    if (color == 'n') {
        for (let i = 1; i < 5; i++) {
            if (document.getElementById(color + i).innerHTML == 'X') {
                negatives = negatives - 5;
            }
        }
        document.getElementById('n').innerHTML = negatives;
    } else {
        let count = 0;
        for (let i = 2; i < 13; i++) {
            if (document.getElementById(color + i).innerHTML == 'X') {

                count++;
                switch (color) {
                    case 'r':
                        if (i == 12) {
                            rScore = rScore + count;
                            count++;
                        }
                        rScore = rScore + count;
                        //console.log("Red: " + rScore);

                        if (rScore > 14) {
                            document.getElementById("r12").disabled = false;
                        }
                        document.getElementById('r').innerHTML = rScore;
                        break;
                    case 'y':
                        if (i == 12) {
                            yScore = yScore + count;
                            count++;
                        }
                        yScore = yScore + count;
                        //console.log("Yellow: " + yScore);

                        if (yScore > 14) {
                            document.getElementById("y12").disabled = false;
                        }
                        document.getElementById('y').innerHTML = yScore;
                        break;
                    case 'g':
                        if (i == 2) {
                            gScore = gScore + count;
                            count++;
                        }
                        gScore = gScore + count;
                        //console.log("Green: " + gScore);

                        if (gScore > 14) {
                            document.getElementById("g2").disabled = false;
                        }
                        document.getElementById('g').innerHTML = gScore;
                        break;
                    case 'b':
                        if (i == 2) {
                            bScore = bScore + count;
                            count++;
                        }
                        bScore = bScore + count;
                        //console.log("Blue: " + bScore);

                        if (bScore > 14) {
                            document.getElementById("b2").disabled = false;
                        }
                        document.getElementById('b').innerHTML = bScore;
                        break;
                }
            }
        }
    }
    totalScore = rScore + yScore + gScore + bScore + negatives;
    document.getElementById('t').innerHTML = totalScore;

}

function xOut(id) {
    if (document.getElementById(id).innerHTML != 'X') {
        document.getElementById(id).innerHTML = 'X';
        buttonsPressed[id] = true;
        console.log(buttonsPressed);
    } else {
        document.getElementById(id).innerHTML = "&nbsp";
        buttonsPressed[id] = false;
        console.log(buttonsPressed);
    }
    calculateScore("n");
}

function change(id) {
    let buttonText = document.getElementById(id).innerHTML;
    let res = id.split("");
    if (res[2])
        res[1] = res[1] + res[2];

    if (buttonText != 'X') {
        document.getElementById(id).innerHTML = 'X';
        buttonsPressed[id] = true;
        for (let i = res[1] - 1; i > 1; i--) {
            let tempId = res[0] + i;
            if (document.getElementById(tempId).innerHTML != 'X') {
                document.getElementById(tempId).style.setProperty("text-decoration", "line-through");
                document.getElementById(tempId).disabled = true;
            } else {
                i = 0;
            }
        }
    } else {
        buttonsPressed[id] = false;
        if (res[1] == 13) {
            document.getElementById(id).innerHTML = "&nbsp";
        } else {
            document.getElementById(id).innerHTML = res[1];
        }
        for (let i = res[1] - 1; i > 1; i--) {
            let tempId = res[0] + i;
            if (document.getElementById(tempId).innerHTML != 'X') {
                document.getElementById(tempId).style.setProperty("text-decoration", "none");
                document.getElementById(tempId).disabled = false;
            } else {
                i = 0;
            }

        }
    }
    calculateScore(res[0]);
}

function change2(id) {
    let buttonText = document.getElementById(id).innerHTML;
    let res = id.split("");
    if (res[2])
        res[1] = res[1] + res[2];

    if (res[1] == 13)
        res[1] = 1;

    //console.log(buttonText);
    if (buttonText != 'X') {
        buttonsPressed[id] = true;
        //console.log(buttonText);
        document.getElementById(id).innerHTML = 'X';
        //console.log("res[1]: " + (parseInt(res[1]) + 1)); 
        for (let i = parseInt(res[1]) + 1; i < 13; i++) {
            //console.log("i: " + i);
            let tempId = res[0] + i;
            if (document.getElementById(tempId).innerHTML != 'X') {
                document.getElementById(tempId).style.setProperty("text-decoration", "line-through");
                document.getElementById(tempId).disabled = true;
            } else {
                //console.log("13?");
                i = 13;
            }
        }
    } else {
        buttonsPressed[id] = false;
        if (res[1] == 1) {
            document.getElementById(id).innerHTML = "&nbsp";
        } else {
            document.getElementById(id).innerHTML = res[1];
        }
        for (let i = parseInt(res[1]) + 1; i < 13; i++) {
            //console.log("i: " + i);
            let tempId = res[0] + i;
            if (document.getElementById(tempId).innerHTML != 'X') {
                document.getElementById(tempId).style.setProperty("text-decoration", "none");
                document.getElementById(tempId).disabled = false;
            } else {
                i = 13;
            }

        }
    }
    calculateScore(res[0]);
}