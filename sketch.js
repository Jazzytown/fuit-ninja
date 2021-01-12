//Game States
var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit ,bomb,fruitGroup,enemyGroup, score,r,randomFruit;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, bombImage, gameOverImage
function preload(){
  
  swordImage = loadImage("sword.png");
  bombImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  
}
function setup() {
  createCanvas(600, 600);
  
  //creating sword
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7
  
  //set collider for sword
  sword.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Call fruits and Enemy function
    fruits();
    Enemy();
  
    // movement of sword
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    // score for points
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+3;
    }
    else
    {
      // gameover
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        // Change the animation
        sword.addImage(gameOverImage);
        sword.x=200;
        sword.y=200;
      }
    }
  }
  
  drawSprites();
  
  //score
  text("Score : "+ score,700,70);
}


function Enemy(){
  if(World.frameCount%200===0){
    bomb=createSprite(400,200,20,20);
    bomb.addAnimation("moving", bombImage);
    bomb.y=Math.round(random(100,300));
    bomb.velocityX=-8;
    bomb.setLifetime=50;
    
    enemyGroup.add(bomb);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}