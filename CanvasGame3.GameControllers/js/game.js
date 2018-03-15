function startGame() {
  myGameArea.start();
}

function component(width, height, x, y, imageSrc) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.componentImage = new Image();
  this.componentImage.src = imageSrc;
}

function updateGameArea() {
  myGameArea.clear();
  myGameArea.component.x += 1;
  myGameArea.update();
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  component: new component(50, 50, 10, 120, "images/bird.png"),
  context: null,
  canvasWidth: 480,
  canvasHeight: 270,
  background: new Image(),
  start: function() {
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.context = this.canvas.getContext("2d");
    this.drawBorder();
    this.setBackgroundImage();
    document.body.appendChild(this.canvas);
    this.interval = setInterval(updateGameArea, 20);
  },
  setBackgroundImage: function() {
    component = this.component;
    this.background.src = "images/beach.jpg";
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  update: function() {
    this.context.drawImage(this.background, 0, 0, myGameArea.canvasWidth, myGameArea.canvasHeight);
    this.context.drawImage(component.componentImage, component.x, component.y, component.width, component.height);
  },
  drawBorder: function() {
    myGameArea.context.rect(0, 0, myGameArea.canvasWidth, myGameArea.canvasHeight);
    myGameArea.context.stroke();
  }
}

window.onload = function() {
  startGame();
}
