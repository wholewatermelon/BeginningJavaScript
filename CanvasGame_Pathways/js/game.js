function startGame() {

  let canvasWidth = 600;
  let canvasHeight = 500;
  let heroSize = 50;

  let backgroundImageIndex = 1;
  let heroImageIndex = 1;
  let moveLeftRightAllowed = true;

  // speedFactor is a multiplier for how fast the hero flies The higher the number, the faster it moves.
  // Best results are if the speedFactor is less than 20
  let speedFactor = 1;

  let minGapBetweenObstacles = 100;
  let maxGapBetweenObstacles = 200;

  //These will need to be modified if the canvasHeight is changed.
  // The math is a little weird for using them.  See the drawObstacles function
  let minHeightObstacles = 20;
  let maxHeightObstacles = 200;

  myGameArea.start(
    canvasWidth,
    canvasHeight,
    speedFactor,
    backgroundImageIndex,
    heroImageIndex,
    minGapBetweenObstacles,
    maxGapBetweenObstacles,
    minHeightObstacles,
    maxHeightObstacles,
    moveLeftRightAllowed,
    heroSize);
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
  if ((myGameArea.frameNo % n) == 0) {
    return true;
  }
  return false;
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  hero: null,
  context: null,
  canvasWidth: 0,
  canvasHeight: 0,
  background: new Image(),
  backgroundX: 0,
  keys: [],
  obstacles: [],
  speedFactor: 1,

  start: function(canvasWidth, canvasHeight, speedFactor, backgroundImageIndex, heroImageIndex, minGapBetweenObstacles, maxGapBetweenObstacles, minHeightObstacles, maxHeightObstacles, moveLeftRight, heroSize) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.speedFactor = speedFactor;
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.heroImageIndex = heroImageIndex;
    this.context = this.canvas.getContext("2d");
    this.frameNo = 0;
    this.moveLeftRight = moveLeftRight;
    this.minGap = minGapBetweenObstacles;
    this.maxGap = maxGapBetweenObstacles;
    this.minHeight = minHeightObstacles;
    this.maxHeight = maxHeightObstacles;

    this.drawBorder();
    this.setBackgroundImage(backgroundImageIndex);
    this.hero = new component(heroSize, heroSize, 200, 120, this.getHeroImage(heroImageIndex)),
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
  setBackgroundImage: function(index) {
    switch (index) {
      case 1:
        this.backgroundSrc = "images/beach.jpg";
        break;
      case 2:
        this.backgroundSrc = "images/mountains.png"
        break;
      case 3:
        this.backgroundSrc = "images/grass.jpg"
        break;
      case 4:
        this.backgroundSrc = "images/sand.jpg"
        break;
      case 5:
        this.backgroundSrc = "images/winter.jpg"
        break;
      case 6:
        this.backgroundSrc = "images/tree.jpg"
        break;
      case 7:
        this.backgroundSrc = "images/cartoon.jpg"
        break;
      default:
        this.backgroundSrc = "images/brick.jpg"
        break;
    }
    this.background.src = this.backgroundSrc;
  },
  getHeroImage: function(index) {
    switch (index) {
      case 1:
        return "images/bird.png";
      case 2:
        return "images/butterfly.png";
      case 3:
        return "images/frog.png";
      case 4:
        return "images/pig.png";
      case 5:
        return "images/rick.gif";
      case 6:
      default:
        return "images/squirrel.png";
    }
  },
  drawObstacles: function() {
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
      x = this.canvasWidth;
      y = this.canvasHeight - 200;

      let height = Math.floor(Math.random() * (this.maxHeight - this.minHeight + 1) + this.minHeight);
      let gap = Math.floor(Math.random() * (this.maxGap - this.minGap + 1) + this.minGap);
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
    if (this.moveLeftRight && this.keys && this.keys[37]) {
      this.hero.speedX = -1 * this.speedFactor;
    }
    if (this.moveLeftRight && this.keys && this.keys[39]) {
      this.hero.speedX = 1 * this.speedFactor;
    }
    if (this.keys && this.keys[38]) {
      this.hero.speedY = -1 * this.speedFactor;
    }
    if (this.keys && this.keys[40]) {
      this.hero.speedY = 1 * this.speedFactor;
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