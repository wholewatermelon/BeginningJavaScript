function startGame() {
    myGameArea.start();
}

function component(width, height, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y
  this.componentImage = new Image();
  this.componentImage.src = "images/bird.png";
}


function updateGameArea() {
  myGameArea.clear();
  myGameArea.update();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    component: new component(50, 50, 10, 120),
    context : null,
    canvasWidth : 480,
    canvasHeight : 270,
    background : new Image(),
    start : function() {
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.context = this.canvas.getContext("2d");
        this.drawBorder();
        this.setBackgroundImage();
        document.body.appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 20);
    },
    setBackgroundImage: function() {
      this.background.src = "images/beach.jpg";
      ctx = this.context;
      component = this.component;
      },
    drawBorder: function() {
      this.context.rect(0, 0, this.canvasWidth, this.canvasHeight);
    	this.context.stroke();
    },
    clear: function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    update: function() {
      ctx.drawImage(this.background,0,0);
      ctx.drawImage(component.componentImage, component.x, component.y, component.width, component.height);
    }
}

window.onload = function() {
    startGame();
}
