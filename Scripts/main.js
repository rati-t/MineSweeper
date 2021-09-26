$(document).ready(function () {

    var gap = 10;

    document.body.appendChild(Canvas.view);
    // create board    
    createNewBoard();

    // container
    const BoardContainer = new PIXI.Container();
    BoardContainer.width = Math.min(Canvas.view.width, Canvas.view.height);
    BoardContainer.height = Math.min(Canvas.view.width, Canvas.view.height);
    BoardContainer.x = Canvas.view.width / 2 - BoardContainer._width / 2;
    BoardContainer.y = Canvas.view.height / 2 - BoardContainer._height / 2;
    BoardContainer.interactive = true;

    console.log(BoardContainer._width)

    Canvas.stage.addChild(BoardContainer)

    const texture = new PIXI.Texture.from(document.getElementById("white"));

    var textureArray = {
        1: new PIXI.Texture.from(document.getElementById("1")),
        2: new PIXI.Texture.from(document.getElementById("2")),
        3: new PIXI.Texture.from(document.getElementById("3")),
        4: new PIXI.Texture.from(document.getElementById("4")),
        5: new PIXI.Texture.from(document.getElementById("5")),
        6: new PIXI.Texture.from(document.getElementById("6"))
    }

    const textureBomb = new PIXI.Texture.from(document.getElementById("bomb"));

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

    console.log(BoardContainer);

    function createNewBoard() {
        map = new Board(10, 10)
        map.Adjacent();
    }
    
    function playerClicked() {
        var index = BoardContainer.getChildIndex(this);

        var PrevSprite = BoardContainer.getChildAt(index);
        
        var i = parseInt(index / map.Height);
        var j = index % map.Width;

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
                }
            }
            BoardContainer.interactive = false;
        }
        if(!map.Board2DArray[i][j].IsBomb && BoardContainer.interactive) {
                var Sprite1 = new PIXI.Sprite.from(textureArray[map.Board2DArray[i][j].Adjacent]);
                Sprite1.x = PrevSprite.x;
                Sprite1.y = PrevSprite.y;
                Sprite1.width = PrevSprite.width;
                Sprite1.height = PrevSprite.height;
                BoardContainer.removeChild(PrevSprite);
                BoardContainer.addChildAt(Sprite1, index);
        }
    }
})

