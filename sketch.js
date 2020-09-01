var dementorImage,dementorGroup;
var harryPotter, ground, harrypotter;
var snitchImage,snitchGroup;
var survivalTime=0;
var END=0;
var PLAY=1;
var gameState = PLAY;
var resetImage;

function preload(){
dementorImage=loadImage("dementor.png");
harryPotter=loadImage("harrypotter.jpg");
snitchImage=loadImage("snitch.png");
groundImage=loadImage("smallground.png");
restartImage=loadImage("restart.png");
}

function setup() {
  createCanvas(600, 400);
  background("white");
  
  ground = createSprite(300,380,600,20);
  ground.scaleY=0.2;
  ground.addImage("ground",groundImage);
  ground.velocityX=-3;
  ground.x = ground.width /2;
  
  
  harrypotter = createSprite(50,200,50,10);
  harrypotter.addImage("harryPotter",harryPotter);
  harrypotter.scale=0.5;
 
  snitchGroup = new Group();
  dementorGroup = new Group();
  edges = createEdgeSprites();
  
  invisibleSky=createSprite(300,100,600,20);
  invisibleSky.visible=false;
  harrypotter.collide(invisibleSky);
  
  restart = createSprite(300,140);
  restart.addImage(restartImage);
  restart.visible = false;
  restart.scale = 0.5;
    //create invisble sky in the middle and make harry collide with it
}

 function createSnitch(){
   if (frameCount % 80 === 0) {
      snitch = createSprite(600,20,40,10);
      snitch.y = Math.round(random(120,200));
      snitch.addImage(snitchImage);
      snitch.scale = 0.1;
      snitch.velocityX = -9;
      snitch.lifetime = 100;
      snitchGroup.add(snitch);
   }
   if(snitchGroup.isTouching(harrypotter))
   dementor.velocityX=dementor.velocityX-1
 }
function createDementor(){
  if (frameCount % 80 === 0){
    dementor = createSprite (600,200,10,40);
    dementor.addImage(dementorImage)
    dementor.velocityX = -1;
    dementor.scale = 0.1;
    dementor.lifetime = 100;
    dementorGroup.add(dementor);
    ground.depth = dementor.depth;
    dementor.depth = dementor.depth + 1;
  //dementor.debug = true
  }
  
  if(dementorGroup.isTouching(harrypotter)){
    gameState = END;
  
   }
}

function reset(){
  gameState = PLAY;
  restart.visible = false;
  
  dementorGroup.destroyEach();
  snitchGroup.destroyEach();
  survivalTime = 0;

}


function draw() {
  background("white");
   //Make and if and else if for play and end
    
  harrypotter.bounceOff(edges[0]);
  harrypotter.bounceOff(edges[1]);
  harrypotter.bounceOff(edges[2]);
  harrypotter.bounceOff(edges[3]);
  stroke("black");
  textSize(20);
  fill("black");
  
  text("Survival Time: "+ survivalTime, 400,30);
 
  if(gameState===END) {
  restart.visible = true;
  ground.velocityX = 0;
  harrypotter.velocityY = 0
  dementorGroup.setLifetimeEach(-1);
  snitchGroup.setLifetimeEach(-1);
  dementorGroup.setVelocityXEach(0);
  snitchGroup.setVelocityXEach(0);
  
}
  else if (gameState===PLAY){
    if(keyDown("space") ) 
    {
      harrypotter.velocityY = -6;
    }
    survivalTime=survivalTime + Math.round(getFrameRate()/60);
  createDementor();
  createSnitch();
    if(ground.x<0){
      ground.x=ground.width/2;
    }
  
  ground.depth = harrypotter.depth;
  harrypotter.depth = harrypotter.depth + 1;
  
   survivalTime = survivalTime + Math.round(getFrameRate()/50)
  }
  if(mousePressedOver(restart)){
 
  reset();
}
drawSprites();
}
