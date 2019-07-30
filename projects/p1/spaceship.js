
class Spaceship {
    
  constructor(pWidth, pHeight, deg) {
    this.width = pWidth;
	this.height = pHeight;
	
	this.x = pWidth/2;
    this.y = pHeight/2;
	this.size = 100;
	this.deg = deg;
	
	this.EV = [0,0];
	this.RV = [0,0];
	
	this.calcERV();
	
	this.speed = 0;
	this.maxSpeed = 10;
	this.acceleration = 0.125;
	this.shipSprite = new Sprite("./p1/ship.png");
	this.accelerationSprite = new AnimatedSprite("./p1/blastsprite.png", 5, 5, true);
  }
  
  calcERV() {
	var rad = (this.deg * Math.PI) / 180;
	var RV = [Math.sin(rad), -Math.cos(rad)];
	
	var f = 1 / Math.sqrt(Math.pow(RV[0], 2) + Math.pow(RV[1], 2));
	
	
	this.EV[0] = f * RV[0];
	this.EV[1] = f * RV[1];
	
	this.RV[0] = this.speed * this.EV[0]; 
	this.RV[1] = this.speed * this.EV[1];
  }
  
  calcNewXY() {
	
	this.accelerationSprite.animate();
	
	this.speed *= 0.99;
	this.calcERV();
	this.x += this.RV[0];
	this.y += this.RV[1];
  }
  
  incSpeed() {
	  if(this.speed < this.maxSpeed) {
		this.speed += this.acceleration;
	  }
  }
  
  decSpeed() {
	  if(this.speed > 0) {
		this.speed -= this.acceleration;
	  }
  }
  
  calcAngleDegrees() {
	this.deg = Math.atan2(this.RV[0], -this.RV[1]) * 180 / Math.PI;
  }
  
  
  drawShip(context, keysPressed) {
	/*
	var saveX = this.x;
	var saveY = this.y;
	this.x = this.width/2;
	this.y = this.height/2;
	*/
	this.shipSprite.drawImageRotated(this.x, this.y, this.size, this.size, this.deg, context);
	
	context.fillStyle = "rgb(255,50,0)";
		
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.deg*Math.PI/180);
	context.translate(-this.x, -this.y);
	context.beginPath();
	if(keysPressed.includes("d")) {
		this.accelerationSprite.drawImageRotated(this.x - this.size/4.4, this.y + this.size/3, this.size/2, this.size/2, 180, context);
	}
	if(keysPressed.includes("a")) {
		this.accelerationSprite.drawImageRotated(this.x + this.size/4.4, this.y + this.size/3, this.size/2, this.size/2, 180, context);
	}
	if(keysPressed.includes("w")) {
		this.accelerationSprite.drawImageRotated(this.x, this.y + this.size/1.3, this.size/2, this.size/2, 180, context);
	}
	context.fill();
	context.restore();	
	
	//this.x = saveX;
	//this.y = saveY;

  }
  
  
  
}