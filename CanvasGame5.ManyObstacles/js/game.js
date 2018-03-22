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

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  hero: new component(50, 50, 10, 120, "images/bird.png"),
  context: null,
  canvasWidth: 480,
  canvasHeight: 270,
  background: new Image(),
  backgroundX: 0,
  keys: [],
  obstacles: [],

  start: function() {
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.context = this.canvas.getContext("2d");
    this.frameNo = 0;
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

    this.background.src = "images/beach.jpg";
  },

  drawObstacles: function() {
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
      x = this.canvasWidth;
      y = this.canvasHeight - 200;

      let minHeight = 20;
      let maxHeight = 200;
      let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
      let minGap = 70;
      let maxGap = 200;
      let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
      this.obstacles.push(new component(10, height, x, 0));
      this.obstacles.push(new component(10, x - height - gap, x, height + gap));

    }
    for (i = 0; i < this.obstacles.length; i += 1) {
      let obstacle = this.obstacles[i];
      obstacle.x -= 1;

      this.context.fillStyle = "black";
      this.context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

      if (this.hero.crashWith(obstacle)) {
        this.stop();
      }
    }
    if (this.obstacles[0].x < 0) {
      this.obstacles.splice(0, 1);
    }
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function() {
    clearInterval(this.interval);
  },

  moveHero: function() {
    this.hero.speedX = 0;
    this.hero.speedY = 0;
    if (this.keys && this.keys[37]) {
      this.hero.speedX = -1;
    }
    if (this.keys && this.keys[39]) {
      this.hero.speedX = 1;
    }
    if (this.keys && this.keys[38]) {
      this.hero.speedY = -1;
    }
    if (this.keys && this.keys[40]) {
      this.hero.speedY = 1;
    }
    this.hero.newPos();
  },

  moveBackground: function() {
    this.backgroundX -= 1;
    if (this.backgroundX <= 0 - this.canvasWidth) {
      this.backgroundX = 0;
    }
  },

  update: function() {
    this.moveHero();
    this.moveBackground();
    this.context.drawImage(this.background, this.backgroundX, 0, this.canvasWidth, this.canvasHeight);
    this.context.drawImage(this.background, (this.backgroundX + this.canvasWidth), 0, this.canvasWidth, this.canvasHeight);
    this.context.drawImage(this.hero.componentImage, this.hero.x, this.hero.y, this.hero.width, this.hero.height);
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