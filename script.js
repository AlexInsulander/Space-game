// Setup
window.focus;
let startMenu = document.getElementById("container");
startMenu.width = window.innerWidth;
startMenu.height = window.innerHeight;

let myCanvas = document.getElementById("myCanvas");
myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

let c = myCanvas.getContext("2d");
var output = document.getElementById("demo");
var output2 = document.getElementById("demo2");

const enemyimg = document.createElement("img");
enemyimg.src = "image/meteorite.png";

const img = document.createElement("img");
img.src = "image/raketman.png";

let enemies = [];

//Position
let currentX = window.innerWidth / 2; //current x coordinate
let currentY = window.innerHeight / 2; //current y coordinate
let speed = 4; //speed of player
let playerInterval = 0;
let k = 0;
let m = 0;
let startX = currentX;
let startY = currentY;
let enemiesPerSecond = 1;
let enemySpeed = 1;
let x1 = 0;
let y1 = 0;
let score = 0;

c.strokeStyle = 'yellow'
c.fillStyle = 'yellow'



var slider = (document.getElementById("myRange").oninput = function () {
  enemiesPerSecond = ((this.value - this.min) / (this.max - this.min)) * 9 + 1;

  this.style.background =
    "linear-gradient(to right, #6db8dff 0%, #ff2a5f " +
    enemiesPerSecond +
    "%, #fff " +
    enemiesPerSecond +
    "%, #fff 100%";

  output.innerHTML = "Enemies per second " + this.value;
});

var slider2 = (document.getElementById("myRange2").oninput = function () {
  enemySpeed = ((this.value - this.min) / (this.max - this.min)) * 9 + 1;

  this.style.background =
    "linear-gradient(to right, #6db8dff 0%, #ff2a5f " +
    enemySpeed +
    "%, #fff " +
    enemySpeed +
    "%, #fff 100%";

  output2.innerHTML = "Enemy speed " + this.value;
});

c.drawImage(img, currentX, currentY, 50, 75);

let running = false;
//Användarinput

class enemy {
  constructor(posX, posY, speed) {
    this.posX = posX;
    this.posY = posY;
    this.angle = getAngle(this.posX, this.posY, currentX, currentY);
    this.moveX = Math.cos(this.angle) * speed;
    this.moveY = Math.sin(this.angle) * speed;
    this.speed = speed;
  }
}

var getAngle = function (currentX, currentY, destX, destY) {
  var xdir = destX - currentX;
  var ydir = destY - currentY;

  var theta = Math.atan2(ydir, xdir);

  return theta;
};

function move(currentX, currentY, moveX, moveY, destX, startX) {
  if (Math.abs(moveX) * k < Math.abs(destX - startX)) {
    currentX += moveX;
    currentY += moveY;
    k += 1;
  }
  return { currentX, currentY };
}

function enemyMove(currentX, currentY, moveX, moveY) {
  currentX += moveX;
  currentY += moveY;
  return { currentX, currentY };
}

document.addEventListener("mouseup", (e) => {
  k = 0;
  h = 0;
  x1 = e.x;
  y1 = e.y;
  startX = currentX;
});

function getRandom() {
  sida = Math.floor(Math.random() * 4);
  if (sida == 0) {
    cx1 = 0 - 45;
    cy1 = Math.floor(Math.random() * myCanvas.height);
  } else if (sida == 1) {
    cx1 = Math.floor(Math.random() * myCanvas.width);
    cy1 = 0 - 70;
  } else if (sida == 2) {
    cx1 = myCanvas.width - 5;
    cy1 = Math.floor(Math.random() * myCanvas.height);
  } else if (sida == 3) {
    cx1 = Math.floor(Math.random() * myCanvas.width);
    cy1 = myCanvas.height - 5;
  }

  return [cx1, cy1];
}

function start() {
  document.getElementById("container").style.display = "none";
  document.getElementById("container2").style.display = "block";
  currentX = myCanvas.width / 2;
  currentY = myCanvas.height / 2;
  h = 20;

  document.addEventListener("mouseup", (e) => {
    var angle = getAngle(currentX, currentY, e.x, e.y);
    var moveX = Math.cos(angle) * speed;
    var moveY = Math.sin(angle) * speed;
    // console.log(playerInterval);

    clearInterval(playerInterval);

    playerInterval = setInterval(function () {
      coords = move(currentX, currentY, moveX, moveY, e.x, startX);
      currentX = coords.currentX;
      currentY = coords.currentY;
    }, 20);
  });

  setInterval(function () {
    let enemycoords = getRandom();

    let newEnemy = new enemy(enemycoords[0], enemycoords[1], enemySpeed);
    enemies.push(newEnemy);
  }, 1000 / enemiesPerSecond);

  const gameInterval = setInterval(function () {
    c.clearRect(0, 0, myCanvas.width, myCanvas.height);
    for (let j = 0; j < enemies.length; j++) {
      enemymove = enemyMove(
        enemies[j].posX,
        enemies[j].posY,
        enemies[j].moveX,
        enemies[j].moveY
      );
      enemies[j].posX = enemymove.currentX;
      enemies[j].posY = enemymove.currentY;
      console.log(enemies[j].posX);
      console.log(enemies[j].posY);

      c.translate(enemies[j].posX, enemies[j].posY);
      c.rotate(enemies[j].angle);
      c.drawImage(
        enemyimg,
        -enemyimg.width / 1.3,
        -enemyimg.height / 2,
        enemyimg.width,
        enemyimg.height
      );
      c.rotate(-enemies[j].angle);
      c.translate(-enemies[j].posX, -enemies[j].posY);
      
      c.beginPath()
      c.rect(enemies[j].posX - 25, enemies[j].posY - 25, 50, 50)
      c.stroke()

      if (
        currentX - 27 < enemymove.currentX + 35 &&
        enemymove.currentX - 24 < currentX + 23 &&
        currentY - 37 < enemymove.currentY + 30 &&
        enemymove.currentY - 25 < currentY + 37
      ) {
        document.getElementById("gameOver").innerHTML = "GAME OVER";
        document.getElementById("restart").innerHTML = '<a href="index.html"><button class="restart">Restart</button></a>';
        clearInterval(gameInterval);
      }
    }
    c.drawImage(img, currentX - 25, currentY - 37.5, 50, 75);
    c.beginPath()
    c.rect(currentX - 25, currentY - 37.5, 50, 75)
    c.stroke()


    score += 1;
    document.getElementById("score").innerHTML = score;

    if (score >= 1000) {
      document.getElementById("gameOver").innerHTML = "YOU WIN";
        document.getElementById("restart").innerHTML = '<a href="index.html"><button class="restart">Restart</button></a>';
        clearInterval(gameInterval);
    } 

    if (score > 1500 && score % 100 == 0) {
      enemies.shift();
    }

    if (h < 20) {
      c.beginPath();
      c.arc(x1, y1, 4 - h / 5, 0, 2 * Math.PI);
      c.fill();
      c.stroke();
    }
    h += 1;
  }, 20);
}
