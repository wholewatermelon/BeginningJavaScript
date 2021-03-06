function startGame() {
  myGameArea.start();
}

function component(width, height, x, y, imageSrc) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  if (imageSrc != undefined) {
    this.componentImage = new Image();
    this.componentImage.src = imageSrc;
  }
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  this.crashWith = function(obstacle) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = obstacle.x;
    var othertop = obstacle.y;
    var otherright = obstacle.x + obstacle.width;
    var otherbottom = obstacle.y + obstacle.height;
    var crash = true;
    if ((mybottom < othertop) ||
      (mytop > otherbottom) ||
      (myright < otherleft) ||
      (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}

function updateGameArea() {
  myGameArea.clear();
  myGameArea.update();
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  component: new component(50, 50, 10, 120, "images/bird.png"),
  context: null,
  canvasWidth: 480,
  canvasHeight: 270,
  background: new Image(),
  backgroundX: 0,
  keys: [],
  obstacle: new component(20, 100, 120, 0),

  start: function() {
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.context = this.canvas.getContext("2d");
    this.drawBorder();
    this.setBackgroundImage();
    document.body.appendChild(this.canvas);
    this.interval = setInterval(updateGameArea, 20);
    keys = this.keys;
    window.addEventListener('keydown', function(e) {
      this.keys[e.keyCode] = (e.type == "keydown");
    })
    window.addEventListener('keyup', function(e) {
      this.keys[e.keyCode] = (e.type == "keydown");
    })
  },
  setBackgroundImage: function() {
    component = this.component;
    this.background.src = "images/beach.jpg";
  },
  drawObstacles: function() {
    this.context.fillStyle = "black";
    this.obstacle.x -= 1;
    this.context.fillRect(this.obstacle.x, this.obstacle.y, this.obstacle.width, this.obstacle.height);
    if (this.component.crashWith(this.obstacle)) {
      this.stop();
    }
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function() {
    clearInterval(this.interval);
  },

  moveComponent: function() {
    this.component.speedX = 0;
    this.component.speedY = 0;
    if (this.keys && this.keys[37]) {
      this.component.speedX = -1;
    }
    if (this.keys && this.keys[39]) {
      this.component.speedX = 1;
    }
    if (this.keys && this.keys[38]) {
      this.component.speedY = -1;
    }
    if (this.keys && this.keys[40]) {
      this.component.speedY = 1;
    }
    this.component.newPos();
  },

  moveBackground: function() {
    this.backgroundX -= 1;
    if (this.backgroundX <= 0 - this.canvasWidth) {
      this.backgroundX = 0;
    }
  },

  update: function() {
    this.moveComponent();
    this.moveBackground();
    this.context.drawImage(this.background, this.backgroundX, 0, this.canvasWidth, this.canvasHeight);
    this.context.drawImage(this.background, (this.backgroundX + this.canvasWidth), 0, this.canvasWidth, this.canvasHeight);
    this.context.drawImage(component.componentImage, component.x, component.y, component.width, component.height);
    this.drawObstacles();

  },
  drawBorder: function() {
    myGameArea.context.rect(0, 0, myGameArea.canvasWidth, myGameArea.canvasHeight);
    myGameArea.context.stroke();
  }
}

window.onload = function() {
  startGame();
}