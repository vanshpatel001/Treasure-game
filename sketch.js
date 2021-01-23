var sword,fruit,enemy,monster;

var fruit1,fruit2,fruit3,fruit4;

var swordImage,monsterImage,gameOverImage;

var fruitGroup,enemyGroup,score;

var Play = 1;
var END = 0;
var gameState = 1;

function preload(){
  
  swordImage = loadImage("sword.png");
  
  gameOverImage = loadImage("gameover.png");
 
  fruit1 = loadImage("fruit1.png");
  
  fruit2 =loadImage("fruit2.png");
  
  fruit3= loadImage("fruit3.png");
  
  fruit4= loadImage("fruit4.png");
  
  monsterImage = loadAnimation("alien1.png","alien2.png");
}

function setup(){
  //creating sword
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  
  fruitGroup = new Group();
}

function draw(){

  background("lightblue");
  
   if(gameState===Play){
     //call fruits and enemy functions
     Fruits();
     Enemy();
     
     //move sword with mouse
     sword.y=World.mouseY;
     sword.x=World.mouseX;
     
     // Increase score if sword touching fruit
     if(fruitGroup.isTouching(sword)){
       fruitGroup.destroyEach();
       score=score+2;
     }
     else if (gameState===END){
       gameOver.visible = true
       if(enemyGroup.isTouching(sword)){
         fruitGroup.destroyEach();
         enemyGroup.destroyEach();
         fruitGroup.setVelocityXEach(0);
         enemyGroup.setVelocityXEach(0);
         
    // Change the animation of sword to gameover and reset its position
         sword.addImage(gameOverImage);
         sword.x=200; sword.y=200; 
         Fruits();
         Enemy();
     }
       
   }
} 
  
  drawSprites();
}

function Fruits(){
  if(World.frameCount%80===0){
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
      //fruit.debug = true
    r = Math.round(random(1,4));
    if(r == 1){
      fruit.addImage(fruit1);
    } else if (r == 2){
      fruit.addImage(fruit2);         
    } else if (r == 3){
      fruit.addImage(fruit3);         
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(50,340));
     
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
  }
}

function Enemy(){
  if(World.frameCount%200 === 0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y = Math.round(random(100,300));
    monster.velocityX = -8;
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);     
  }
}