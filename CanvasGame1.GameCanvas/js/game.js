function startGame() {
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    context : null,
    canvasWidth : 480,
    canvasHeight : 270,
    start : function() {
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.context = this.canvas.getContext("2d");
        drawBorder();
        setBackgroundImage();
        document.body.appendChild(this.canvas);
    }
}

function drawBorder() {
  myGameArea.context.rect(0, 0, myGameArea.canvasWidth, myGameArea.canvasHeight);
	myGameArea.context.stroke();
}

function setBackgroundImage() {
  var background = new Image();
  background.src = "images/beach.jpg";

  background.onload = function(){
  myGameArea.context.drawImage(background,0,0);
  }
}

window.onload = function() {
    startGame();
}
