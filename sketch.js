//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife;
var knifeImage ;
var fruitsGroup,fruit1,fruit2,fruit3,fruit4,monstersGroup,alien1,alien2,alien;
var gameOver,gameOverSound;


function preload(){
  
  knifeImage = loadImage("knife.png");
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  gameOver = loadImage("gameover.png")
  gameOverSound = loadSound ("gameover.mp3")
  alien2 = loadImage ("alien2.png")
  alien1 = loadImage ("alien1.png")
  fruit1 = loadImage ("fruit1.png")
  fruit2 = loadImage ("fruit2.png")
  fruit3 = loadImage ("fruit3.png")
  fruit4 = loadImage ("fruit4.png")
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  //create fruit and monster Group variable here
  fruitsGroup = createGroup();
  monsterGroup = createGroup();
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
    fruits();
    monsters();
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    
     
 
  
    // Increase score if knife touching fruit
   if(fruitsGroup.isTouching(knife)){

   fruitsGroup.destroyEach();
     score = score + 2
   
   }
    // Go to end state if knife touching enemy
      if (knife.isTouching(monsterGroup)){
        gameState = END;
        game = createSprite (200,200,50,50)
        game.addImage(gameOver)
        
      }
  }
  else if (gameState===END){
    monsterGroup.setVelocityXEach(0)
    fruitsGroup.setVelocityXEach(0)
    score = 0;
    if(keyDown("space")){
      reset();
    }
  }
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}

function fruits(){
  if(World.frameCount%40===0){
  fruit = createSprite(400,200,20,20)
  
  fruit.scale = 0.2
    
  r=Math.round(random(1,4));
  if (r == 1){

  fruit.addImage(fruit1)
    
  } else if (r == 2){

  fruit.addImage(fruit4)
    
  } else if (r == 3){
    
    fruit.addImage(fruit3)
    
  } else if (r == 4) {
    fruit.addImage(fruit2)
  } 
  fruit.velocityX = -7
    fruit.setLifetime  = 100;
    fruit.y = Math.round(random(0,400))
    fruitsGroup.add(fruit)
    
}
}
function monsters(){
  if(World.frameCount%54===0){
  
  alien = createSprite(340,200,20,20)
  
    alien.scale = 1
  r=Math.round(random(1,2));
  if (r == 1){
 alien.addImage(alien2)
  
    
  } else if (r == 2){

 alien.addImage(alien1)
    
  } 
  alien.velocityX = -7
    alien.setLifetime  = 100;
    alien.y = Math.round(random(0,400))
   monsterGroup.add(alien);
    
    
}
}
function reset(){
  
   gameState = PLAY;
  game.visible = false;
  fruitsGroup.destroyEach();
  monsterGroup.destroyEach();
  score = 0;
}


