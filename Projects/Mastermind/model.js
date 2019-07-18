export default class Model{
    constructor () {
        this.settings = {numGuesses: 10, numColors: 6};
        this.savedSettings = readLS("settings");
        if(this.savedSettings != null) {
            this.settings = this.savedSettings;
        }
        this.gameColors = getGameColors(this.settings.numColors);
        this.winningPattern = getWinningPattern(this.gameColors);
    }

    updateSettings(settings) {
        this.settings.numGuesses = settings.numGuesses;
        if(this.settings.numGuesses > 30)
            this.settings.numGuesses = 30;
        this.settings.numColors = settings.numColors;
        writeLS("settings", this.settings);
    }

    getSettings() {
        return {settings: this.settings, colors: this.gameColors};
    }

    checkGuess(element) {
        console.log("Checking Guess");
    }
}

function getGameColors(numColors) {
    const allColors = ["red", "blue", "purple", "green", "yellow", "maroon", "lime", "teal", "navy", "fuchsia"];
    const gameColors = allColors.slice(0);
    gameColors.length = numColors;//trim off excess colors
    return gameColors;
}

function getWinningPattern(gameColors) {
    const winningPattern = [];
    for (let i = 0; i < 4; i++){
        winningPattern.push(gameColors[Math.floor(Math.random()*gameColors.length)]);
    }
    console.log(winningPattern);
    return winningPattern;
}

function readLS(key) {
    return JSON.parse(window.localStorage.getItem(key));
}

function writeLS(key, settings) {
    window.localStorage.setItem(key, JSON.stringify(settings));
}