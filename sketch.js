play=1
end=0
var towerImg, tower;
var doorImg, door, doorsGrp;
var climberImg, climber, climbersGrp;
var ghost, ghostImg;
var invisibleGrp, invisible;
var gameState = play

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  spookySound.loop();
  createCanvas(windowWidth,windowHeight);
  tower = createSprite(width/2,height/2);
  tower.addImage("tower",towerImg);
  tower.velocityY = 2;
  
  doorsGrp = new Group();
  climbersGrp = new Group();
  invisibleGrp = new Group();
  
  ghost = createSprite(width/2,height/3,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  ghost.velocityX=0
  drawSprites();
  if (gameState === play) {
    if(keyDown("left_arrow")){
      ghost.velocityX = -3;
    }
    
    if(keyDown("right_arrow")){
      ghost.velocityX = 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    
    //climbersGroup.collide(ghost);
    if(climbersGrp.isTouching(ghost)){
      ghost.velocityY = 0;
       tower.destroy();
    }
    if(invisibleGrp.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      tower.destroy();
      climbersGrp.destroyEach();
      doorsGrp.destroyEach();
      gameState = end
    }
    
    
    
    
  }
  
  if (gameState === end){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite( Math.round(random(width/1,width/2.5)), -50);
    var climber = createSprite(door.x,10);
    var invisibleBlock = createSprite(door.x,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
     ghost.depth=door.depth
    ghost.depth=ghost.depth+1
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGrp.add(door);
    invisibleBlock.debug = false;
    climbersGrp.add(climber);
    invisibleGrp.add(invisibleBlock);
  }
}

