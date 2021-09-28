class Game {
    constructor(){
        this.Won = 0;
        this.Lost = 0;
    }
}


class Board {
    constructor(width, height) {
        this.Width = width;
        this.Height = height
        this.Board2DArray = this.create2DArray()
        this.FirstClick = false;
    }

    isBombArray = [ false, false, false, true]

    create2DArray() {

        var bomb2DArray = [];

        for (var i = 0; i < this.Height; i++) {

            var bomb1DArray = []

            for (var j = 0; j < this.Width; j++) {
                var index = parseInt(Math.random() * 4);
                bomb1DArray.push(new Cell(this.isBombArray[index], j, i));
            }
            bomb2DArray.push(bomb1DArray);
        }
        return bomb2DArray;
    }

    Adjacent() {
        for (var i = 0; i < this.Height; i++) {
            for (var j = 0; j < this.Width; j++) {
                map.Board2DArray[i][j].Adjacent = 0;
                map.Board2DArray[i][j].AdjBombs();
            }
        }
    }
}

class Cell {
    constructor(isBomb, x, y) {
        this.x = x;
        this.y = y;
        this.Adjacent = 0;
        this.IsBomb = isBomb;
        this.Visible = false;
        this.IsFlaged = false;
    }

    AdjBombs() {
        for (var i = 0; i < map.Height; i++) {
            for (var j = 0; j < map.Width; j++) {
                if (Math.abs(this.y - i) <= 1 && Math.abs(this.x - j) <= 1 && map.Board2DArray[i][j].IsBomb) {
                    this.Adjacent++;
                }   
            }
        }
    }
}

