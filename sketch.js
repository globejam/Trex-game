var trex, trex_running, edges;
var ground,groundImage;
var invisibleGround;
var cloudImage;
var cactus1,cactus2,cactus3,cactus4,cactus5,cactus6;
var score;
var obisticalGroup,cloudGroup;
var PLAY =1;
var END = 0;
var trexCollide;
var gameState = PLAY;
var resartGame,gameOver;
var resartImg,overImg;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexCollide = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
cloudImage = loadImage("cloud.png");
cactus1 = loadImage("obstacle1.png");
cactus2 = loadImage("obstacle2.png");
cactus3 = loadImage("obstacle3.png");
cactus4 = loadImage("obstacle4.png");
cactus5 = loadImage("obstacle5.png");
cactus6 = loadImage("obstacle6.png");
resartImg = loadImage("restart.png");
overImg = loadImage("gameOver.png");
}

function setup(){
  createCanvas(600,200);
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide",trexCollide);
  edges = createEdgeSprites();
  obisticalGroup = new Group();
  cloudGroup =  createGroup();
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  // creating ground sprites
  ground = createSprite(300,180,600,20);
  ground.addImage(groundImage);
  ground.velocityX = -5;
  invisibleGround = createSprite(300,190,600,20)
  invisibleGround.visible = false;
  score = 0;
  resartGame = createSprite(300,100);
  gameOver = createSprite(300,50);
  resartGame.scale = 0.5;
  gameOver.scale = 0.5;
  resartGame.addImage(resartImg);
  gameOver.addImage(overImg);
  resartGame.visible = false;
  gameOver.visible = false;
}


function draw(){
  //console.time();
  //set background color 
  background(0);
  
  //logging the y position of the trex
  //console.log(trex.y)
  if(gameState === PLAY){
if(obisticalGroup.isTouching(trex)){
  gameState = END;
    }
    if(keyWentDown("space")&& trex.y >= 100){
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.5;
    if(ground.x<0){
      ground.x = ground.width/2;
    }
    spawnClouds();
    spawnObisticals();
    score = score+Math.round(frameCount/60);

  }else if(gameState === END){
    trex.changeAnimation("collided", trexCollide);
    resartGame.visible = true;
  gameOver.visible = true;
    ground.velocityX = 0;
    obisticalGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
   obisticalGroup.setLifetimeEach(-1);
   cloudGroup.setLifetimeEach(-1);
  
  }
  //jump when space key is pressed
  
  
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  //infinite effect
  
  
  drawSprites();
  text("score: " + score, 500,30)

}




function spawnClouds(){
  if(frameCount%60===0){
   // score = score+1;
    var clouds = createSprite(300,Math.round(random(20,100)),40,10);
    clouds.velocityX = -3;
    clouds.addImage(cloudImage); 
    cloudGroup.add(clouds);
    clouds.scale = 0.7;
    trex.depth = clouds.depth +1;
    console.log(trex.depth);
    clouds.lifetime = 80;
  }
}


function spawnObisticals(){
  if(frameCount%80===0){
  var cactus = createSprite(560,160,20,20);
  cactus.velocityX = -2;
  cactus.scale = 0.5;
  cactus.lifetime = 280;
  obisticalGroup.add(cactus);
  var rand = Math.round(random(1,6));
  switch(rand){
    case 1:
      cactus.addImage(cactus1);
      break;

      case 2:
      cactus.addImage(cactus2);
      break;

      case 3:
      cactus.addImage(cactus3);
      break;

      case 4:
      cactus.addImage(cactus4);
      break;

      case 5:
      cactus.addImage(cactus5);
      break;

      case 6:
      cactus.addImage(cactus6);
      break;

      default :
      break;
  }
  }
}