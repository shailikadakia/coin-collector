// Content behind double slashes is a comment. Use it for plain English notes,
// or for code that you want to temporarily disable.
/* global createCanvas, background, colorMode, HSB, random, width, height,
   ellipse, mouseX, mouseY, text, ellipseMode, CENTER, collideCircleCircle, createButton, clear, 
   textSize, textStyle, strokeWeight, BOLD, ITALIC, pop, push, soundFormats, loadSound, color, fill, key*/

let brushHue, backgroundColor, score, time, gameIsOver, hit, restartButton, backgroundSound, audioButton, 
  coinAX, coinAY, coinBX, coinBY, coinCX, coinCY, coinDX, coinDY, coinEX, coinEY, 
    colorA, colorB, colorC, colorD, colorE, playAgainButton, gameOverSound;

function preload () {
  soundFormats('mp3', 'ogg');
  gameOverSound = loadSound ('https://cdn.glitch.com/12a285e3-a58d-4335-9f78-f90678432364%2FSuper%20Mario%20Bros.%20-%20Game%20Over%20Sound%20Effect.mp3?v=1594668089420');
  backgroundSound = loadSound('https://cdn.glitch.com/12a285e3-a58d-4335-9f78-f90678432364%2FFunky%20Stadium%20-%20Mario%20Kart%20Wii.mp3?v=1594664952977');
}

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  ellipseMode (CENTER);
  brushHue = 0;
  backgroundColor = 95;
  gameOverSound.playMode ('sustain')
  
  // assigning random x and y coordinates to the different sized ellipses 
  coinAX = random(width-40);
  coinAY = random(height-40);
  coinBX = random(width-30);
  coinBY = random(height-30);
  coinCX = random(width-20);
  coinCY = random(height-20);
  coinDX = random(width-20);
  coinDY = random(height-20);
  coinEX = random(width-20);
  coinEY = random(height-20);
  
  time = 1000;
  score = 0;
  gameIsOver = false;
  
  restartButton = createButton ('Restart');
  restartButton.position (350, 50);
  restartButton.mousePressed (restart);
  audioButton = createButton ('Play or Pause Audio');
  audioButton.position (280, 75);
  audioButton.mousePressed (playAudio);
  
  // Sets colors for the different sized ellipses 
  colorA = color(350, 100, 100);
  colorB = color (280, 100, 100);
  colorC = color(190, 100, 100);
  colorD = color(130, 100, 100);
  colorE = color(40, 100, 100);
}

function draw() {
  // draw the five differently colored ellipses 
  background(backgroundColor);
  fill (colorA);
  ellipse(coinAX, coinAY, 40);
  fill (colorB);
  ellipse (coinBX, coinBY, 30);
  fill (colorC);
  ellipse (coinCX, coinCY, 20);
  fill (colorD);
  ellipse (coinDX, coinDY, 10);
  fill (colorE);
  ellipse (coinEX, coinEY, 5);
  fill ('black')
  ellipse(mouseX, mouseY, 20);
  
  // calls the respective handleCollision function
  if (!gameIsOver){
      hit = collideCircleCircle(coinAX, coinAY, 40, mouseX, mouseY, 20);
      handleCollisionA ();
    
      hit = collideCircleCircle (coinBX, coinBY, 30, mouseX, mouseY, 20);
      handleCollisionB ();
    
      hit = collideCircleCircle (coinCX, coinCY, 20, mouseX, mouseY, 20);
      handleCollisionC () ;
    
      hit = collideCircleCircle (coinDX, coinDY, 10, mouseX, mouseY, 20);
      handleCollisionD () ;
    
      hit = collideCircleCircle (coinEX, coinEY, 5, mouseX, mouseY, 20);
      handleCollisionE () ;
  }
  // increases or decreases the player token depending on the score 
  playerToken ();
  
  handleTime ();
 // powerup ();
  text(`Time remaining: ${time}`, 20, 40);
  text(`Score: ${score}`, 20, 60);
}

function handleCollisionA() {
  if (hit) {
    score = score + 1;
    coinAX = random (width);
    coinAY = random (height);
  }    
}
function handleCollisionB() {
  if (hit) {
    score = score + 2;
    coinBX = random (width);
    coinBY = random (height);
    }
}
function handleCollisionC() {
  if (hit) {
    score = score + 4;
    coinCX = random (width);
    coinCY = random (height);
    }
}
function handleCollisionD() {
  if (hit) {
    score = score + 6;
    coinDX = random (width);
    coinDY = random (height);
    }
}
function handleCollisionE () {
  if (hit) {
    score = score + 10;
    coinEX = random (width);
    coinEY = random (height);
    }
}
function handleTime() {
  if (time > 0) {
      time = time - 1;
  }
  else  {
   gameIsOver = true;
    scoreRater ();
    push ();
    strokeWeight (2);
    textStyle (BOLD);
    textSize (40);
    text('Game Over', 100, 180);
    pop (); 
  }    
}
function restart () {
  setup ();
}

function playAudio () {
    if (backgroundSound.isPlaying()) { 
    backgroundSound.stop();
      
    background(255,0,0);
    } 
    else {
   backgroundSound.play();
  }
}

// Gives feedback after the game is over 
function scoreRater () {
  textStyle (ITALIC);
  textSize (14);
  if (score < 20) {
     text('You did okay!', 170, 200);
  }
  if (score > 20 && score < 40){
    text('You are getting better!', 170, 200);
  }
  if (score > 40 && score < 60) {
    text('You did well!', 170, 200);
  }
  if (score > 60 && score < 80) {
    text ('You did great!', 170, 200);
  }
   if (score > 80 && score < 100) {
    text ('Keep up the great work!', 170, 200);
  }
   if (score >  100) {
    text ('You did outstanding!', 170, 200);
  }
  text ('Press p', 170, 220)
}

// Increases the token size as the player gets more points
// Token decreases at 175 points to make the game challenging 
function playerToken () {
  if (score >= 50 && score < 100){
    ellipse (mouseX, mouseY, 30);
  }
   if (score >= 100 && score < 150){
    ellipse (mouseX, mouseY, 40);
  }
  else if (score >= 150 && score < 175) {
    ellipse (mouseX, mouseY, 50);
  }
  else if (score >= 175){
    ellipse (mouseX, mouseY, 20);
  }
}
// function powerup () {
//   if (score == 150) {
//   time = time +100;
//   } 
//   if (score == 200) {
//     time = time + 100;
//   }
// }

function keyPressed () {
  if (key == "p"){
    backgroundSound.stop ();
    gameOverSound.play ();
  }
}
