///<reference path="p5.global-mode.d.ts"></reference>
class Game {
    constructor(gridWidth) {
        this.numX = Math.floor(width / gridWidth);
        this.numY = Math.floor(height / gridWidth);
        this.matrix = [];
        for (let i = 0; i < this.numX; i++) {
            this.matrix[i] = []
            for (let j = 0; j < this.numY; j++) {
                if (Math.random() < 0.5) {
                    this.matrix[i][j] = 1
                }
                else {
                    this.matrix[i][j] = 0
                }

            }
        }
    }

    display() {
        for (let i = 0; i < this.numX; i++) {
            for (let j = 0; j < this.numY; j++) {
                if (this.matrix[i][j] === 1) {
                    fill(255)
                    // noStroke()
                    rect(i * (width / this.numX), j * (height / this.numY), (width / this.numX), (height / this.numY))
                }
            }
        }
    }
    handleClick() {
        let i = Math.floor(mouseX / (width / this.numX))
        let j = Math.floor(mouseY / (height / this.numY))
        this.matrix[i][j] = 1
    }
    check(i, j) {
        if (i === 0 || i === this.numX - 1 || j === 0 || j === this.numY - 1) {
            return true
        }
        else {
            return false
        }
    }

    update() {
        let copyMatrix = []
        for (let i = 0; i < this.numX; i++) {
            copyMatrix[i] = []
            for (let j = 0; j < this.numY; j++) {
                if (this.check(i, j) === true) {
                    copyMatrix[i][j] = 0
                }
                else {
                    let neighbours = (this.matrix[i - 1][j] + this.matrix[i + 1][j] + this.matrix[i][j + 1] + this.matrix[i + 1][j + 1] + this.matrix[i - 1][j + 1] + this.matrix[i][j - 1] + this.matrix[i + 1][j - 1] + this.matrix[i - 1][j - 1]);
                    if (this.matrix[i][j] === 0 && (neighbours === 3)) {
                        copyMatrix[i][j] = 1
                    }
                    else if ((this.matrix[i][j] === 1) && (neighbours === 2 || neighbours === 3)) {
                        copyMatrix[i][j] = 1
                    }
                    else {
                        copyMatrix[i][j] = 0
                    }
                }
            }
        }
        this.matrix = copyMatrix
    }
}
let game;
let gridWidth = 15;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    game = new Game(gridWidth);
}

function draw() {
    background(0, 0, 0);
    game.display();
    game.update();
}

function mousePressed(){
    game.handleClick();
    console.log("Pressed!")

}