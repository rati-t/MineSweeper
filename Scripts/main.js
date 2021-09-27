function newGame() {

    var width = parseInt(document.getElementById("width").value);
    var height = parseInt(document.getElementById("height").value);

    if(isNaN(width) || isNaN(height)){
        alert("Inccorect Values");
        return 0;
    } 
    else if(width <= 5 || height <= 5) {
        alert("Both dimensions should be more than 5");
        return 0;
    } else {
        BoardContainer.removeChildren()
    }

    $(document).ready(function () {
        // create board    
        createNewBoard();

        // container
        BoardContainer.width = Math.min(Canvas.view.width, Canvas.view.height);
        BoardContainer.height = Math.min(Canvas.view.width, Canvas.view.height);
        BoardContainer.x = Canvas.view.width / 2 - BoardContainer._width / 2;
        BoardContainer.y = Canvas.view.height / 2 - BoardContainer._height / 2;
        BoardContainer.interactive = true;

        console.log(BoardContainer._width)

        Canvas.stage.addChild(BoardContainer)

        // Fill container
        for (let i = 0; i < map.Height; i++) {
            for (let j = 0; j < map.Width; j++) {
                let Sprite = new PIXI.Sprite.from(texture);
                Sprite.interactive = true;
                Sprite.width = BoardContainer._width / map.Width * 0.95;
                Sprite.height = BoardContainer._height / map.Height * 0.95;
                Sprite.x = j * Sprite.width * 1.05;
                Sprite.y = i * Sprite.height * 1.05;


                Sprite.buttonMode = true;

                Sprite.on('pointerdown', playerClicked);

                BoardContainer.addChild(Sprite);
            }
        }

        
        function createNewBoard() {
            map = new Board(width, height)
            map.Adjacent();
        }
        
        function playerClicked() {

            var index = BoardContainer.getChildIndex(this);

            var i = parseInt(index / map.Height);
            var j = index % map.Width;

            if(!map.FirstClick) {

                map.Board2DArray[i][j].IsBomb = false;
                map.Board2DArray[i][j].Adjacent = 0;
                
                for (var hor = 0; hor < map.Height; hor++) {
                    for (var ver = 0; ver < map.Width; ver++) {

                        if( ( Math.abs(i - hor) <= 1 && Math.abs(j - ver) <= 1 ) 
                            || ( Math.abs(i - hor) <= 0 && Math.abs(j - ver) <= 2 ) 
                            || ( Math.abs(i - hor) <= 1 && Math.abs(j - ver) <= 0 )) {
                            map.Board2DArray[hor][ver].IsBomb = false;
                        }
                    }
                }
                map.FirstClick = true;
                map.Adjacent();
            }

            if(map.Board2DArray[i][j].IsBomb && BoardContainer.interactive) {
                
                for(var innerIndex = 0; innerIndex < BoardContainer.children.length; innerIndex++){

                    var innerHor = parseInt(innerIndex / map.Height);
                    var innerVer = innerIndex % map.Width; 

                    if(map.Board2DArray[innerHor][innerVer].IsBomb){
                        var Sprite1 = new PIXI.Sprite.from(textureBomb);
                        Sprite1.x = BoardContainer.children[innerIndex].x;
                        Sprite1.y = BoardContainer.children[innerIndex].y;
                        Sprite1.width = BoardContainer.children[innerIndex].width;
                        Sprite1.height = BoardContainer.children[innerIndex].height;
                        BoardContainer.removeChild(BoardContainer.children[innerIndex]);
                        BoardContainer.addChildAt(Sprite1, innerIndex);
                        BoardContainer.interactive = false;
                    }
                }
                alert("You Lost");
                CurrentGame.Lost++;
                document.getElementById("Lost").innerText = `Lost: ${CurrentGame.Lost}`; 
            }
            if(!map.Board2DArray[i][j].IsBomb && BoardContainer.interactive) {
                    if(map.Board2DArray[i][j].Adjacent == 0 && !map.Board2DArray[i][j].IsBomb){
                        clearNearby(i, j);
                    }
                    reSprite(i, j, index)
            }
        }

        function clearNearby(i, j) {
            for(let ElementIndex = 0; ElementIndex < BoardContainer.children.length; ElementIndex++) {

                var ElementinnerHor = parseInt(ElementIndex / map.Height);
                var ElementinnerVer = ElementIndex % map.Width; 

                if( Math.abs(ElementinnerHor - i) <= 1 
                    && Math.abs(ElementinnerVer - j) <= 1 
                    && !map.Board2DArray[ElementinnerHor][ElementinnerVer].IsBomb
                    && !map.Board2DArray[ElementinnerHor][ElementinnerVer].Visible){

                    reSprite(ElementinnerHor, ElementinnerVer, ElementIndex);
                }
            }
        }

        function reSprite(hor, ver, index1) {
            var PrevSprite = BoardContainer.getChildAt(index1);
            var Sprite1 = new PIXI.Sprite.from(textureArray[map.Board2DArray[hor][ver].Adjacent]);
            map.Board2DArray[hor][ver].Visible = true;
            Sprite1.x = PrevSprite.x;
            Sprite1.y = PrevSprite.y;
            Sprite1.width = PrevSprite.width;
            Sprite1.height = PrevSprite.height;
            BoardContainer.removeChild(PrevSprite);
            BoardContainer.addChildAt(Sprite1, index1);

            if(checkWinning()) {
                BoardContainer.interactive = false;
                alert("You Won");
                CurrentGame.Won++;
                document.getElementById("Won").innerText = `Won: ${CurrentGame.Won}`; 
            }
        }

        function checkWinning() {
            for (var i = 0; i < map.Height; i++) {
                for (var j = 0; j < map.Width; j++) {
                    if(!map.Board2DArray[i][j].IsBomb && !map.Board2DArray[i][j].Visible) {
                        return false;
                    }
                }
            }
            return true;
        }
    });
}



