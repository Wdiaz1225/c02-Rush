//breakout close (core mechanics)
//mouse to control the paddle, click to start
let gameState = 'title';

var car1,car1Image;
var car2,car2Image;
var scooter,scooterImage;
var truck,truckImage;
var car1Group,car2Group,scooterGroup,truckGroup;
var road,roadImage;
var player,playerImage;
var score;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameover,gameoverImage
var restart,restartImage

function preload(){
  playerImage=loadImage("player.png");
  roadImage=loadImage("Road.jpg");
  car1Image=loadImage("car1.png");
  car2Image=loadImage("car2.png");
  scooterImage=loadImage("scooter.png");
   truckImage=loadImage("truck.png");
  gameoverImage=loadImage("gameover.png");
  restartImage=loadImage("restart.png");

}

function setup() {
  createCanvas(800, 600);

  paddle = createSprite(width/8, height-50, 10);
  paddle.immovable = true;

  wallTop = createSprite(width/2, -WALL_THICKNESS/2, width+WALL_THICKNESS*2, WALL_THICKNESS);
  wallTop.immovable = true;

  wallBottom = createSprite(width/2, height+WALL_THICKNESS/2, width+WALL_THICKNESS*2, WALL_THICKNESS);
  wallBottom.immovable = true;

  wallLeft = createSprite(-WALL_THICKNESS/2, height/2, WALL_THICKNESS, height);
  wallLeft.immovable = true;

  wallRight = createSprite(width+WALL_THICKNESS/2, height/2, WALL_THICKNESS, height);
  wallRight.immovable = true;

  bricks = new Group();

  var offsetX = width/2-(COLUMNS-1)*(BRICK_MARGIN+BRICK_W)/2;
  var offsetY = 80;

  for(var r = 0; r<ROWS; r++)
    for(var c = 0; c<COLUMNS; c++) {
      var brick = createSprite(offsetX+c*(BRICK_W+BRICK_MARGIN), offsetY+r*(BRICK_H+BRICK_MARGIN), BRICK_W, BRICK_H);
      brick.shapeColor = color(150);
      bricks.add(brick);
      brick.immovable = true;
    }

  //the easiest way to avoid pesky multiple collision is to
  //have the ball bigger than the bricks
  ball = createSprite(width/2, height-200, 11, 11);
  ball.maxSpeed = MAX_SPEED;
  paddle.shapeColor = ball.shapeColor = color(255, 0, 0);

}

function draw() {
  switch (gameState) {
  /* Each 'screen' that you want should be defined with a word,
  this word will correspond to a 'case' as seen below. The case
  will be followed by all of functions you want within that screen
  and end with a 'break;'. */
  case 'title':
    titleScreen();
    break;
  case 'lvl1':
    gameStage1();
    break;
  case 'gameover':
    gameOver();
    break;
}

}

function keyReleased() {
  if (gameState === 'title' || gameState === 'gameover') {
    if (key === 's' || key === 'S' ) {
      gameState = 'lvl1';
      bgR = 100;
      bgG = 240;
      bgB = 100;
    }
  } else if (gameState === 'lvl1') {
    if (key === 's' || key === 'S' ) {
      bgR = random(255);
      bgG = random(255);
      bgB = random(255);
    }
  }
}
function titleScreen () {
  text('title',width/2,height/2);
}
function gameStage1 () {
  background( 41, 246, 62);

  paddle.position.x = constrain(mouseX, paddle.width/2, width-paddle.width/2);

  ball.bounce(wallTop);
  ball.bounce(wallBottom);
  ball.bounce(wallLeft);
  ball.bounce(wallRight);

  if(ball.bounce(paddle))
  {
    var swing = (ball.position.x-paddle.position.x)/3;
    ball.setSpeed(MAX_SPEED, ball.getDirection()+swing);
        gameState = 'gameover';
  }

  ball.bounce(bricks, brickHit);

  drawSprites();
}

function gameOver () {
  text('gameover', width/2,height/2);
}

function mousePressed() {
  if(ball.velocity.x == 0 && ball.velocity.y == 0)
    ball.setSpeed(MAX_SPEED, random(90-10, 90+10));
}

function brickHit(ball, brick) {
  brick.remove();
}
