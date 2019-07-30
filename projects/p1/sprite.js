
class Sprite {
	
	constructor(imgPath) {
		this.img = new Image();
		this.img.src = imgPath;
	}
	
	drawImageRotated(x, y, w, h, deg, context) {
		context.mozImageSmoothingEnabled = false;
		context.webkitImageSmoothingEnabled = false;
		context.msImageSmoothingEnabled = false;
		context.imageSmoothingEnabled = false;
		
		this.img.width = w;
		this.img.height = h;
		
		context.save();
		context.translate(x, y);
		context.rotate(deg*Math.PI/180);
		context.translate(-x, -y);
		context.drawImage(this.img, x - w/2, y - h/2, w, h);
		context.restore();
	}
}