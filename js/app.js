//For Score
var score = 0;
var scoreUpdate = document.querySelector('.score');
scoreUpdate.textContent = score;

// Enemies our player must avoid
var Enemy = function (x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {

  //Multiplying speed by time delta(dt) will ensure the same speed in all devices
  this.x += this.speed * dt;

  // If the enemies reach the end of canvas, make them come from another side
  if (this.x > 507) {
    this.x -= 550;
  }

  //Checks if the player collides with the enemy
  if ((this.x < player.x + 30) && (this.x + 50 > player.x) && (this.y < player.y + 50) && (this.y + 30 > player.y)) {
    player.reset();
    if (score > 0) {
      score--;
      scoreUpdate.textContent = score;
    };
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player construction that takes x and y coordinates and speed of the player
var Player = function (x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function () {
  // Stops player from moving off canvas
  if (this.y > 380) {
    this.y = 380;
  }

  if (this.x > 400) {
    this.x = 400;
  }

  if (this.x < 0) {
    this.x = 0;
  }

  // Check for player reaching top of canvas and winning the game
  if (this.y == 0 || this.y < 0) {
    score++;
    scoreUpdate.textContent = score;
    player.reset();
  }
}

//Renders image on the screen for
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player prototype that handles the key presses and moves the player accordingly
Player.prototype.handleInput = function (key) {
  switch (key) {
    case 'left':
      this.x -= this.speed + 50;
      break;
    case 'up':
      this.y -= this.speed + 30;
      break;
    case 'right':
      this.x += this.speed + 50;
      break;
    case 'down':
      this.y += this.speed + 30;
      break;
  }
};

//Player prototype that resets the players position to 200 and 385 (Initial position)
Player.prototype.reset = function () {
  this.x = 200;
  this.y = 385;
}

//All the enemies with different starting point and speed
var allEnemies = [
  new Enemy(-199, 62, Math.floor(Math.random() * 200) + 189),
  new Enemy(-399, 144, Math.floor(Math.random() * 200) + 189),
  new Enemy(-299, 227, Math.floor(Math.random() * 200) + 189),
  new Enemy(-699, 62, Math.floor(Math.random() * 200) + 189),
  new Enemy(-499, 144, Math.floor(Math.random() * 200) + 189),
  new Enemy(-599, 227, Math.floor(Math.random() * 200) + 189)
];

//Player instances, with its x,y coordinate and speed of moving
var player = new Player(200, 385, 50);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
