
class AnimatedSprite extends Sprite {
	constructor(imgPath, frameCount, w, animationLoop) {
		super(imgPath);
		
		this.index = 1;
		this.animationSpeed = 0;
		
		this.frameCount = frameCount;
		this.spriteSheetW = w;
		this.spriteSheetH = frameCount/w;
		this.animationLoop = animationLoop; //if true from frameCount to 0 else frameCount to frameCount-1
		this.countUp = true;
	}
	
	animate() {
		if(this.animationSpeed == 3) {
			if(this.animationLoop) {
				if(this.frameCount == this.index+1) {
					this.index = 0;
				} else {
					this.index++;
				}
			} else {
				if(this.frameCount == this.index+1) {
					this.countUp = false;
				} else if(this.index == 0) {
					this.countUp = true;
				}
				if(this.countUp) {
					this.index++;
				} else {
					this.index--;
				}
			}
			this.animationSpeed = 0;
		} else {
			this.animationSpeed++;
		}
	}
	
	drawImageRotated(x, y, w, h, deg, context) {
		context.mozImageSmoothingEnabled = false;
		context.webkitImageSmoothingEnabled = false;
		context.msImageSmoothingEnabled = false;
		context.imageSmoothingEnabled = false;
		
		var spriteSize = this.img.width/this.spriteSheetW;
		var spriteX = spriteSize*(this.index%this.spriteSheetW);
		var spriteY = spriteSize*Math.floor(this.index/this.spriteSheetW);
		
		context.save();
		context.translate(x, y);
		context.rotate(deg*Math.PI/180);
		context.translate(-x, -y);
		context.drawImage(this.img,  spriteX, spriteY, spriteSize, spriteSize, x - w/2, y - h/2, w, h );
		context.restore();
	}
	
}