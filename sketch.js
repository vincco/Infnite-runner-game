var astro, astroImg;
var bgnImg;
var alien, alienImg;
var star1, star1Img;
var star2, star2Img;

var starsGroup;
var alienGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;

function preload() {
  bgnImg = loadImage("bgnew.png");
  astroImg = loadImage("astro.png");
  star1Img = loadImage("star1.png");
  star2Img = loadImage("star2.png");
  alienImg = loadImage("alien.png");
}

function setup() {
  createCanvas(1200, 600);

  astro = createSprite(100, 300);
  astro.addImage(astroImg);
  astro.scale = 0.005;

  starsGroup = createGroup();
  alienGroup = createGroup();
}

function draw() {
  background("Black");

  fill("white");
  textSize(35);
  text("Score: " + score, 900, 50);

  if (gameState === PLAY) {
    
    // Movement
    if (keyIsDown(UP_ARROW)) {
      astro.y -= 5;
    }

    if (keyIsDown(DOWN_ARROW)) {
      astro.y += 5;
    }

    astro.y = constrain(astro.y, 50, height - 50);

    
    astro.overlap(starsGroup, collectStar);

    
    if (astro.isTouching(alienGroup)) {
      gameState = END;
    }

    spawnStars();
    spawnAlien();
  }

  else if (gameState === END) {
    starsGroup.setVelocityXEach(0);
    alienGroup.setVelocityXEach(0);

    starsGroup.setLifetimeEach(-1);
    alienGroup.setLifetimeEach(-1);

    fill("red");
    textSize(80);
    text("GAME OVER", 350, 300);

    fill("white");
    textSize(30);
    text("Final Score: " + score, 470, 370);
  }

  drawSprites();
}


function collectStar(player, star) {
  score += 10;
  star.remove();
}

function spawnStars() {

  if (frameCount % 60 === 0) {
    star1 = createSprite(1200, random(50, 550));
    star1.addImage(star1Img);
    star1.velocityX = -5;
    star1.scale = 0.01;
    star1.lifetime = 250;

    starsGroup.add(star1);
  }

  if (frameCount % 100 === 0) {
    star2 = createSprite(1200, random(50, 550));
    star2.addImage(star2Img);
    star2.velocityX = -6;
    star2.scale = 0.02;
    star2.lifetime = 250;

    starsGroup.add(star2);
  }
}

function spawnAlien() {

  if (frameCount % 70 === 0) {
    alien = createSprite(1200, random(50, 550));
    alien.addImage(alienImg);
    alien.velocityX = -7;
    alien.scale = 0.007;
    alien.lifetime = 250;

    alienGroup.add(alien);
  }
}
