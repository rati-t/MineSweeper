var CurrentGame = new Game;
var map = [];
const Canvas = new PIXI.Application({  
                                       width: window.innerWidth,
                                       height: window.innerHeight * 0.9,
                                       backgroundColor: "0xFFFFFF"
                                    });

const BoardContainer = new PIXI.Container();
const Flaged = "Flaged";


var textureArray;
var texture;
var textureBomb;

$(document).ready(function(){
    document.body.appendChild(Canvas.view);

    textureArray = {
        0: new PIXI.Texture.from(document.getElementById("0")),
        1: new PIXI.Texture.from(document.getElementById("1")),
        2: new PIXI.Texture.from(document.getElementById("2")),
        3: new PIXI.Texture.from(document.getElementById("3")),
        4: new PIXI.Texture.from(document.getElementById("4")),
        5: new PIXI.Texture.from(document.getElementById("5")),
        6: new PIXI.Texture.from(document.getElementById("6")),
        Flaged:  new PIXI.Texture.from(document.getElementById("Flaged"))
    }

    texture = new PIXI.Texture.from(document.getElementById("white"));
    textureBomb = new PIXI.Texture.from(document.getElementById("bomb"));
})



                                    

